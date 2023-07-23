import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";
import { MAX_PRO_COUNTS } from "@/constants";

const styleOptions: Record<string, { modelId: string; defaultPrompt: string }> =
  {
    watercolor: {
      modelId: "69f6f875-1070-4b0a-90c5-3d55c6f3b58b",
      defaultPrompt: "watercolor tattoo style",
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
      modelId: "b455e572-6d9b-42e2-82f9-e80813d1c1ba",
      defaultPrompt: "traditional tattoo style",
    },
    surrealism: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "surrealism tattoo style",
    },
    realism: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "realism tattoo style",
    },
    anime: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "anime tattoo style",
    },
    blackAndGrey: {
      modelId: "4f5ae989-0eab-4a37-97be-54a5ea8d0ccf",
      defaultPrompt: "Ai blackwork tattoo, black and white, tattoo style",
    },
    newSchool: {
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "New School tattoo style",
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
      modelId: "b820ea11-02bf-4652-97ae-9ac0cc00593d",
      defaultPrompt: "japanese tattoo style",
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
        prompt: prompt + " " + styleOptions[style].defaultPrompt,
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
