import React from "react";
import CustomSelect from "../Forms/CustomSelect";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";

export default function AcademicDepartmentField({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  const academicDepartments = data?.academicDepartments;
  const acDepartmentOptions = academicDepartments?.map((acDepartment: any) => {
    // console.log(acDepartment?.id);
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });
  return (
    <CustomSelect
      name={name}
      id={name}
      options={acDepartmentOptions}
      label={label}
      placeholder={label}
      required
    />
  );
}
