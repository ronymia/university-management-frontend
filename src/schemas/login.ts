import { z } from "zod";

export const loginSchema = z.object({
  id: z.string({ required_error: "User ID is required" }).min(1),
  password: z.string({ required_error: "Password is required" }).min(6).max(32),
});
