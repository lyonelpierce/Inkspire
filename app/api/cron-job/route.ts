import { getUsers } from "@/lib/api-limit";
import { getSubscribers } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  const subscribers = await getSubscribers();

  const subscriberIds = subscribers.map((subscriber) => subscriber);

  const usersNotInSubscribers = users.filter(
    (user) => !subscriberIds.includes(user)
  );

  return NextResponse.json(usersNotInSubscribers);
}
