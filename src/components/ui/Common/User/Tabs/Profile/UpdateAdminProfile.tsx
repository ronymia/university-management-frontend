import CustomDatePicker from '@/components/Forms/CustomDatePicker';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomSelect from '@/components/Forms/CustomSelect';
import CustomTextareaField from '@/components/Forms/CustomTextareaField';
import BloodGroupField from '@/components/ui/Fields/BloodGroupField';
import useUserProfile from '@/hooks/useUserProfile';
import { useDepartmentsQuery } from '@/redux/api/departmentApi';

export default function UpdateAdminProfile({ handleClosePopup }: { handleClosePopup: () => void }) {
    // USER
    const { userInfo } = useUserProfile();
    const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });
    const departments = data?.departments;

    const departmentOptions =
        departments &&
        departments?.map((department) => {
            return {
                label: department?.title,
                value: department?.id,
            };
        });

    // DEFAULT VALUES
    const defaultValues = {
        name: {
            firstName: userInfo?.name?.firstName,
            middleName: userInfo?.name?.middleName,
            lastName: userInfo?.name?.lastName,
        },
        email: userInfo?.email,
        designation: userInfo?.designation,
        managementDepartment: userInfo?.managementDepartment,
        contactNo: userInfo?.contactNo,
        emergencyContactNo: userInfo?.emergencyContactNo,
        gender: userInfo?.gender,
        bloodGroup: userInfo?.bloodGroup,
        dateOfBirth: userInfo?.dateOfBirth,
        presentAddress: userInfo?.presentAddress,
        permanentAddress: userInfo?.permanentAddress,
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
            actionButtonClassName="w-full col-span-1 md:col-span-2"
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
            {/* managementDepartment */}
            <CustomSelect
                isLoading={isLoading}
                name={'managementDepartment'}
                id={'managementDepartment'}
                options={departmentOptions || []}
                label="Department"
                placeholder={`Select Department`}
                required
            />
            {/* designation */}
            <CustomInputField
                id="designation"
                name="designation"
                type="text"
                label="Designation"
                placeholder="Designation"
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
