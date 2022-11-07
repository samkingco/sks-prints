import { authRouter } from "./auth";
import { stripeRouter } from "./stripe";
import { tokensRouter } from "./tokens";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  stripe: stripeRouter,
  tokens: tokensRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
