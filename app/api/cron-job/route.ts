import { getUsers } from "@/lib/api-limit";
import { getSubscribers } from "@/lib/subscription";

export async function GET() {
  const users = await getUsers();
  const subscribers = await getSubscribers();

  return new Response(
    JSON.stringify({
      users,
      subscribers,
    }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );
}
