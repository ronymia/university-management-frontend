import { z } from "zod";

export const managementDepartmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
});
