"use client";
import CustomSelect from "../Forms/CustomSelect";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";

export default function AcademicSemesterField({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { data, isLoading } = useAcademicSemestersQuery({
    limit: 100,
    page: 1,
  });
  const academicSemesters = data?.academicSemesters;
  const acSemesterOptions = academicSemesters?.map((acFaculty) => {
    return {
      label: acFaculty?.title,
      value: acFaculty?.id,
    };
  });
  return (
    <CustomSelect
      isLoading={isLoading}
      name={name}
      id={name}
      options={acSemesterOptions ?? []}
      label={label}
      placeholder={label}
      required
    />
  );
}
