"use client";

import AcademicDepartmentField from "@/components/Academic/AcademicDepartmentField";
import AcademicFacultyField from "@/components/Academic/AcademicFacultyField";
import CustomDatePicker from "@/components/Forms/CustomDatePicker";
import CustomFileUpload from "@/components/Forms/CustomFileUpload";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomTextareaField from "@/components/Forms/CustomTextareaField";
import CustomLoading from "@/components/Loader/CustomLoading";
import {
  useAddFacultyWithFormDataMutation,
  useFacultyByIdQuery,
  useUpdateFacultyMutation,
} from "@/redux/api/facultyApi";
import { facultySchema } from "@/schemas/faculty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BloodGroupField from "../Fields/BloodGroupField";
import GenderField from "../Fields/GenderField";
import FacultyDesignationField from "../Fields/FacultyDesignationField";

export default function FacultyForm({ id = "" }: { id: string }) {
  const router = useRouter();
  const [academicFacultyId, setAcademicFacultyId] = useState<string>("");
  const { data, isLoading } = useFacultyByIdQuery(id, {
    skip: !id,
  });

  const [addFacultyWithFormData] = useAddFacultyWithFormDataMutation();
  const [updateFaculty] = useUpdateFacultyMutation();

  const defaultValues = {
    password: "",
    faculty: {
      name: {
        firstName: data?.name.firstName,
        middleName: data?.name?.middleName,
        lastName: data?.name?.lastName,
      },
      email: data?.email,
      contactNo: data?.contactNo,
      designation: data?.designation,
      dateOfBirth: data?.dateOfBirth,
      emergencyContactNo: data?.emergencyContactNo,
      bloodGroup: data?.bloodGroup,
      gender: data?.gender,
      academicDepartment: data?.academicDepartment?.syncId,
      academicFaculty: data?.academicFaculty?.syncId,
      presentAddress: data?.presentAddress,
      permanentAddress: data?.permanentAddress,
    },
  };

  useEffect(() => {
    if (data?.academicFaculty?.syncId) {
      setAcademicFacultyId(data?.academicFaculty?.syncId);
    }
  }, [data?.academicFaculty?.syncId]);

  const onSubmit = async (values: any) => {
    console.log({ values });
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    //
    if (!!id) {
      const body = values.faculty;
      delete body["profileImage"];
      const res = await updateFaculty({ id, body });
      if (!!res) {
        router.back();
        console.log("res", { res });
      }
    } else {
      const res = await addFacultyWithFormData(formData);
      if (!!res) {
        router.back();
        console.log("res", { res });
      }
    }
  };

  if (isLoading) return <CustomLoading height={`h-[80vh]`} />;
  return (
    <CustomForm
      submitHandler={onSubmit}
      cancelHandler={() => router.back()}
      resolver={zodResolver(facultySchema)}
      defaultValues={defaultValues}
      className={`flex flex-col gap-3`}
    >
      {/* ADMIN INFORMATION */}
      <div
        className={`border border-[#d9d9d9] rounded p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3`}
      >
        <p className={`font-bold mb-2.5 drop-shadow-sm md:col-span-3`}>
          Faculty Information
        </p>
        {!id && (
          <CustomFileUpload id="file" name="file" required label="Image" />
        )}

        {/* firstName */}
        <CustomInputField
          id="faculty.name.firstName"
          name="faculty.name.firstName"
          type="text"
          label="First Name"
          placeholder="First Name"
          required
        />
        {/* middleName */}
        <CustomInputField
          id="faculty.name.middleName"
          name="faculty.name.middleName"
          type="text"
          label="Middle Name"
          placeholder="Middle Name"
          required
        />
        {/* lastName */}
        <CustomInputField
          id="faculty.name.lastName"
          name="faculty.name.lastName"
          type="text"
          label="Last Name"
          placeholder="Last Name"
          required
        />
        {/* password */}
        {!id && (
          <CustomInputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            required
          />
        )}
        {/* gender */}
        <GenderField name="faculty.gender" label="Gender" required={true} />
        {/* academicDepartment */}
        <AcademicFacultyField
          name={"faculty.academicFaculty"}
          label="Academic Faculty"
          onChange={(e) => setAcademicFacultyId(e)}
        />
        {/* academicDepartment */}
        <AcademicDepartmentField
          name={"faculty.academicDepartment"}
          label="Academic Department"
          academicFacultyId={academicFacultyId || ""}
        />
      </div>

      {/* basic info */}
      <div
        className={`border border-[#d9d9d9] rounded p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3`}
      >
        <p
          className={`font-bold mb-2.5 drop-shadow-sm col-span-1 md:col-span-3`}
        >
          Basic Information
        </p>
        {/* email */}
        <CustomInputField
          id="faculty.email"
          name="faculty.email"
          type="email"
          label="Email address"
          placeholder="Email address"
          required
        />
        {/* contactNo */}
        <CustomInputField
          id="faculty.contactNo"
          name="faculty.contactNo"
          type="text"
          label="Contact No."
          placeholder="Contact No."
          required
        />
        {/* emergencyContactNo */}
        <CustomInputField
          id="faculty.emergencyContactNo"
          name="faculty.emergencyContactNo"
          type="text"
          label="Emergency Contact No."
          placeholder="Emergency Contact No."
          required
        />
        {/* dateOfBirth */}
        <CustomDatePicker
          // id="faculty.dateOfBirth"
          name="faculty.dateOfBirth"
          label="Date of birth"
          placeholder="Date of birth"
          required
        />
        {/* bloodGroup */}
        <BloodGroupField
          name="faculty.bloodGroup"
          label="Blood group"
          required
        />
        {/* designation */}
        <FacultyDesignationField
          name="faculty.designation"
          label="Designation"
          required
        />
        {/* presentAddress */}
        <CustomTextareaField
          id="faculty.presentAddress"
          name="faculty.presentAddress"
          label="Present address"
          placeholder="Present address"
          required
          wrapperClassName={`md:col-span-3`}
          height={`h-24`}
        />
        {/* permanentAddress */}
        <CustomTextareaField
          id="faculty.permanentAddress"
          name="faculty.permanentAddress"
          label="Permanent address"
          placeholder="Permanent address"
          required
          wrapperClassName={`md:col-span-3`}
          height={`h-24`}
        />
      </div>
    </CustomForm>
  );
}
