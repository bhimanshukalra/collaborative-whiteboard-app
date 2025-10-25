import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholder/one.svg",
  "/placeholder/one.svg",
  "/placeholder/one.svg",
  "/placeholder/one.svg",
  "/placeholder/one.svg",
  "/placeholder/one.svg",
  "/placeholder/one.svg",
  "/placeholder/one.svg",
  "/placeholder/one.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name ?? "",
      imageUrl: randomImage,
    });

    return board;
  },
});
