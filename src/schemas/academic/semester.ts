import { z } from "zod";

export const academicSemesterSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  // code: z.string({ required_error: "Code is required" }),
  year: z.string({ required_error: "Year is required" }),
  startMonth: z.string({ required_error: "Start month is required" }),
  endMonth: z.string({ required_error: "End month is required" }),
});
