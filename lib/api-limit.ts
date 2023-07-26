import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";
import { MAX_FREE_COUNTS, MAX_PRO_COUNTS } from "@/constants";
import { checkSubscription } from "@/lib/subscription";

export const increaseApiLimit = async (numTokens: number) => {
  const { userId } = auth();

  console.log("UserId:", userId);

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId: userId,
      },
      data: {
        count: userApiLimit.count + numTokens,
      },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId: userId,
        count: 2,
      },
    });
  }
};

export const checkApiLimit = async (numTokens: number) => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  const isPro = await checkSubscription();

  if (!userApiLimit || userApiLimit.count + numTokens <= MAX_FREE_COUNTS) {
    return true;
  }

  if (isPro && userApiLimit.count + numTokens >= MAX_PRO_COUNTS) {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};

export const resetApiLimit = async (userId: string) => {
  if (!userId) {
    return;
  }

  await prismadb.userApiLimit.update({
    where: {
      userId: userId,
    },
    data: {
      count: 0,
    },
  });
};

export const getUsers = async () => {
  const users = await prismadb.userApiLimit.findMany({
    select: {
      userId: true,
    },
  });

  return users;
};
