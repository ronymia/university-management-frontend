"use client";

import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomSelect from "@/components/Forms/CustomSelect";
import CustomLoading from "@/components/Loader/CustomLoading";
import {
  useAddCourseMutation,
  useCourseQuery,
  useCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/api/courseApi";
import { courseSchema } from "@/schemas/admin/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type IDProps = {
  popupCloseHandler: () => void;
  id: string;
};

export default function CourseForm({ id, popupCloseHandler }: IDProps) {
  const { data, isLoading } = useCourseQuery(id, { skip: !id });
  const [addCourse, createResult] = useAddCourseMutation();
  const [updateCourse, updateResult] = useUpdateCourseMutation();

  const allCourses = useCoursesQuery({ limit: 10, page: 1 });
  // console.log({ course: allCourses.data });
  const courses = allCourses?.data?.courses?.data ?? [];
  const coursesOptions = courses?.map((course: any) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });
  const onSubmit = async (values: any, reset: any) => {
    const tempFormData = { ...values };
    tempFormData.credits = parseInt(tempFormData?.credits);
    const coursePreRequisitesOptions = tempFormData?.preRequisiteCourses?.map(
      (id: string) => {
        return {
          courseId: id,
        };
      }
    );

    tempFormData.preRequisiteCourses = coursePreRequisitesOptions;
    try {
      if (id) {
        const res = await updateCourse({ id, body: tempFormData }).unwrap();
        console.log({ res });
        if (res?.id) {
          reset?.();
          popupCloseHandler?.();
        }
      } else {
        const res = await addCourse(tempFormData).unwrap();
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
    title: data?.title || "",
    code: data?.code || "",
    credits: String(data?.credits) || "",
    preRequisiteCourses: Array.isArray(data?.preRequisite)
      ? data?.preRequisite?.map((item: any) => item?.preRequisiteId)
      : [],
  };

  if (isLoading) {
    return <CustomLoading />;
  }

  console.log({ defaultValues });
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        resolver={zodResolver(courseSchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* title */}
        <CustomInputField
          id="title"
          name="title"
          type="text"
          label="Title"
          placeholder="Title"
          required
        />
        {/* code */}
        <CustomInputField
          id="code"
          name="code"
          type="text"
          label="Code"
          placeholder="Code"
          required
        />
        {/* credits */}
        <CustomInputField
          id="credits"
          name="credits"
          type="text"
          label="Course credits"
          placeholder="Course credits"
          required
        />

        {/* preRequisiteCourses */}
        <CustomSelect
          multipleSelect={true}
          isLoading={allCourses.isLoading}
          required={false}
          id={`preRequisiteCourses`}
          name={`preRequisiteCourses`}
          options={coursesOptions}
          label={`Pre Requisite Courses`}
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
