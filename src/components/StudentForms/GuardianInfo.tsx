import CustomInputField from "../Forms/CustomInputField";
import CustomTextareaField from "../Forms/CustomTextareaField";

const GuardianInfo = () => {
  return (
    <>
      <div
        className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-3 gap-3`}
      >
        {/* email */}
        <CustomInputField
          id="student.guardian.fatherName"
          name="student.guardian.fatherName"
          type="text"
          label="Father name"
          placeholder="Father name"
          required
        />
        {/* fatherOccupation */}
        <CustomInputField
          id="student.guardian.fatherOccupation"
          name="student.guardian.fatherOccupation"
          type="text"
          label="Father occupation"
          placeholder="Father occupation"
          required
        />
        {/* fatherContactNo */}
        <CustomInputField
          id="student.guardian.fatherContactNo"
          name="student.guardian.fatherContactNo"
          type="text"
          label="Father Contact No."
          placeholder="Father Contact No."
          required
        />
        {/* motherName */}
        <CustomInputField
          id="student.guardian.motherName"
          name="student.guardian.motherName"
          type="text"
          label="Mother name"
          placeholder="Mother name"
          required
        />
        {/* motherOccupation */}
        <CustomInputField
          id="student.guardian.motherOccupation"
          name="student.guardian.motherOccupation"
          type="text"
          label="Mother occupation"
          placeholder="Mother occupation"
          required
        />
        {/* motherContactNo */}
        <CustomInputField
          id="student.guardian.motherContactNo"
          name="student.guardian.motherContactNo"
          type="text"
          label="Mother contact no."
          placeholder="Mother contact no."
          required
        />
        {/* address */}
        <CustomTextareaField
          id="student.guardian.address"
          name="student.guardian.address"
          label="Address"
          placeholder="Address"
          required
          wrapperClassName={`col-span-3`}
        />
      </div>
    </>
  );
};

export default GuardianInfo;
