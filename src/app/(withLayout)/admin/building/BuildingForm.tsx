"use client";

import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomLoading from "@/components/Loader/CustomLoading";
import {
  useAddBuildingMutation,
  useBuildingQuery,
  useUpdateBuildingMutation,
} from "@/redux/api/buildingApi";
import { buildingSchema } from "@/schemas/admin/building";
import { zodResolver } from "@hookform/resolvers/zod";

type IDProps = {
  popupCloseHandler: () => void;
  id: string;
};

export default function BuildingForm({ id, popupCloseHandler }: IDProps) {
  const { data, isLoading } = useBuildingQuery(id, { skip: !id });
  const [addBuilding] = useAddBuildingMutation();
  const [updateBuilding] = useUpdateBuildingMutation();
  // console.log("id", { id });

  const onSubmit = async (values: { title: string }) => {
    if (id) {
      const res = await updateBuilding({ id, body: values }).unwrap();
      // console.log({ res });
      if (res?.id) {
        popupCloseHandler?.();
      }
    } else {
      const res = await addBuilding(values).unwrap();
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
        resolver={zodResolver(buildingSchema)}
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
