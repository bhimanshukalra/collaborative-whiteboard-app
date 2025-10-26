import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw Error("Unauthorized");
    }

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

      const boardsWithFavouriteRelation = boards.map(async (currentBoard) => {
        const favouriteBoard = await ctx.db
          .query("userFavourites")
          .withIndex("by_user_board", (q) =>
            q.eq("userId", identity.subject).eq("boardId", currentBoard._id)
          )
          .unique();
        return { ...currentBoard, isFavourite: !!favouriteBoard };
      });

      const boardsWithFavourite = await Promise.all(
        boardsWithFavouriteRelation
      );
      return boardsWithFavourite;
  },
});
