import { z } from "zod";

export const offeredCourseSectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  maxCapacity: z.string().min(1, "Max Capacity is required"),
  offeredCourseId: z.string().min(1, "offeredCourseId is required"),
  classSchedules: z.array(
    z.object({
      dayOfWeek: z.string().min(1, "Day is required"),
      startTime: z.string().min(1, "Start Time is required"),
      endTime: z.string().min(1, "End Time is required"),
      roomId: z.string().min(1, "End Time is required"),
      facultyId: z.string().min(1, "End Time is required"),
    })
  ),
});
