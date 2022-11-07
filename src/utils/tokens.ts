import { z } from "zod";

const projectValues = ["UNKNOWN", "ROOTS", "ICE64"] as const;

export const ProjectEnum = z.enum(projectValues, {
  errorMap: () => ({ message: "Invalid project type" }),
});

export type ProjectType = z.infer<typeof ProjectEnum>;

export const TokenInfoValidator = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  project: ProjectEnum,
});

export type TokenInfo = z.infer<typeof TokenInfoValidator>;

export function rootsToken(id: number): TokenInfo {
  return {
    id,
    name: `Roots #${id}`,
    image: `/roots/${id}.jpg`,
    project: "ROOTS",
  };
}

export const rootsTokens: TokenInfo[] = Array.from(
  { length: 40 },
  (v, i) => i + 1
).map((i) => rootsToken(i));

export const tokens = [...rootsTokens];
