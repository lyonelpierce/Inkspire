import { NextResponse } from "next/server";
import { setFavorite, unsetFavorite, checkFavorite } from "@/lib/favorite";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const isLiked = await checkFavorite(body.imageId);
    if (isLiked) {
      await unsetFavorite(body.imageId);
      return new NextResponse("Liked", { status: 200 });
    } else {
      await setFavorite(body.imageId);
      return new NextResponse("Unliked", { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const favorites = await checkFavorite();
    return NextResponse.json(favorites);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
