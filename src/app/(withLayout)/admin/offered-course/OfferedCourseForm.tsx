"use client";

import AcademicDepartmentField from "@/components/Academic/AcademicDepartmentField";
import SemesterRegistrationField from "@/components/Academic/SemesterRegistrationField";
import CustomForm from "@/components/Forms/CustomForm";
import CustomSelect from "@/components/Forms/CustomSelect";
import CustomLoading from "@/components/Loader/CustomLoading";
import { semesterRegistrationStatus } from "@/constants/global";
import { SemesterRegistrationStatus } from "@/enums/global";
import { useCoursesQuery } from "@/redux/api/courseApi";
import {
  useAddOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
} from "@/redux/api/offeredCourseApi";
import { useRoomQuery } from "@/redux/api/roomApi";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";
import { offeredCourseSchema } from "@/schemas/admin/offeredCourse";
import { zodResolver } from "@hookform/resolvers/zod";

type IDProps = {
  popupCloseHandler: () => void;
  id: string;
};

export default function OfferedCourseForm({ id, popupCloseHandler }: IDProps) {
  const { data, isLoading } = useRoomQuery(id, { skip: !id });
  const [addOfferedCourse, createResult] = useAddOfferedCourseMutation();
  const [updateOfferedCourse, updateResult] = useUpdateOfferedCourseMutation();
  const allSemesterRegistrations = useSemesterRegistrationsQuery({
    limit: 10,
    page: 1,
    status: [
      SemesterRegistrationStatus.ONGOING,
      SemesterRegistrationStatus.UPCOMING,
    ],
  });

  const semesterRegistrations =
    allSemesterRegistrations?.data?.semesterRegistrations;
  const semesterRegistrationsOptions = semesterRegistrations?.map(
    (semester) => {
      return {
        label: semester?.academicSemester?.title,
        value: semester?.id,
      };
    }
  );
  const allCourses = useCoursesQuery({
    limit: 10,
    page: 1,
  });
  console.log({ allCourses });
  const courses = allCourses?.data?.courses?.data ?? [];
  const courseOptions = courses?.map((item) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });

  /* !!!need to pass academic_semester data */

  const onSubmit = async (values: any, reset: any) => {
    // console.log({ reset });
    console.log({ values });
    try {
      if (id) {
        const res = await updateOfferedCourse({ id, body: values }).unwrap();
        console.log({ res });
        if (res?.id) {
          reset?.();
          popupCloseHandler?.();
        }
      } else {
        const res = await addOfferedCourse(values).unwrap();
        if (res?.success) {
          reset?.();
          popupCloseHandler?.();
        }
      }
    } catch (err: any) {
      reset?.(values);
      console.error(err.message);
      // message.error(err.message);
    }
  };

  const defaultValues = {
    semesterRegistrationId: data?.semesterRegistrationId || "",
    academicDepartmentId: data?.academicDepartmentId || "",
    courseIds: data?.courseIds || "",
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        resolver={zodResolver(offeredCourseSchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* semesterRegistrationId */}
        {/* <SemesterRegistrationField
          name={`semesterRegistrationId`}
          label={`Semester registration`}
        /> */}
        <CustomSelect
          isLoading={allSemesterRegistrations.isLoading}
          id={`semesterRegistrationId`}
          name={`semesterRegistrationId`}
          options={
            semesterRegistrationsOptions as { label: string; value: string }[]
          }
          label={`Semester registration`}
          required
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
          multipleSelect={true}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            disabled={updateResult.isLoading || createResult.isLoading}
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
        {/* <FormAction
          disabled={updateResult.isLoading || createResult.isLoading}
          cancelHandler={popupCloseHandler}
        /> */}
      </CustomForm>
    </>
  );
}
