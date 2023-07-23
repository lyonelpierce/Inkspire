import { NextResponse } from "next/server";
import { saveToGallery, getGallery } from "@/lib/gallery";

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

export async function GET() {
  try {
    const galleryResponse = await getGallery();
    return new NextResponse(JSON.stringify(galleryResponse), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
