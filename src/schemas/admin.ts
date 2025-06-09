import { z } from "zod";

export const adminSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters"),

  admin: z.object({
    name: z.object({
      firstName: z.string().min(1, "First name is required"),
      middleName: z.string().min(1, "Middle name is required"),
      lastName: z.string().min(1, "Last name is required"),
    }),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    designation: z.string().min(1, "Designation is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
  }),
});
