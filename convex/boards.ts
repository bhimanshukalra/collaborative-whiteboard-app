import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favourites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw Error("Unauthorized");
    }

    if (args.favourites) {
      const favouritedBoards = await ctx.db
        .query("userFavourites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const favouritedBoardsId = favouritedBoards.map(
        (currentBoard) => currentBoard.boardId
      );

      const boards = await getAllOrThrow(ctx.db, favouritedBoardsId);

      return boards.map((currentBoard) => ({
        ...currentBoard,
        isFavourite: true,
      }));
    }

    const title = args.search ?? "";
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsWithFavouriteRelation = boards.map(async (currentBoard) => {
      const favouriteBoard = await ctx.db
        .query("userFavourites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", currentBoard._id)
        )
        .unique();
      return { ...currentBoard, isFavourite: !!favouriteBoard };
    });

    const boardsWithFavourite = await Promise.all(boardsWithFavouriteRelation);
    return boardsWithFavourite;
  },
});
