import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import ActionBar from "@/components/ui/ActionBar";
import { useUpdateMarksMutation } from "@/redux/api/studentEnrollCourseMarkApi";
import React from "react";

export default function UpdateMarkPage({ searchParams }: Record<string, any>) {
  const {
    examType,
    marks,
    academicSemesterId,
    studentId,
    courseId,
    offeredCourseSectionId,
  } = searchParams;

  const [updateMarks] = useUpdateMarksMutation();
  const onSubmit = async (values: any) => {
    values.marks = parseInt(values.marks);
    try {
      const res = await updateMarks(values).unwrap();
      if (res) {
        //   message.success("Marks updated");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    examType,
    marks,
    academicSemesterId,
    studentId,
    courseId,
    offeredCourseSectionId,
  };
  return (
    <>
      <ActionBar title="Update mark"></ActionBar>
      <CustomForm
        submitHandler={onSubmit}
        // resolver={zodResolver(managementDepartmentSchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* title */}
        <CustomInputField
          id="marks"
          name="marks"
          type="text"
          label="marks"
          placeholder="marks"
          required
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            // disabled={updateResult.isLoading || createResult.isLoading}
            className={`px-3 py-2 border border-primary rounded-lg text-primary drop-shadow-2xl cursor-pointer w-xs`}
          >
            Cancel
          </button>
          <button
            type="submit"
            // disabled={updateResult.isLoading || createResult.isLoading}
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
