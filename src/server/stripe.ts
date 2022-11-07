import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const stripeRouter = router({
  checkoutSession: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.order.findMany();
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
        orders,
      };
    }),
});
