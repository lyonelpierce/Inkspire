import { NextResponse } from "next/server";

import prismadb from "./prismadb";

interface GalleryValues {
  imageUrl: string;
  imagePrompt: string;
  imageStyle: string;
  imageStatus: boolean;
}

export const getFeed = async () => {
  try {
    const feed = await prismadb.userGallery.findMany({
      where: { imageStatus: true },
      orderBy: { createdAt: "desc" },
    });
    return feed;
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
};
