import { z } from "zod";

export const offeredCourseCreateSchema = z.object({
  semesterRegistrationId: z
    .string()
    .min(1, "Semester Registration is required"),
  academicDepartmentId: z.string().min(1, "Academic Department is required"),
  courseIds: z.array(z.string()),
});
export const offeredCourseUpdateSchema = z.object({
  semesterRegistrationId: z
    .string()
    .min(1, "Semester Registration is required"),
  academicDepartmentId: z.string().min(1, "Academic Department is required"),
  courseIds: z.string({ required_error: "Course is required" }),
});
