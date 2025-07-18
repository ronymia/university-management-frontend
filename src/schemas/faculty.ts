import { z } from 'zod';

export const facultySchema = z.object({
    password: z.string({ message: 'Password is required' }).optional(),

    faculty: z.object({
        name: z.object({
            firstName: z.string({ message: 'First name is required' }).min(1),
            middleName: z.string({ message: 'Middle name is required' }).min(1),
            lastName: z.string({ message: 'Last name is required' }).min(1),
        }),
        email: z.string({ message: 'Email is required' }).email('Invalid email').min(1),
        contactNo: z.string({ message: 'Contact Number is required' }).min(1),
        designation: z.string({ message: 'Designation is required' }).min(1),
        dateOfBirth: z.string({ message: 'Date of birth is required' }).min(1),
        emergencyContactNo: z.string({ message: 'Emergency Contact Number is required' }).min(1),
        bloodGroup: z.string({ message: 'Blood Group is required' }).min(1),
        gender: z.string({ message: 'Gender is required' }).min(1),
        academicDepartment: z.string({
            message: 'Academic Department is required',
        }),
        profileImage: z.any().optional(),
        academicFaculty: z.string({ message: 'Academic Department is required' }),
        presentAddress: z.string({ message: 'Present Address is required' }).min(1),
        permanentAddress: z.string({ message: 'Permanent Address is required' }).min(1),
    }),
});
