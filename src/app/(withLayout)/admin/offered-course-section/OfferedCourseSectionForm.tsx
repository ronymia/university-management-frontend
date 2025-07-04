'use client';

import AcademicDepartmentField from '@/components/ui/Fields/Academic/AcademicDepartmentField';
import SemesterRegistrationField from '@/components/ui/Fields/Academic/SemesterRegistrationField';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomSelect from '@/components/Forms/CustomSelect';
import CustomLoading from '@/components/Loader/CustomLoading';
import FormDynamicFields from '@/components/ui/FormDynamicFields';
import { useOfferedCoursesQuery } from '@/redux/api/offeredCourseApi';
import {
    useAddOfferedCourseSectionMutation,
    useOfferedCourseSectionQuery,
    useUpdateOfferedCourseSectionMutation,
} from '@/redux/api/offeredCourseSectionApi';
import { offeredCourseSectionSchema } from '@/schemas/admin/offeredCourseSection';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type IDProps = {
    id: string;
};

export default function OfferedCourseSectionForm({ id }: IDProps) {
    const router = useRouter();
    const { data, isLoading } = useOfferedCourseSectionQuery(id, { skip: !id });
    const [addOfferedCourseSection, createResult] = useAddOfferedCourseSectionMutation();
    const [updateOfferedCourseSection, updateResult] = useUpdateOfferedCourseSectionMutation();

    const [academicDepartmentId, setAcademicDepartmentId] = useState<string>();
    const [semesterRegistrationId, setSemesterRegistrationId] = useState<string>();

    const query: Record<string, any> = {};

    if (!!academicDepartmentId) {
        query['academicDepartmentId'] = academicDepartmentId;
    }
    if (!!semesterRegistrationId) {
        query['semesterRegistrationId'] = semesterRegistrationId;
    }
    const offeredCoursesQuery = useOfferedCoursesQuery({
        limit: 10,
        page: 1,
        ...query,
    });

    const offeredCourses = offeredCoursesQuery?.data?.offeredCourses;
    const offeredCoursesOptions = offeredCourses?.map((offCourse) => {
        // console.log(offCourse?.course?.id);
        return {
            label: offCourse?.course?.title,
            value: offCourse?.id,
        };
    });

    /* !!!need to pass academic_semester data */

    const onSubmit = async (values: any) => {
        values.maxCapacity = parseInt(values?.maxCapacity);
        if (id) {
            const res = await updateOfferedCourseSection({
                id,
                body: values,
            }).unwrap();

            if (res?.id) {
                router.back();
            }
        } else {
            const res = await addOfferedCourseSection(values).unwrap();
            if (res?.id) {
                router.back();
            }
        }
    };

    const defaultValues = {
        semesterRegistrationId: data?.semesterRegistrationId || '',
        academicDepartment: data?.offeredCourse.academicDepartmentId || '',
        offeredCourseId: data?.offeredCourseId || '',
        title: data?.title || '',
        maxCapacity: String(data?.maxCapacity) || '',
        classSchedules:
            data?.offeredCourseClassSchedules?.map((classSchedule) => ({
                id: classSchedule.id,
                dayOfWeek: classSchedule.dayOfWeek,
                startTime: classSchedule.startTime,
                endTime: classSchedule.endTime,
                roomId: classSchedule.roomId,
                facultyId: classSchedule.facultyId,
            })) || [],
    };

    if (isLoading) {
        return <CustomLoading />;
    }
    return (
        <>
            <CustomForm
                submitHandler={onSubmit}
                cancelHandler={() => router.back()}
                showFormActionButton={false}
                resolver={zodResolver(offeredCourseSectionSchema)}
                defaultValues={!!defaultValues ? defaultValues : undefined}
                className={`grid grid-cols-1 md:grid-cols-2 gap-3`}
            >
                <div className="relative">
                    <div className="flex flex-col sticky top-0 left-0">
                        <h1 className={`text-center text-2xl font-semibold drop-shadow-2xl my-3`}>
                            Course Section
                        </h1>
                        <div className="mb-1.5 p-5 rounded-md border border-[#d9d9d9] flex flex-col gap-2">
                            {/* semesterRegistrationId */}
                            <SemesterRegistrationField
                                name="semesterRegistrationId"
                                label="Semester Registration"
                                onChange={(el) => setSemesterRegistrationId(el)}
                            />

                            {/* academicDepartment */}
                            <AcademicDepartmentField
                                name={`academicDepartment`}
                                label={`Academic department`}
                                onChange={(el) => setAcademicDepartmentId(el)}
                            />
                            {/* offeredCourseId */}
                            <CustomSelect
                                isLoading={
                                    offeredCoursesQuery.isLoading || offeredCoursesQuery.isFetching
                                }
                                id={`offeredCourseId`}
                                name={`offeredCourseId`}
                                label={`Offered course`}
                                options={offeredCoursesOptions ?? []}
                                required
                            />

                            {/* title */}
                            <CustomInputField
                                id="title"
                                name="title"
                                type="text"
                                label="Section"
                                placeholder="Title"
                                required
                            />
                            {/* maxCapacity */}
                            <CustomInputField
                                id="maxCapacity"
                                name="maxCapacity"
                                type="number"
                                label="Max Capacity"
                                placeholder="Max Capacity"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="">
                    <FormDynamicFields academicDepartmentId={academicDepartmentId} />
                </div>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        type="button"
                        disabled={updateResult.isLoading || createResult.isLoading}
                        onClick={() => router.back()}
                        className={`px-3 py-2 border border-primary rounded-lg text-primary drop-shadow-2xl cursor-pointer w-xs`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updateResult.isLoading || createResult.isLoading}
                        className={`px-3 py-2 bg-primary rounded-lg text-base-300 drop-shadow-2xl cursor-pointer w-xs`}
                    >
                        Submit
                    </button>
                </div>
            </CustomForm>
        </>
    );
}
