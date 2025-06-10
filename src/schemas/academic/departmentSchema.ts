import { z } from "zod";

export const academicDepartmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  academicFacultyId: z.string().min(1, "Academic Faculty is required"),
});
