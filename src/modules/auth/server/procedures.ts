import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import z from "zod";
import { AUTH_COOKIE } from "../constants";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({
      headers,
    });
    return session;
  }),
  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        username: z
          .string()
          .min(3, "username must be at least 3 characters")
          .max(63, "username must be less than 63 characters")
          .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "username can only contain lowercase letter, numbers and hyphens."
          )
          .refine(
            (val) => !val.includes("--"),
            "username cannot contain consecutive hyphens"
          )
          .transform((val) => val.toLowerCase()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, // it will be hashed
        },
      });
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
          message: "Failed to login",
          code: "UNAUTHORIZED",
        });
      }
      const cookie = await getCookies();
      cookie.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // ensure cross-domain cookie sharing funroad.com chelsea.funroad.com
        // sameSite: "none",
        // domain: "",
      });
    }),
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });
      if (!data.token) {
        throw new TRPCError({
          message: "Failed to login",
          code: "UNAUTHORIZED",
        });
      }
      const cookie = await getCookies();
      cookie.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // ensure cross-domain cookie sharing funroad.com chelsea.funroad.com
        // sameSite: "none",
        // domain: "",
      });
      return data;
    }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
});
