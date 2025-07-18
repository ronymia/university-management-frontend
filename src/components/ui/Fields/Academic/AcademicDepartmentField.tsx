'use client';
import CustomSelect from '../../../Forms/CustomSelect';
import { useAcademicDepartmentsQuery } from '@/redux/api/academic/departmentApi';

export default function AcademicDepartmentField({
    isFilterOfferedCourse = false,
    academicFacultyId,
    name,
    label,
    onChange,
}: {
    isFilterOfferedCourse?: boolean;
    academicFacultyId?: string;
    name: string;
    label: string;
    onChange?: (e: any) => void;
}) {
    const { data, isLoading, isFetching } = useAcademicDepartmentsQuery(
        {
            limit: 100,
            page: 1,
            academicFacultyId,
        },
        {
            skip: !!academicFacultyId && !academicFacultyId,
        },
    );
    const academicDepartments = isFilterOfferedCourse
        ? data?.academicDepartments?.filter(
              (acDepartment) => acDepartment?.offeredCourses?.length > 0,
          )
        : data?.academicDepartments;
    const acDepartmentOptions = academicDepartments?.map((acDepartment) => {
        // console.log(acDepartment?.id);
        return {
            label: acDepartment?.title,
            value: acDepartment?.id,
        };
    });

    // console.log({ acDepartmentOptions });

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
