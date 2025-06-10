import { z } from "zod";

export const offeredCourseSchema = z.object({
  semesterRegistrationId: z
    .string()
    .min(1, "Semester Registration is required"),
  academicDepartmentId: z.string().min(1, "Academic Department is required"),
});
