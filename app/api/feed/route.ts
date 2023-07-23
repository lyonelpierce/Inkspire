import { NextResponse } from "next/server";
import { getFeed } from "@/lib/feed";

export async function GET() {
  try {
    const galleryResponse = await getFeed();
    return new NextResponse(JSON.stringify(galleryResponse), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
