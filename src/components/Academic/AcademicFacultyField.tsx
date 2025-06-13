"use client";
import CustomSelect from "../Forms/CustomSelect";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";

export default function AcademicFacultyField({
  name,
  label,
  onChange,
}: {
  name: string;
  label: string;
  onChange?: (e: any) => void;
}) {
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });
  const academicFaculties = data?.academicFaculties;
  const acFacultyOptions = academicFaculties?.map((acFaculty) => {
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
      options={acFacultyOptions ?? []}
      label={label}
      placeholder={label}
      required
      changeHandler={(e) => (onChange ? onChange(e) : undefined)}
    />
  );
}
