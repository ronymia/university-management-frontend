'use client';

import AcademicDepartmentField from '@/components/Academic/AcademicDepartmentField';
import SemesterRegistrationField from '@/components/Academic/SemesterRegistrationField';
import CustomForm from '@/components/Forms/CustomForm';
import CustomSelect from '@/components/Forms/CustomSelect';
import CustomLoading from '@/components/Loader/CustomLoading';
import { useCoursesQuery } from '@/redux/api/courseApi';
import {
    useAddOfferedCourseMutation,
    useOfferedCourseQuery,
    useUpdateOfferedCourseMutation,
} from '@/redux/api/offeredCourseApi';
import {
    offeredCourseCreateSchema,
    offeredCourseUpdateSchema,
} from '@/schemas/admin/offeredCourse';
import { zodResolver } from '@hookform/resolvers/zod';

type IDProps = {
    popupCloseHandler: () => void;
    id: string;
};

export default function OfferedCourseForm({ id, popupCloseHandler }: IDProps) {
    const { data, isLoading } = useOfferedCourseQuery(id, { skip: !id });
    const [addOfferedCourse] = useAddOfferedCourseMutation();
    const [updateOfferedCourse] = useUpdateOfferedCourseMutation();

    //
    const allCourses = useCoursesQuery({
        limit: 10,
        page: 1,
    });

    // const academicDepartments = useAcademicDepartmentByIdQuery(data?.academicDepartmentId, {
    //     skip: !data?.academicDepartmentId,
    // });

    const courses = allCourses?.data?.courses ?? [];
    const courseOptions = courses?.map((item) => {
        return {
            label: item?.title,
            value: item?.id,
        };
    });

    /* !!!need to pass academic_semester data */

    const onSubmit = async (values: any) => {
        if (id) {
            if (values?.courseIds) {
                values.courseId = values.courseIds;
                delete values.courseIds;
            }
            const res = await updateOfferedCourse({ id, body: values }).unwrap();
            if (res?.id) {
                popupCloseHandler?.();
            }
        } else {
            const res = await addOfferedCourse(values).unwrap();
            if (res) {
                popupCloseHandler?.();
            }
        }
    };

    const defaultValues = {
        semesterRegistrationId: data?.semesterRegistrationId || '',
        academicDepartmentId: data?.academicDepartmentId || '',
        courseIds: data?.courseId || '',
    };

    if (isLoading) {
        return <CustomLoading />;
    }
    return (
        <>
            <CustomForm
                submitHandler={onSubmit}
                cancelHandler={popupCloseHandler}
                resolver={
                    id
                        ? zodResolver(offeredCourseUpdateSchema)
                        : zodResolver(offeredCourseCreateSchema)
                }
                defaultValues={!!defaultValues ? defaultValues : undefined}
                className={`flex flex-col gap-2`}
            >
                {/* semesterRegistrationId */}
                <SemesterRegistrationField
                    name={`semesterRegistrationId`}
                    label={`Semester registration`}
                />

                {/* academicDepartmentId */}
                <AcademicDepartmentField
                    name={`academicDepartmentId`}
                    label={`Academic department`}
                />

                <CustomSelect
                    isLoading={allCourses.isLoading}
                    id={`courseIds`}
                    name={`courseIds`}
                    options={courseOptions}
                    label={`Courses`}
                    required
                    multipleSelect={id ? false : true}
                />
            </CustomForm>
        </>
    );
}
