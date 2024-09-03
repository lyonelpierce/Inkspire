import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookCallbackApiKey = process.env.WEBHOOK_SECRET;

  // Verify the Authorization header
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${webhookCallbackApiKey}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const event = await req.json();

    if (event.type === "image_generation.complete") {
      const generationData = event.data.object;

      // Process the completed image generation (e.g., update your database)
      const { id, images } = generationData;
      const imageUrl = images[0]?.url;

      console.log(
        `Image generation complete for ID ${id}. Image URL: ${imageUrl}`
      );

      // Respond with success
      return NextResponse.json(
        { message: "Webhook received successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unhandled event type" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
