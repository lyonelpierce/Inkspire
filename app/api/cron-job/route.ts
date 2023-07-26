import { getUsers } from "@/lib/api-limit";
import { getSubscribers } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  const subscribers = await getSubscribers();

  const subscriberUserIds = subscribers.map((subscriber) => subscriber.userId);

  const nonSubscriber = users.find(
    (user) => !subscriberUserIds.includes(user.userId)
  );

  return NextResponse.json(nonSubscriber);
}
