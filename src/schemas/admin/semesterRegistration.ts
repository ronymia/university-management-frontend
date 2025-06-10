import { z } from "zod";

export const semesterRegistrationSchema = z.object({
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  academicSemesterId: z.string().min(1, "Academic Semester is required"),
  minCredit: z.string().min(1, "Minimum Credit is required"),
  maxCredit: z.string().min(1, "Maximum Credit is required"),
  status: z.string().min(1, "Status is required"),
});
