"use client";
import CustomSelect from "../Forms/CustomSelect";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";

export default function AcademicDepartmentField({
  academicFacultyId,
  name,
  label,
  onChange,
}: {
  academicFacultyId?: string;
  name: string;
  label: string;
  onChange?: (e: any) => void;
}) {
  console.log({ academicFacultyId });
  const { data, isLoading, isFetching } = useAcademicDepartmentsQuery(
    {
      limit: 100,
      page: 1,
      academicFacultyId,
    },
    {
      skip: !!academicFacultyId && !academicFacultyId,
    }
  );
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
      isLoading={isLoading || isFetching}
      name={name}
      id={name}
      options={acDepartmentOptions ?? []}
      label={label}
      placeholder={label}
      required
      changeHandler={(e) => (onChange ? onChange(e) : undefined)}
    />
  );
}
