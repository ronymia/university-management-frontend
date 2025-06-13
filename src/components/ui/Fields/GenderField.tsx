import CustomRadioButton from "@/components/Forms/CustomRadioButton";

export default function GenderField({
  name,
  label = "Gender",
  required,
}: {
  name: string;
  label: string;
  required: boolean;
}) {
  return (
    <CustomRadioButton
      id={name}
      name={name}
      label={label}
      required={required}
      options={[
        {
          name,
          title: "Male",
          value: "male",
        },
        {
          name,
          title: "Female",
          value: "female",
        },
      ]}
    />
  );
}
