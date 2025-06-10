import CustomSelect from "@/components/Forms/CustomSelect";
import { useBuildingsQuery } from "@/redux/api/buildingApi";

const BuildingField = ({ name, label }: { name: string; label: string }) => {
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
      options={buildingsOptions}
      label={label}
      placeholder={label}
      required
    />
  );
};

export default BuildingField;
