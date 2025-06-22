import { z } from 'zod';

export const offeredCourseSectionSchema = z.object({
    semesterRegistrationId: z
        .string({
            required_error: 'Semester Registration field is required',
            invalid_type_error: 'Semester Registration Id must be string',
        })
        .min(1, 'Semester Registration is required'),
    offeredCourseId: z
        .string({
            required_error: 'offeredCourseId field is required',
            invalid_type_error: 'Offered Course Id must be string',
        })
        .min(1, 'Offered Course Id is required'),
    title: z.string().min(1, 'Title is required'),
    maxCapacity: z.string().min(1, 'Max Capacity is required'),
    classSchedules: z.array(
        z.object({
            id: z.string().optional(),
            dayOfWeek: z.string().min(1, 'Day is required'),
            startTime: z.string().min(1, 'Start Time is required'),
            endTime: z.string().min(1, 'End Time is required'),
            roomId: z.string().min(1, 'End Time is required'),
            facultyId: z.string().min(1, 'End Time is required'),
        }),
    ),
});
