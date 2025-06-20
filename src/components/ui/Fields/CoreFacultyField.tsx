import { useFacultiesFromCoreQuery } from "@/redux/api/facultyApi";
import CustomSelect from "@/components/Forms/CustomSelect";

type FacultyProps = {
  name: string;
  label?: string;
  academicDepartmentId?: string;
};

const CoreFacultyField = ({
  name,
  label,
  academicDepartmentId,
}: FacultyProps) => {
  const { data, isLoading } = useFacultiesFromCoreQuery({
    limit: 100,
    page: 1,
    academicDepartmentId: academicDepartmentId ?? "",
  });
  const faculties = data?.faculties;
  const facultiesOptions = faculties?.map((faculty: any) => {
    // console.log(faculty);
    //ts-ignore
    return {
      label: `${faculty?.firstName} ${faculty?.lastName} ${faculty?.middleName}`,
      value: faculty?.id,
    };
  });

  return (
    <CustomSelect
      isLoading={isLoading}
      name={name}
      id={name}
      options={facultiesOptions ?? []}
      label={label}
      placeholder={label}
      required
    />
  );
};

export default CoreFacultyField;
