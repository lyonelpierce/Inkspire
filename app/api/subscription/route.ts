import { checkSubscription } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new NextResponse(null, { status: 405 }); // Specify status in response options
  }

  try {
    const isUserSubscribed = await checkSubscription();
    return new NextResponse(JSON.stringify({ isPro: isUserSubscribed }), {
      // Return JSON as string
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Server Error" }), {
      // Handle server error and return JSON as string
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
