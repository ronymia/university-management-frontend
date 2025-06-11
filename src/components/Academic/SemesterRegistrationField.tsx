"use client";
import CustomSelect from "../Forms/CustomSelect";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";

type SemesterRegistrationFieldProps = {
  name: string;
  label?: string;
  onChange?: (e: any) => void;
};

const SemesterRegistrationField = ({
  name,
  label,
  onChange,
}: SemesterRegistrationFieldProps) => {
  const { data, isLoading } = useSemesterRegistrationsQuery({
    limit: 100,
    page: 1,
  });
  const semesterRegistrations = data?.semesterRegistrations;
  const semesterRegistrationsOptions = semesterRegistrations?.map(
    (semester) => {
      return {
        label:
          semester?.academicSemester?.title +
          "-" +
          semester?.academicSemester?.year,
        value: semester?.id,
      };
    }
  );

  return (
    <CustomSelect
      isLoading={isLoading}
      name={name}
      id={name}
      options={semesterRegistrationsOptions ?? []}
      label={label}
      placeholder={label}
      required
      changeHandler={(e) => (onChange ? onChange(e) : undefined)}
    />
  );
};

export default SemesterRegistrationField;
