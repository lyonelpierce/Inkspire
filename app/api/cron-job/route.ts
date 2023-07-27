import { getUsers } from "@/lib/api-limit";
import { getSubscribers } from "@/lib/subscription";
import { resetApiLimit } from "@/lib/api-limit";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  const subscribers = await getSubscribers();

  const subscriberUserIds = subscribers.map((subscriber) => subscriber.userId);

  const nonSubscribers = users.filter(
    (user) => !subscriberUserIds.includes(user.userId)
  );

  if (nonSubscribers) {
    nonSubscribers.forEach(async (nonSubscriber) => {
      await resetApiLimit(nonSubscriber.userId);
      console.log("Reset!");
    });
  }
  return NextResponse.json(nonSubscribers);
}
