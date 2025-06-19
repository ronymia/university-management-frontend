"use client";

import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomLoading from "@/components/Loader/CustomLoading";
import {
  useAddDepartmentMutation,
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { managementDepartmentSchema } from "@/schemas/managementDepartment";
import { zodResolver } from "@hookform/resolvers/zod";

type IDProps = {
  popupCloseHandler: () => void;
  id: string;
};

export default function DepartmentForm({ id, popupCloseHandler }: IDProps) {
  const { data, isLoading } = useDepartmentQuery(id, { skip: !id });
  const [addDepartment] = useAddDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  // console.log("id", { id });

  const onSubmit = async (values: { title: string }) => {
    if (id) {
      const res = await updateDepartment({ id, body: values }).unwrap();
      if (res?.id) {
        popupCloseHandler?.();
      }
    } else {
      const res = await addDepartment(values).unwrap();
      if (res?.id) {
        popupCloseHandler?.();
      }
    }
  };

  const defaultValues = {
    title: data?.title || "",
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        cancelHandler={popupCloseHandler}
        resolver={zodResolver(managementDepartmentSchema)}
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
      </CustomForm>
    </>
  );
}
