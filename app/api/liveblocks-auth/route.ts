import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVE_BLOCKS_SECRET_API_KEY ?? "",
});

export async function POST(request: Request) {
  const authorization = await auth();
  // Get the current user from your database
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous team mate",
    picture: user.imageUrl,
  };

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
