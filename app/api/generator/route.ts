import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";
import { MAX_PRO_COUNTS } from "@/constants";

const styleOptions: Record<string, { defaultPrompt: string }> = {
  watercolor: {
    defaultPrompt: "using watercolor tattoo style, colorful, illustration",
  },
  minimalist: {
    defaultPrompt: "minimalist tattoo style, line art",
  },
  geometric: {
    defaultPrompt:
      "line art, geometry tattoo style, straight lines only, design with shapes, shapes around",
  },
  traditional: {
    defaultPrompt: "using traditional tattoo style",
  },
  surrealism: {
    defaultPrompt: "using surrealism tattoo style, double exposure",
  },
  realism: {
    defaultPrompt: "using realism tattoo style, realistic",
  },
  anime: {
    defaultPrompt: "illustrations, anime style, vector art, 2 arms only",
  },
  blackandgrey: {
    defaultPrompt:
      "using black and grey tattoo style, grayscale, black and white, monochrome, b/w, illustration",
  },
  newschool: {
    defaultPrompt: "using new school tattoo style, cartoon style",
  },
  dotwork: {
    defaultPrompt:
      "dotwork tattoo style, black and white, monochrome, b/w, bold, dots only, design with dots, line art",
  },
  tribal: {
    defaultPrompt:
      "tribal style, tattoo style, black only, bold lines, line art, illustration, lines, deep black, bold black, black lines, invert colors",
  },
  japanese: {
    defaultPrompt: "using japanese tattoo style",
  },
  sketch: {
    defaultPrompt:
      "sketch tattoo, sketch, drawing, line art, outline, b/n, black and white",
  },
};

const calculateTokens = (amount: string, resolution: string): number => {
  const imagesCount = parseInt(amount, 10);
  const resolutionValue = parseInt(resolution, 10);

  if (resolutionValue === 512) {
    return imagesCount * 2;
  } else if (resolutionValue === 768) {
    return imagesCount * 3;
  } else if (resolutionValue === 1024) {
    return imagesCount * 4;
  } else {
    return imagesCount * 2;
  }
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, style, amount, resolution } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.URL_SECRET) {
      throw new Error("URL_SECRET is not defined.");
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!style) {
      return new NextResponse("Style is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const numTokens = calculateTokens(amount, resolution);

    const freeTrial = await checkApiLimit(numTokens);
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Not enough tokens", { status: 201 });
    }

    if (isPro && !freeTrial) {
      const userApiLimit = await getApiLimitCount();
      if (userApiLimit + numTokens > MAX_PRO_COUNTS) {
        return new NextResponse("Pro user's API limit exceeded", {
          status: 201,
        });
      }
    }

    const url = process.env.URL_GENERATIONS;

    const postOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: process.env.URL_SECRET,
      },
      body: JSON.stringify({
        prompt:
          prompt +
          ". " +
          styleOptions[style].defaultPrompt +
          ", " +
          process.env.PROMPT_MAGIC,
        modelId: process.env.MAIN_MODEL,
        sd_version: "v2",
        num_images: parseInt(amount, 10),
        width: parseInt(resolution, 10),
        height: parseInt(resolution, 10),
        promptMagic: true,
        public: false,
      }),
    };

    const getOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: process.env.URL_SECRET,
      },
    };

    const response = await fetch(`${process.env.URL_GENERATIONS}`, postOptions);

    if (response.ok) {
      const {
        sdGenerationJob: { generationId },
      } = await response.json();

      let status = "PENDING";
      while (status === "PENDING") {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const aiImages = await fetch(
          `${process.env.URL_GENERATIONS}/${generationId}`,
          getOptions
        );

        if (aiImages.ok) {
          const image = await aiImages.json();
          status = image.generations_by_pk.status;
          if (status === "COMPLETE") {
            const imageUrl = image.generations_by_pk.generated_images;

            await increaseApiLimit(numTokens);

            return NextResponse.json({ imageUrl });
          }
        }
      }
    }
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
