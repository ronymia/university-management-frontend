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
  const [addCourse] = useAddCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const allCourses = useCoursesQuery({ limit: 10, page: 1 });
  // console.log({ course: allCourses.data });
  const courses = allCourses?.data?.courses ?? [];
  const coursesOptions = courses?.map((course: any) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });
  const onSubmit = async (values: any) => {
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
    if (id) {
      const res = await updateCourse({ id, body: tempFormData }).unwrap();
      if (res?.id) {
        popupCloseHandler?.();
      }
    } else {
      const res = await addCourse(tempFormData).unwrap();
      if (res?.id) {
        popupCloseHandler?.();
      }
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

  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        cancelHandler={popupCloseHandler}
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
          type="number"
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
      </CustomForm>
    </>
  );
}
