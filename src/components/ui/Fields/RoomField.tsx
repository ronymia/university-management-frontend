import { useRoomsQuery } from "@/redux/api/roomApi";
import CustomSelect from "@/components/Forms/CustomSelect";

type RoomProps = {
  name: string;
  label?: string;
};

const RoomField = ({ name, label }: RoomProps) => {
  const { data, isLoading } = useRoomsQuery({
    limit: 100,
    page: 1,
  });
  const rooms = data?.rooms;
  const roomsOptions = rooms?.map((room) => {
    // console.log(room);
    return {
      label: room?.roomNumber,
      value: room?.id,
    };
  });

  return (
    <CustomSelect
      isLoading={isLoading}
      name={name}
      id={name}
      options={roomsOptions ?? []}
      label={label}
      placeholder={label}
      required
    />
  );
};

export default RoomField;
