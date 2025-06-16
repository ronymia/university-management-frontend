import CustomSelect from "@/components/Forms/CustomSelect";
import { useBuildingsQuery } from "@/redux/api/buildingApi";

const BuildingField = ({
  name,
  label,
  onChange,
}: {
  name: string;
  label: string;
  onChange?: (value: string) => void;
}) => {
  const { data, isLoading } = useBuildingsQuery({
    limit: 100,
    page: 1,
  });
  const buildings = data?.buildings;
  const buildingsOptions = buildings?.map((building) => {
    return {
      label: building?.title,
      value: building?.id,
    };
  });

  return (
    <CustomSelect
      isLoading={isLoading}
      name={name}
      id={name}
      options={buildingsOptions ?? []}
      label={label}
      placeholder={label}
      required
      changeHandler={(e) => onChange?.(e)}
    />
  );
};

export default BuildingField;
