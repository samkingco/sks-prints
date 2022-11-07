import { authRouter } from "./auth";
import { stripeRouter } from "./stripe";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
