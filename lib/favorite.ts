import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";

const CLERK_API_BASE_URL = "https://api.clerk.com/v1";
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

const setFavorite = async (imageId: string) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  if (!imageId) {
    return null;
  }

  const set = await prismadb.userFavorite.create({
    data: {
      userId: userId,
      imageId: imageId,
    },
  });
};

const unsetFavorite = async (imageId: string) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  if (!imageId) {
    return null;
  }

  const existingFavorite = await prismadb.userFavorite.findFirst({
    where: {
      userId: userId,
      imageId: imageId,
    },
  });

  if (!existingFavorite) {
    return;
  }

  const unset = await prismadb.userFavorite.delete({
    where: {
      id: existingFavorite.id,
    },
  });
};

const checkFavorite = async (imageId?: any) => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  if (imageId) {
    const favorites = await prismadb.userFavorite.findMany({
      where: {
        userId: userId,
        imageId: imageId,
      },
    });

    return favorites.length > 0;
  } else {
    const favorites = await prismadb.userFavorite.findMany({
      where: {
        userId: userId,
      },
      select: {
        imageId: true,
      },
    });

    const imageIds = favorites.map((favorite) => favorite.imageId);

    const images = await prismadb.userGallery.findMany({
      where: {
        userId: userId,
        id: { in: imageIds },
      },
    });

    return images;
  }
};

export { setFavorite, unsetFavorite, checkFavorite };
