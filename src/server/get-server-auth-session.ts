import { type GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { getAuthOptions } from "../pages/api/auth/[...nextauth]";

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(
    ctx.req,
    ctx.res,
    getAuthOptions(ctx.req)
  );
};
