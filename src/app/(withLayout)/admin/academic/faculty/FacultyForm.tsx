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
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();
  // console.log("id", { id });

  const onSubmit = async (values: { title: string }) => {
    if (id) {
      const res = await updateAcademicFaculty({ id, body: values }).unwrap();
      console.log({ res });
      if (res?.id) {
        popupCloseHandler?.();
      }
    } else {
      const res = await addAcademicFaculty(values).unwrap();
      if (res?.id) {
        popupCloseHandler?.();
      }
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
        cancelHandler={popupCloseHandler}
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
      </CustomForm>
    </>
  );
}
