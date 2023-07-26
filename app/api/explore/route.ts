import { NextResponse } from "next/server";
import { getFeed, getHomeFeed } from "@/lib/feed";

export const revalidate = 0;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname === "/") {
    try {
      const homeFeed = await getHomeFeed();
      return NextResponse.json(homeFeed);
    } catch (error) {
      console.log(error);
      return new NextResponse("Internal error.", { status: 500 });
    }
  } else {
    try {
      const galleryResponse = await getFeed();
      return new NextResponse(JSON.stringify(galleryResponse), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse("Internal error.", { status: 500 });
    }
  }
}
