import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  code: z.string().min(1, "Code is required"),
  credits: z.string().min(1, "Credits is required"),
  coursePreRequisites: z.array(z.string()).optional(),
});
