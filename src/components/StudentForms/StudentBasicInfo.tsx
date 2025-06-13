import CustomTextareaField from "../Forms/CustomTextareaField";
import CustomInputField from "../Forms/CustomInputField";
import CustomDatePicker from "../Forms/CustomDatePicker";
import BloodGroupField from "../ui/Fields/BloodGroupField";

const StudentBasicInfo = () => {
  return (
    <div
      className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-3 gap-3`}
    >
      {/* email */}
      <CustomInputField
        id="student.email"
        name="student.email"
        type="email"
        label="Email address"
        placeholder="Email address"
        required
      />
      {/* contactNo */}
      <CustomInputField
        id="student.contactNo"
        name="student.contactNo"
        type="text"
        label="Contact No."
        placeholder="Contact No."
        required
        maxLength={11}
      />
      {/* emergencyContactNo */}
      <CustomInputField
        id="student.emergencyContactNo"
        name="student.emergencyContactNo"
        type="text"
        label="Emergency Contact No."
        placeholder="Emergency Contact No."
        required
        maxLength={11}
      />
      {/* dateOfBirth */}
      <CustomDatePicker
        name="student.dateOfBirth"
        label="Date of birth"
        required
      />
      {/* bloodGroup */}
      <BloodGroupField
        name="student.bloodGroup"
        label="Blood group"
        required={false}
      />
      {/* designation */}
      {/* <CustomInputField
        id="student.designation"
        name="student.designation"
        type="text"
        label="Designation"
        placeholder="Designation"
        required
      /> */}
      {/* presentAddress */}
      <CustomTextareaField
        id="student.presentAddress"
        name="student.presentAddress"
        label="Present address"
        placeholder="Present address"
        required
        wrapperClassName={`col-span-3`}
        height={`h-24`}
      />
      {/* permanentAddress */}
      <CustomTextareaField
        id="student.permanentAddress"
        name="student.permanentAddress"
        label="Permanent address"
        placeholder="Permanent address"
        required
        wrapperClassName={`col-span-3`}
        height={`h-24`}
      />
    </div>
  );
};

export default StudentBasicInfo;
