import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "./prismadb";

interface GalleryValues {
  imageUrl: string;
  imagePrompt: string;
  imageStyle: string;
  imageStatus: boolean;
}

export const saveToGallery = async (values: GalleryValues) => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const { imageUrl, imagePrompt, imageStyle, imageStatus } = values;

  try {
    await prismadb.userGallery.create({
      data: {
        userId: userId,
        imageUrl,
        imagePrompt,
        imageStyle,
        imageStatus,
      },
    });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const getGallery = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  try {
    const gallery = await prismadb.userGallery.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    return gallery;
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const deleteImage = async (id: string, user: string) => {
  const userId = auth();

  if (!userId) {
    return;
  }

  try {
    const deleteImage = await prismadb.userGallery.delete({
      where: { id: id, userId: user },
    });
    return deleteImage;
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
