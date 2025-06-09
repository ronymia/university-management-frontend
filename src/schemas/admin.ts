import { z } from "zod";

export const adminSchema = z.object({
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters"),

  admin: z.object({
    name: z.object({
      firstName: z.string({ message: "First name is required" }).min(1),
      middleName: z.string({ message: "Middle name is required" }).min(1),
      lastName: z.string({ message: "Last name is required" }).min(1),
    }),
    email: z
      .string({ message: "Email is required" })
      .email("Invalid email")
      .min(1),
    designation: z.string({ message: "Designation is required" }).min(1),
    dateOfBirth: z.string({ message: "Date of birth is required" }).min(1),
  }),
});
