import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { resetApiLimit } from "./api-limit";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  if (!isValid) {
    await prismadb.userSubscription.delete({
      where: {
        id: userSubscription.id,
      },
    });
    await resetApiLimit(userId);
  }

  return !!isValid;
};

export const getSubscribers = async () => {
  const subscribers = await prismadb.userSubscription.findMany({
    select: {
      userId: true,
    },
  });
  return subscribers;
};
