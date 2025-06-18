"use client";

import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomSelect from "@/components/Forms/CustomSelect";
import CustomLoading from "@/components/Loader/CustomLoading";
import { useBuildingsQuery } from "@/redux/api/buildingApi";
import {
  useAddRoomMutation,
  useRoomQuery,
  useUpdateRoomMutation,
} from "@/redux/api/roomApi";
import { roomSchema } from "@/schemas/admin/room";
import { zodResolver } from "@hookform/resolvers/zod";

type IDProps = {
  popupCloseHandler: () => void;
  id: string;
};

export default function RoomForm({ id, popupCloseHandler }: IDProps) {
  const { data, isLoading } = useRoomQuery(id, { skip: !id });
  const [addRoom] = useAddRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const allBuildings = useBuildingsQuery({
    limit: 100,
    page: 1,
  });
  const buildings = allBuildings?.data?.buildings;
  const buildingOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

  const onSubmit = async (values: { title: string }) => {
    if (id) {
      const res = await updateRoom({ id, body: values }).unwrap();
      if (res?.id) {
        popupCloseHandler?.();
      }
    } else {
      const res = await addRoom(values).unwrap();
      if (res?.id) {
        popupCloseHandler?.();
      }
    }
  };

  const defaultValues = {
    roomNumber: data?.roomNumber || "",
    floor: data?.floor || "",
    buildingId: data?.buildingId || "",
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        cancelHandler={popupCloseHandler}
        resolver={zodResolver(roomSchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* buildingId */}
        <CustomSelect
          // position="top"
          isLoading={allBuildings.isLoading}
          id={`buildingId`}
          name={`buildingId`}
          options={buildingOptions as { label: string; value: string }[]}
          label={`Building`}
          required
        />

        {/* floor */}
        <CustomInputField
          id="floor"
          name="floor"
          type="text"
          label="Floor"
          placeholder="Floor"
          required
        />

        {/* roomNumber */}
        <CustomInputField
          id="roomNumber"
          name="roomNumber"
          type="text"
          label="Room Number"
          placeholder="Room Number"
          required
        />
      </CustomForm>
    </>
  );
}
