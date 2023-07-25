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
    });

    const userIds = favorites.map((favorite) => favorite.userId);

    // Fetch user data for all userIds
    const url = `${CLERK_API_BASE_URL}/users`;
    const headers = {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
    };

    const userResponses = await Promise.all(
      userIds.map((userId) => {
        const userUrl = `${url}/${userId}`;
        return fetch(userUrl, { headers });
      })
    );

    // Check if all fetch requests were successful
    for (const response of userResponses) {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }

    // Parse the JSON data from the responses and extract the usernames
    const usernames = await Promise.all(
      userResponses.map((response) => response.json())
    );

    // Map the usernames back to the favorites
    const favoriteImages = await Promise.all(
      favorites.map(async (favorite, index) => {
        const { imageId } = favorite;
        const image = await prismadb.userGallery.findUnique({
          where: {
            id: imageId,
          },
        });

        // Add the corresponding username to the image object
        const imageWithUsername = {
          ...image,
          username: usernames[index].username,
        };
        return imageWithUsername;
      })
    );

    return favoriteImages;
  }
};

export { setFavorite, unsetFavorite, checkFavorite };
