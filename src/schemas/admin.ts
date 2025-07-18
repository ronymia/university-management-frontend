import { z } from 'zod';

export const adminBaseSchema = z.object({
    admin: z.object({
        name: z.object({
            firstName: z.string({ message: 'First name is required' }).min(1),
            middleName: z.string({ message: 'Middle name is required' }).min(1),
            lastName: z.string({ message: 'Last name is required' }).min(1),
        }),
        email: z.string({ message: 'Email is required' }).email('Invalid email').min(1),
        designation: z.string({ message: 'Designation is required' }).min(1),
        dateOfBirth: z.string({ message: 'Date of birth is required' }).min(1),
        contactNo: z
            .string({ message: 'Contact Number is required' })
            .min(1, 'Contact Number is required')
            .max(11, 'Contact Number must not exceed 11 digits'),
        emergencyContactNo: z
            .string({ message: 'Emergency Contact Number is required' })
            .min(1, 'Emergency Contact Number is required')
            .max(11, 'Emergency Contact Number must not exceed 11 digits'),

        bloodGroup: z.string({ message: 'Blood Group is required' }).min(1),
        gender: z.string({ message: 'Gender is required' }).min(1),
        managementDepartment: z.string({ message: 'Management Department is required' }).min(1),
        presentAddress: z.string({ message: 'Present Address is required' }).min(1),
        permanentAddress: z.string({ message: 'Permanent Address is required' }).min(1),
        profileImage: z.any({ message: 'Permanent Address is required' }),
    }),
});

export const createAdminSchema = adminBaseSchema.extend({
    password: z
        .string({ message: 'Password is required' })
        .min(6, 'Password must be at least 6 characters')
        .max(32, 'Password must not exceed 32 characters'),
});

export const updateAdminSchema = adminBaseSchema.extend({
    password: z
        .string()
        .optional()
        .refine((val) => !val || (val.length >= 6 && val.length <= 32), {
            message: 'Password must be 6–32 characters if provided',
        }),
});
