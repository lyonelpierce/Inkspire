import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";
import { MAX_PRO_COUNTS } from "@/constants";

const styleOptions: Record<string, { modelId: string; defaultPrompt: string }> =
  {
    watercolor: {
      modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
      defaultPrompt: "using watercolor tattoo style, no background",
    },
    minimalist: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "minimalist tattoo style, line art",
    },
    geometric: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "line art, geometric tattoo style",
    },
    traditional: {
      modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
      defaultPrompt: "using traditional tattoo style, no background",
    },
    surrealism: {
      modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
      defaultPrompt: "using surrealism tattoo style, no background",
    },
    realism: {
      modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
      defaultPrompt: "using realism tattoo style, no background",
    },
    anime: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "using anime tattoo style, no background",
    },
    blackandgrey: {
      modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
      defaultPrompt: "using black and grey tattoo style, no background",
    },
    newschool: {
      modelId: "ac614f96-1082-45bf-be9d-757f2d31c174",
      defaultPrompt: "using new school tattoo style, no background",
    },
    dotwork: {
      modelId: "bd4ec11e-fd1b-46c4-a159-ef0b48acfcd8",
      defaultPrompt: "dotwork tattoo style",
    },
    tribal: {
      modelId: "d3e5f41d-0c37-4542-a9b7-3ac04ff74cfe",
      defaultPrompt: "tribal style, tattoo style, black",
    },
    japanese: {
      modelId: "b63f7119-31dc-4540-969b-2a9df997e173",
      defaultPrompt: "using japanese tattoo style, no background",
    },
    sketch: {
      modelId: "e6166dfd-9623-4a98-83ad-4decc38785b1",
      defaultPrompt: "Sketch tattoo",
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

    if (!process.env.LEONARDO_SECRET) {
      throw new Error("LEONARDO_SECRET is not defined.");
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

    const postOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: process.env.LEONARDO_SECRET,
      },
      body: JSON.stringify({
        prompt: prompt + ", " + styleOptions[style].defaultPrompt,
        modelId: styleOptions[style].modelId,
        sd_version: "v2",
        num_images: parseInt(amount, 10),
        width: parseInt(resolution, 10),
        height: parseInt(resolution, 10),
      }),
    };

    const getOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: process.env.LEONARDO_SECRET,
      },
    };

    const response = await fetch(
      "https://cloud.leonardo.ai/api/rest/v1/generations",
      postOptions
    );

    if (response.ok) {
      const {
        sdGenerationJob: { generationId },
      } = await response.json();

      let status = "PENDING";
      while (status === "PENDING") {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const aiImages = await fetch(
          `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
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
