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
  const [addRoom, createResult] = useAddRoomMutation();
  const [updateRoom, updateResult] = useUpdateRoomMutation();
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

  const onSubmit = async (values: { title: string }, reset: any) => {
    // console.log({ reset });
    // console.log({ values });
    try {
      if (id) {
        const res = await updateRoom({ id, body: values }).unwrap();
        console.log({ res });
        if (res?.id) {
          reset?.();
          popupCloseHandler?.();
        }
      } else {
        const res = await addRoom(values).unwrap();
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
        resolver={zodResolver(roomSchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* roomNumber */}
        <CustomInputField
          id="roomNumber"
          name="roomNumber"
          type="text"
          label="Room Number"
          placeholder="Room Number"
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

        {/* buildingId */}
        <CustomSelect
          id={`buildingId`}
          name={`buildingId`}
          options={buildingOptions}
          label={`Building`}
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
