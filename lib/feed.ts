import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

import prismadb from "./prismadb";

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
