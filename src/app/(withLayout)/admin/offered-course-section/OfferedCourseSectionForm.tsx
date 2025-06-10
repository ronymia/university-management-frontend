"use client";

import AcademicDepartmentField from "@/components/Academic/AcademicDepartmentField";
import SemesterRegistrationField from "@/components/Academic/SemesterRegistrationField";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomSelect from "@/components/Forms/CustomSelect";
import CustomLoading from "@/components/Loader/CustomLoading";
import FormDynamicFields from "@/components/ui/FormDynamicFields";
import { useOfferedCoursesQuery } from "@/redux/api/offeredCourseApi";
import {
  useAddOfferedCourseSectionMutation,
  useUpdateOfferedCourseSectionMutation,
} from "@/redux/api/offeredCourseSectionApi";
import { useRoomQuery } from "@/redux/api/roomApi";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";
import { offeredCourseSchema } from "@/schemas/admin/offeredCourse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type IDProps = {
  popupCloseHandler: () => void;
  id: string;
};

export default function OfferedCourseSectionForm({
  id,
  popupCloseHandler,
}: IDProps) {
  const { data, isLoading } = useRoomQuery(id, { skip: !id });
  const [addOfferedCourseSection, createResult] =
    useAddOfferedCourseSectionMutation();
  const [updateOfferedCourseSection, updateResult] =
    useUpdateOfferedCourseSectionMutation();
  const allSemesterRegistrations = useSemesterRegistrationsQuery({
    limit: 10,
    page: 1,
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

  const [acDepartmentId, setAcDepartmentId] = useState<string>();
  const [semesterRegistrationId, setSemesterRegistrationId] =
    useState<string>();

  const query: Record<string, any> = {};

  if (!!acDepartmentId) {
    query["academicDepartmentId"] = acDepartmentId;
  }
  if (!!semesterRegistrationId) {
    query["semesterRegistrationId"] = semesterRegistrationId;
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

  const onSubmit = async (values: any, reset: any) => {
    values.maxCapacity = parseInt(values?.maxCapacity);
    try {
      if (id) {
        const res = await updateOfferedCourseSection({
          id,
          body: values,
        }).unwrap();
        console.log({ res });
        if (res?.id) {
          reset?.();
          popupCloseHandler?.();
        }
      } else {
        const res = await addOfferedCourseSection(values).unwrap();
        if (res?.id) {
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
        className={`grid grid-cols-2 gap-3`}
      >
        <div className="flex flex-col gap-2">
          {/* semesterRegistrationId */}
          <SemesterRegistrationField
            name="semesterRegistration"
            label="Semester Registration"
            onChange={(el) => setSemesterRegistrationId(el)}
          />

          {/* academicDepartment */}
          <AcademicDepartmentField
            name={`academicDepartment`}
            label={`Academic department`}
          />
          {/* offeredCourseId */}
          <CustomSelect
            id={`offeredCourseId`}
            name={`offeredCourseId`}
            label={`Offered course`}
            options={offeredCoursesOptions}
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
            type="text"
            label="Max Capacity"
            placeholder="Max Capacity"
            required
          />
        </div>

        <div className="">
          <FormDynamicFields />
        </div>

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
