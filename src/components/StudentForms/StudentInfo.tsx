"use client";
import CustomInputField from "../Forms/CustomInputField";
import AcademicDepartmentField from "../Academic/AcademicDepartmentField";
import AcademicFacultyField from "../Academic/AcademicFacultyField";
import AcademicSemesterField from "../Academic/AcademicSemesterField";
import CustomRadioButton from "../Forms/CustomRadioButton";
import CustomFileUpload from "../Forms/CustomFileUpload";
import { useState } from "react";

const StudentInfo = ({
  studentId,
  academicFacultyId: propsAcademicFacultyId,
}: {
  studentId?: string;
  academicFacultyId?: string;
}) => {
  const [academicFacultyId, setAcademicFacultyId] = useState<string>(
    propsAcademicFacultyId || ""
  );
  return (
    <div className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5`}>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-3`}>
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
        <AcademicSemesterField
          name="student.academicSemester"
          label="Academic Semester"
        />

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
          name="student.academicDepartment"
          label="Academic Department"
        />

        {/* gender */}
        <CustomRadioButton
          id="student.gender"
          name="student.gender"
          label="Gender"
          required
          options={[
            {
              name: "student.gender",
              title: "Male",
              value: "male",
            },
            {
              name: "student.gender",
              title: "Female",
              value: "female",
            },
          ]}
        />
        {!studentId ? (
          <CustomFileUpload id="file" name="file" required label="Image" />
        ) : null}
      </div>
    </div>
  );
};

export default StudentInfo;
