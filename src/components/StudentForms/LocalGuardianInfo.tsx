import CustomInputField from "../Forms/CustomInputField";

const LocalGuardianInfo = () => {
  return (
    <>
      <div
        className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-3 gap-3`}
      >
        {/* name */}
        <CustomInputField
          id="student.localGuardian.name"
          name="student.localGuardian.name"
          type="text"
          label="Local guardian name"
          placeholder="Local guardian name"
          required
        />
        {/* occupation */}
        <CustomInputField
          id="student.localGuardian.occupation"
          name="student.localGuardian.occupation"
          type="text"
          label="Local guardian occupation"
          placeholder="Local guardian occupation"
          required
        />
        {/* contactNo */}
        <CustomInputField
          id="student.localGuardian.contactNo"
          name="student.localGuardian.contactNo"
          type="text"
          label="Local guardian contact no."
          placeholder="Local guardian contact no."
          required
        />
        {/* address */}
        <CustomInputField
          id="student.localGuardian.address"
          name="student.localGuardian.address"
          type="text"
          label="Local guardian"
          placeholder="Local guardian"
          required
        />
      </div>
    </>
  );
};

export default LocalGuardianInfo;
