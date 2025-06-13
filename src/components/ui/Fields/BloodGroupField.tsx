import CustomSelect from "@/components/Forms/CustomSelect";
import { bloodGroupOptions } from "@/constants/global";

export default function BloodGroupField({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required: boolean;
}) {
  return (
    <CustomSelect
      isLoading={false}
      name={name}
      id={name}
      options={bloodGroupOptions}
      label={label}
      placeholder={label}
      required={required}
    />
  );
}
