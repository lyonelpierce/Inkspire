import { NextResponse } from "next/server";
import prismadb from "./prismadb";

const CLERK_API_BASE_URL = "https://api.clerk.com/v1";
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY; // Make sure you have set the environment variable CLERK_SECRET_KEY

export const getFeed = async () => {
  try {
    const feed = await prismadb.userGallery.findMany({
      where: { imageStatus: true },
      orderBy: { createdAt: "desc" },
    });

    const userId = feed[0].userId;

    // Make the API call to get the username
    const url = `${CLERK_API_BASE_URL}/users/${userId}`;
    const headers = {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
    };

    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const { username } = await response.json();

    // Add the 'username' property to each item in the 'feed' array
    const feedWithUsername = feed.map((item) => ({
      ...item,
      username: username,
    }));

    return feedWithUsername;
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
