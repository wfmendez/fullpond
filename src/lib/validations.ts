import { z } from "zod";

// zod v4 syntax (top-level z.email(), string-shorthand messages).

export const loginSchema = z.object({
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z.string().min(1, "Enter your password"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Your name is too short").max(120),
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z.string().min(8, "At least 8 characters").max(100),
  country: z.string().trim().max(80).optional().or(z.literal("")),
});
export type RegisterInput = z.infer<typeof registerSchema>;
