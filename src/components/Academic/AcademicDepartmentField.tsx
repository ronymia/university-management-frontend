import React from "react";
import CustomSelect from "../Forms/CustomSelect";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";

export default function AcademicDepartmentField({
  name,
  label,
  onChange,
}: {
  name: string;
  label: string;
  onChange: () => void;
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
      isLoading={isLoading}
      name={name}
      id={name}
      options={acDepartmentOptions}
      label={label}
      placeholder={label}
      required
      changeHandler={(e) => (onChange ? onChange(e) : undefined)}
    />
  );
}
