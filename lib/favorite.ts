import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";

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
    });

    const favoriteImages = await Promise.all(
      favorites.map(async (favorite) => {
        const { imageId } = favorite;
        const image = await prismadb.userGallery.findUnique({
          where: {
            id: imageId,
          },
        });
        return image;
      })
    );

    return favoriteImages;
  }
};

export { setFavorite, unsetFavorite, checkFavorite };
