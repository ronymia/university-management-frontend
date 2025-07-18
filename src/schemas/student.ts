import { bloodGroup, gender } from '@/constants/global';
import { z } from 'zod';

// Step 1: Basic Info
const studentStep1Schema = z.object({
    password: z.string().optional(),
    student: z.object({
        name: z.object({
            firstName: z.string({ required_error: 'First Name is required' }),
            middleName: z.string().optional(),
            lastName: z.string({ required_error: 'Last Name is required' }),
        }),
        gender: z.enum([...gender] as [string, ...string[]], {
            required_error: 'Gender is required',
        }),
        profileImage: z.any().optional(),
        academicSemester: z.string({
            required_error: 'Academic Semester is required',
        }),
        academicDepartment: z.string({
            required_error: 'Academic Department is required',
        }),
        academicFaculty: z.string({
            required_error: 'Academic Faculty is required',
        }),
    }),
});

// Step 2: Contact Info
const studentStep2Schema = z.object({
    student: z.object({
        email: z.string({ required_error: 'Email is required' }),
        contactNo: z
            .string({ required_error: 'Contact is required' })
            .min(11, 'Contact Number must be 11 digits')
            .max(11, 'Contact Number must be 11 digits'),
        emergencyContactNo: z
            .string({
                required_error: 'Emergency Contact is required',
            })
            .min(11, 'Contact Number must be 11 digits')
            .max(11, 'Contact Number must be 11 digits'),
        dateOfBirth: z.string({ required_error: 'Date Of Birth is required' }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string({ required_error: 'Present Address is required' }),
        permanentAddress: z.string({
            required_error: 'Permanent Address is required',
        }),
    }),
});

// Step 3: Guardian Info
const studentStep3Schema = z.object({
    student: z.object({
        guardian: z.object({
            fatherName: z.string({ required_error: 'Father Name is required' }),
            fatherOccupation: z.string({
                required_error: 'FatherOccupation is required',
            }),
            fatherContactNo: z
                .string({
                    required_error: 'Father Contact Number is required',
                })
                .min(11, 'Contact Number must be 11 digits')
                .max(11, 'Contact Number must be 11 digits'),
            motherName: z.string({ required_error: 'Mother Name is required' }),
            motherOccupation: z.string({
                required_error: 'MotherOccupation is required',
            }),
            motherContactNo: z
                .string({
                    required_error: 'Mother Contact Number is required',
                })
                .min(11, 'Contact Number must be 11 digits')
                .max(11, 'Contact Number must be 11 digits'),
            address: z.string({ required_error: 'Address is required' }),
        }),
    }),
});

// Step 4: Local Guardian Info
const studentStep4Schema = z.object({
    student: z.object({
        localGuardian: z.object({
            name: z.string({ required_error: 'Local Guardian Name is required' }),
            occupation: z.string({
                required_error: 'Local Guardian Occupation is required',
            }),
            contactNo: z
                .string({
                    required_error: 'Local Guardian Contact Number is required',
                })
                .min(11, 'Contact Number must be 11 digits')
                .max(11, 'Contact Number must be 11 digits'),
            address: z.string({
                required_error: 'Local Guardian Address is required',
            }),
        }),
    }),
});

export const studentStepSchemas = [
    studentStep1Schema,
    studentStep2Schema,
    studentStep3Schema,
    studentStep4Schema,
];

export const studentMasterSchema = z.object({
    password: z.string().optional(),
    student: z.object({
        name: z.object({
            firstName: z.string({ required_error: 'First Name is required' }),
            middleName: z.string().optional(),
            lastName: z.string({ required_error: 'Last Name is required' }),
        }),
        gender: z.enum([...gender] as [string, ...string[]], {
            message: 'Gender is required',
        }),
        profileImage: z.any().optional(),
        academicSemester: z.string({
            required_error: 'Academic Semester is required',
        }),
        academicDepartment: z.string({
            required_error: 'Academic Department is required',
        }),
        academicFaculty: z.string({
            required_error: 'Academic Faculty is required',
        }),

        // step 2
        email: z.string({ required_error: 'Email is required' }),
        contactNo: z
            .string({ required_error: 'Contact is required' })
            .min(11, 'Contact Number must be 11 digits')
            .max(11, 'Contact Number must be 11 digits'),
        emergencyContactNo: z
            .string({
                required_error: 'Emergency Contact is required',
            })
            .min(11, 'Contact Number must be 11 digits')
            .max(11, 'Contact Number must be 11 digits'),
        dateOfBirth: z.string({ required_error: 'Date Of Birth is required' }),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string({ required_error: 'Present Address is required' }),
        permanentAddress: z.string({
            required_error: 'Permanent Address is required',
        }),

        // step 3
        guardian: z.object({
            fatherName: z.string({ required_error: 'Father Name is required' }),
            fatherOccupation: z.string({
                required_error: 'FatherOccupation is required',
            }),
            fatherContactNo: z
                .string({
                    required_error: 'Father Contact Number is required',
                })
                .min(11, 'Contact Number must be 11 digits')
                .max(11, 'Contact Number must be 11 digits'),
            motherName: z.string({ required_error: 'Mother Name is required' }),
            motherOccupation: z.string({
                required_error: 'MotherOccupation is required',
            }),
            motherContactNo: z
                .string({
                    required_error: 'Mother Contact Number is required',
                })
                .min(11, 'Contact Number must be 11 digits')
                .max(11, 'Contact Number must be 11 digits'),
            address: z.string({ required_error: 'Address is required' }),
        }),

        // step 4
        localGuardian: z.object({
            name: z.string({ required_error: 'Local Guardian Name is required' }),
            occupation: z.string({
                required_error: 'Local Guardian Occupation is required',
            }),
            contactNo: z
                .string({
                    required_error: 'Local Guardian Contact Number is required',
                })
                .min(11, 'Contact Number must be 11 digits')
                .max(11, 'Contact Number must be 11 digits'),
            address: z.string({
                required_error: 'Local Guardian Address is required',
            }),
        }),
        //
    }),
});
