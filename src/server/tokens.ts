import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ProjectEnum } from "../utils/tokens";
import {
  mintedTokensDocument,
  ownedTokensDocument,
  rootsSubgraph,
} from "./rootsSubgraph";
import { protectedProcedure, publicProcedure, router } from "./trpc";

export const tokensRouter = router({
  claimed: publicProcedure
    .input(z.object({ project: ProjectEnum }))
    .query(async ({ ctx, input }) => {
      const tokens = await ctx.prisma.token.findMany({
        where: { project: { equals: input.project } },
      });
      const claimedIds = tokens.map((i) => i.tokenId);
      return claimedIds;
    }),
  owned: protectedProcedure
    .input(z.object({ project: ProjectEnum, address: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const owner = ctx.session.address;

      if (!owner || !input.address || owner !== input.address) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (input.project === "ROOTS") {
        const ownedTokensRes = await rootsSubgraph.request(
          ownedTokensDocument,
          {
            owner: owner.toLowerCase(),
          }
        );

        if (
          !ownedTokensRes.wallet ||
          ownedTokensRes.wallet.photos.length === 0
        ) {
          return [];
        }

        const ownedTokenIds = ownedTokensRes.wallet.photos.map((i) =>
          parseInt(i.tokenId, 10)
        );

        return ownedTokenIds;
      }

      return [];
    }),
  minted: publicProcedure
    .input(z.object({ project: ProjectEnum }))
    .query(async ({ ctx, input }) => {
      if (input.project === "ROOTS") {
        const mintedTokensRes = await rootsSubgraph.request(
          mintedTokensDocument
        );

        if (
          !mintedTokensRes.rootsPhotos ||
          mintedTokensRes.rootsPhotos.length === 0
        ) {
          return [];
        }

        const mintedTokenIds = mintedTokensRes.rootsPhotos.map((i) =>
          parseInt(i.tokenId, 10)
        );

        return mintedTokenIds;
      }

      return [];
    }),
});
