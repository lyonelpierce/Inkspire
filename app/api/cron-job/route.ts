import { getUsers } from "@/lib/api-limit";
import { getSubscribers } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  const subscribers = await getSubscribers();

  return new NextResponse("hello");
}
