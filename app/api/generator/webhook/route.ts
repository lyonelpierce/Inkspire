import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const webhookCallbackApiKey = process.env.WEBHOOK_SECRET;

  // Verify the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${webhookCallbackApiKey}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Handle the webhook event
  try {
    const event = req.body;

    if (event.type === "image_generation.complete") {
      const generationData = event.data.object;

      // Process the completed image generation (e.g., update your database)
      const { id, images } = generationData;
      const imageUrl = images[0]?.url;

      // Example: Updating the result in your database or another action
      console.log(
        `Image generation complete for ID ${id}. Image URL: ${imageUrl}`
      );

      // Respond with success
      return res.status(200).json({ message: "Webhook received successfully" });
    } else {
      return res.status(400).json({ message: "Unhandled event type" });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
