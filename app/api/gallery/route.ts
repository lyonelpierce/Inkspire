import { NextResponse } from "next/server";
import { saveToGallery, getGallery, getFeed } from "@/lib/gallery";

export async function POST(req: Request) {
  try {
    const request = await req.json();
    const response = await saveToGallery(request);

    if (response?.ok) {
      return new NextResponse("Shared & Saved!", { status: 200 });
    } else {
      return new NextResponse("Image already saved.", { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}

export async function GET(req: Request) {
  const referer = req.headers.get("referer");
  try {
    if (referer?.includes("/gallery")) {
      const galleryResponse = await getGallery();
      return new NextResponse(JSON.stringify(galleryResponse), { status: 200 });
    } else if (referer?.includes("/explore")) {
      const feedResponse = await getFeed();
      return new NextResponse(JSON.stringify(feedResponse), { status: 200 });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
