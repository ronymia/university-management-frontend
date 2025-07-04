import { useRoomsQuery } from '@/redux/api/roomApi';
import CustomSelect from '@/components/Forms/CustomSelect';

type RoomProps = {
    name: string;
    label: string;
    buildingId?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (value: string) => void;
};

const RoomField = ({ name, label, buildingId, onChange, required = true }: RoomProps) => {
    // GET ALL ROOMS
    const { data, isLoading, isFetching } = useRoomsQuery(
        {
            limit: 100,
            page: 1,
            buildingId,
        },
        // { skip: !buildingId },
    );
    const rooms = data?.rooms;
    const roomsOptions = rooms?.map((room) => {
        return {
            label: room?.roomNumber,
            value: room?.id,
        };
    });

    return (
        <CustomSelect
            isLoading={isLoading || isFetching}
            name={name}
            id={name}
            options={roomsOptions ?? []}
            label={label}
            placeholder={label}
            required={required}
            // disabled={buildingId ? false : true}
            changeHandler={(e) => onChange?.(e)}
            // error={buildingId ? '' : 'Please select a building first'}
        />
    );
};

export default RoomField;
