import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomLoading from "@/components/Loader/CustomLoading";
import {
  useAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
} from "@/redux/api/academic/facultyApi";
import { academicFacultySchema } from "@/schemas/academic/facultySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

export default function AcademicFacultyForm({
  id,
  popupCloseHandler,
}: {
  id: string;
  popupCloseHandler: () => void;
}) {
  const { data, isLoading } = useAcademicFacultyQuery(id, { skip: !id });
  const [addAcademicFaculty, createResult] = useAddAcademicFacultyMutation();
  const [updateAcademicFaculty, updateResult] =
    useUpdateAcademicFacultyMutation();
  // console.log("id", { id });

  const onSubmit = async (values: { title: string }, reset: any) => {
    // console.log({ reset });
    // console.log({ values });
    try {
      if (id) {
        const res = await updateAcademicFaculty({ id, body: values }).unwrap();
        console.log({ res });
        if (res?.id) {
          reset?.();
          popupCloseHandler?.();
        }
      } else {
        const res = await addAcademicFaculty(values).unwrap();
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
  };

  if (isLoading) {
    return <CustomLoading height={`h-40`} />;
  }
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        resolver={zodResolver(academicFacultySchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        <CustomInputField
          id="title"
          name="title"
          type="text"
          label="Title"
          placeholder="Title"
          required
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
