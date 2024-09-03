import { NextResponse } from "next/server";
import prismadb from "./prismadb";

const CLERK_API_BASE_URL = "https://api.clerk.com/v1";
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

export const getFeed = async () => {
  try {
    const feed = await prismadb.userGallery.findMany({
      where: { imageStatus: true },
      orderBy: { createdAt: "desc" },
    });

    const userIds = feed.map((item) => item.userId);
    const url = `${CLERK_API_BASE_URL}/users`;

    const userResponses = await Promise.all(
      userIds.map((userId) => {
        const headers = {
          Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        };
        const userUrl = `${url}/${userId}`;
        return fetch(userUrl, { headers });
      })
    );

    for (const response of userResponses) {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }

    const usernames = await Promise.all(
      userResponses.map((response) => response.json())
    );

    const feedWithUsernames = feed.map((item, index) => ({
      ...item,
      username: usernames[index].username,
    }));

    return feedWithUsernames;
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const getHomeFeed = async () => {
  console.log("Getting home feed");
  const feed = await prismadb.userGallery.findMany({
    where: { imageStatus: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  console.log(feed);
  return feed;
};
