import { z } from "zod";

export const academicFacultySchema = z.object({
  title: z.string().min(1, "Title is required"),
});
