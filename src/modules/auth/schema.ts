import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
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
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
