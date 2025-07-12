import CustomDatePicker from '@/components/Forms/CustomDatePicker';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomTextareaField from '@/components/Forms/CustomTextareaField';
import BloodGroupField from '@/components/ui/Fields/BloodGroupField';
import useUserProfile from '@/hooks/useUserProfile';

export default function UpdateFacultyProfile({
    handleClosePopup,
}: {
    handleClosePopup: () => void;
}) {
    // USER
    const { facultyInfo } = useUserProfile();

    // DEFAULT VALUES
    const defaultValues = {
        name: {
            firstName: facultyInfo?.name?.firstName,
            middleName: facultyInfo?.name?.middleName,
            lastName: facultyInfo?.name?.lastName,
        },
        email: facultyInfo?.email,
        contactNo: facultyInfo?.contactNo,
        emergencyContactNo: facultyInfo?.emergencyContactNo,
        gender: facultyInfo?.gender,
        bloodGroup: facultyInfo?.bloodGroup,
        dateOfBirth: facultyInfo?.dateOfBirth,
        presentAddress: facultyInfo?.presentAddress,
        permanentAddress: facultyInfo?.permanentAddress,
    };

    // HANDLE SUBMIT
    const handleOnSubmit = async (formValues: any) => {
        console.log({ formValues });
    };
    return (
        <CustomForm
            cancelHandler={handleClosePopup}
            submitHandler={handleOnSubmit}
            defaultValues={defaultValues}
            className={`grid grid-cols-1 md:grid-cols-2 gap-3`}
        >
            {/* firstName */}
            <CustomInputField
                id="name.firstName"
                name="name.firstName"
                type="text"
                label="First Name"
                placeholder="First Name"
                required
            />
            {/* middleName */}
            <CustomInputField
                id="name.middleName"
                name="name.middleName"
                type="text"
                label="Middle Name"
                placeholder="Middle Name"
                required={false}
            />
            {/* lastName */}
            <CustomInputField
                id="name.lastName"
                name="name.lastName"
                type="text"
                label="Last Name"
                placeholder="Last Name"
                required
            />
            {/* email */}
            <CustomInputField
                id="email"
                name="email"
                type="email"
                label="Email address"
                placeholder="Email address"
                required
            />
            {/* contactNo */}
            <CustomInputField
                id="contactNo"
                name="contactNo"
                type="text"
                label="Contact No."
                placeholder="Contact No."
                required
                maxLength={11}
            />
            {/* emergencyContactNo */}
            <CustomInputField
                id="emergencyContactNo"
                name="emergencyContactNo"
                type="text"
                label="Emergency Contact No."
                placeholder="Emergency Contact No."
                required
                maxLength={11}
            />
            {/* dateOfBirth */}
            <CustomDatePicker name="dateOfBirth" label="Date of birth" required />
            {/* bloodGroup */}
            <BloodGroupField name="bloodGroup" label="Blood group" required={false} />
            {/* presentAddress */}
            <CustomTextareaField
                id="presentAddress"
                name="presentAddress"
                label="Present address"
                placeholder="Present address"
                required
                wrapperClassName={`col-span-1 md:col-span-2`}
                height={`h-24`}
            />
            {/* permanentAddress */}
            <CustomTextareaField
                id="permanentAddress"
                name="permanentAddress"
                label="Permanent address"
                placeholder="Permanent address"
                required
                wrapperClassName={`col-span-1 md:col-span-2`}
                height={`h-24`}
            />
        </CustomForm>
    );
}
