import CustomInputField from '../Forms/CustomInputField';
import CustomTextareaField from '../Forms/CustomTextareaField';

const LocalGuardianInfo = () => {
    return (
        <>
            <div
                className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-1 md:grid-cols-3 gap-3`}
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
                <CustomTextareaField
                    id="student.localGuardian.address"
                    name="student.localGuardian.address"
                    label="Address"
                    placeholder="Address"
                    required
                    wrapperClassName={`col-span-1 md:col-span-3`}
                />
            </div>
        </>
    );
};

export default LocalGuardianInfo;
