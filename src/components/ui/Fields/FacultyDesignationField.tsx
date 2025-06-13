import CustomSelect from "@/components/Forms/CustomSelect";
import { designation } from "@/constants/global";

export default function FacultyDesignationField({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required: boolean;
}) {
  const designationOptions = designation.map((item) => ({
    label: item,
    value: item,
  }));
  return (
    <CustomSelect
      isLoading={false}
      name={name}
      id={name}
      options={designationOptions}
      label={label}
      placeholder={label}
      required={required}
    />
  );
}
