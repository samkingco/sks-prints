import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";
import { ProjectEnum } from "../utils/tokens";
import { ownedTokensDocument, rootsSubgraph } from "./rootsSubgraph";
import { protectedProcedure, router } from "./trpc";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

export const stripeRouter = router({
  checkoutSession: protectedProcedure
    .input(z.object({ tokens: z.array(z.number()), project: ProjectEnum }))
    .mutation(async ({ ctx, input }) => {
      const address = ctx.session.address;
      if (!address) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (input.tokens.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No tokens requested",
        });
      }

      if (input.project === "ROOTS") {
        let ownedTokenIds: number[] = [];
        const ownedTokensRes = await rootsSubgraph.request(
          ownedTokensDocument,
          {
            owner: address.toLowerCase(),
          }
        );

        if (
          ownedTokensRes &&
          ownedTokensRes.wallet &&
          ownedTokensRes.wallet.photos.length > 0
        ) {
          ownedTokenIds = ownedTokensRes.wallet.photos.map((i) =>
            parseInt(i.tokenId, 10)
          );
        }

        // Check they own all requested token ids
        const ownsAllTokenIds = input.tokens.every((id) =>
          ownedTokenIds.includes(id)
        );

        if (!ownsAllTokenIds) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not owner of requested tokens",
          });
        }

        // Check if the requested tokens have orders already
        const tokenClaims = await ctx.prisma.token.findMany({
          where: { tokenId: { in: input.tokens } },
        });

        const hasClaimedAnyToken = tokenClaims.length > 0;

        if (hasClaimedAnyToken) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not all requested tokens are available",
          });
        }

        // Now we can create the session
        try {
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: process.env.STRIPE_ROOTS_PRICE_ID,
                quantity: input.tokens.length,
              },
              {
                price: process.env.STRIPE_BASE_SHIPPING_ITEM_PRICE_ID,
                quantity: input.tokens.length,
              },
            ],
            shipping_address_collection: {
              allowed_countries: [
                // UK
                "GB",
                // EU 1
                "IE",
                "DE",
                "FR",
                "DK",
                "MC",
                // EU 2
                "AT",
                "BE",
                "BG",
                "HR",
                "CY",
                "CZ",
                "EE",
                "FI",
                "GR",
                "HU",
                "IT",
                "LV",
                "LT",
                "LU",
                "MT",
                "NL",
                "PL",
                "PT",
                "RO",
                "SK",
                "SI",
                "ES",
                "SE",
                // EU 3
                "AL",
                "AD",
                "AM",
                "AZ",
                "BY",
                "BA",
                "FO",
                "GE",
                "GI",
                "GL",
                "IS",
                "KZ",
                "KG",
                "LI",
                "MD",
                "ME",
                "MK",
                "NO",
                "SM",
                "RS",
                "CH",
                "TJ",
                "TR",
                "UA",
                "UZ",
                "VA",
                // ROW
                "US",
                "CA",
                "AR",
                "AU",
                "BR",
                "CO",
                "CN",
                "HK",
                "EC",
                "EG",
                "SV",
                "GH",
                "GY",
                "IN",
                "JP",
                "KR",
                "NZ",
                "ZA",
                "AE",
              ],
            },
            shipping_options: [
              { shipping_rate: process.env.STRIPE_SHIPPING_RATE_UK },
              { shipping_rate: process.env.STRIPE_SHIPPING_RATE_EU },
              { shipping_rate: process.env.STRIPE_SHIPPING_RATE_INTERNATIONAL },
            ],
            mode: "payment",
            success_url: `${ctx.req.headers.origin}/success`,
            cancel_url: `${ctx.req.headers.origin}/`,
            automatic_tax: { enabled: true },
            payment_intent_data: {
              metadata: {
                address,
                tokenIds: input.tokens.join(","),
                project: input.project,
              },
            },
          });

          return session;
        } catch (error) {
          throw new TRPCError({ code: "BAD_REQUEST", cause: error });
        }
      }
    }),
});
