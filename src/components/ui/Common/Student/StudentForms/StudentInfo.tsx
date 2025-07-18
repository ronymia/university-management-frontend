'use client';
import CustomImageUpload from '@/components/Forms/CustomImageUpload';
import CustomInputField from '@/components/Forms/CustomInputField';
import AcademicDepartmentField from '@/components/ui/Fields/Academic/AcademicDepartmentField';
import AcademicFacultyField from '@/components/ui/Fields/Academic/AcademicFacultyField';
import AcademicSemesterField from '@/components/ui/Fields/Academic/AcademicSemesterField';
import GenderField from '@/components/ui/Fields/GenderField';
import { useState } from 'react';

const StudentInfo = ({
    studentId,
    academicFacultyId: propsAcademicFacultyId,
}: {
    studentId?: string;
    academicFacultyId?: string;
}) => {
    const [academicFacultyId, setAcademicFacultyId] = useState<string>(
        propsAcademicFacultyId || '',
    );
    return (
        <div className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5`}>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-3`}>
                {/* PROFILE PICTURE */}
                {!studentId && (
                    <CustomImageUpload
                        id="student.profileImage"
                        name="student.profileImage"
                        label="Profile Picture"
                        wrapperClassName="row-span-1 md:row-span-2"
                    />
                )}

                {/* firstName */}
                <CustomInputField
                    id="student.name.firstName"
                    name="student.name.firstName"
                    type="text"
                    label="First Name"
                    placeholder="First Name"
                    required
                />
                {/* middleName */}
                <CustomInputField
                    id="student.name.middleName"
                    name="student.name.middleName"
                    type="text"
                    label="Middle Name"
                    placeholder="Middle Name"
                    required={false}
                />
                {/* lastName */}
                <CustomInputField
                    id="student.name.lastName"
                    name="student.name.lastName"
                    type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    required
                />
                {/* password */}
                {!studentId ? (
                    <CustomInputField
                        id="password"
                        name="password"
                        type="text"
                        label="Password"
                        placeholder="Password"
                        required={false}
                    />
                ) : null}

                {/* academicSemester */}
                <AcademicSemesterField name="student.academicSemester" label="Academic Semester" />

                {/* academicFaculty */}
                <AcademicFacultyField
                    name="student.academicFaculty"
                    label="Academic Faculty"
                    onChange={(e) => {
                        setAcademicFacultyId(e);
                        console.log({ e });
                    }}
                />

                {/* academicDepartment */}
                <AcademicDepartmentField
                    academicFacultyId={academicFacultyId}
                    isFilterOfferedCourse={false}
                    name="student.academicDepartment"
                    label="Academic Department"
                />

                {/* gender */}
                <GenderField name="student.gender" label="Gender" required />
            </div>
        </div>
    );
};

export default StudentInfo;
