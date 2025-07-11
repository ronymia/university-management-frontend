import CustomDatePicker from '@/components/Forms/CustomDatePicker';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomSelect from '@/components/Forms/CustomSelect';
import CustomTextareaField from '@/components/Forms/CustomTextareaField';
import BloodGroupField from '@/components/ui/Fields/BloodGroupField';
import { USER_ROLE } from '@/enums/global';
import useUserProfile from '@/hooks/useUserProfile';
import { useDepartmentsQuery } from '@/redux/api/departmentApi';
import { useUpdateUserMutation } from '@/redux/api/userApi';
import { getUserInfo } from '@/services/auth.service';

export default function UpdateAdminProfile({ handleClosePopup }: { handleClosePopup: () => void }) {
    const { role } = (getUserInfo() as any) || { role: '' };
    // ADMIN UPDATE
    const [updateUser] = useUpdateUserMutation();

    // USER
    const { adminInfo } = useUserProfile();
    const { data, isLoading } = useDepartmentsQuery(
        { limit: 100, page: 1 },
        { skip: role !== USER_ROLE.SUPER_ADMIN },
    );
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
            firstName: adminInfo?.name?.firstName,
            middleName: adminInfo?.name?.middleName,
            lastName: adminInfo?.name?.lastName,
        },
        email: adminInfo?.email,
        designation: adminInfo?.designation,
        managementDepartment: adminInfo?.managementDepartment?.id,
        contactNo: adminInfo?.contactNo,
        emergencyContactNo: adminInfo?.emergencyContactNo,
        gender: adminInfo?.gender,
        bloodGroup: adminInfo?.bloodGroup,
        dateOfBirth: adminInfo?.dateOfBirth,
        presentAddress: adminInfo?.presentAddress,
        permanentAddress: adminInfo?.permanentAddress,
    };

    // HANDLE SUBMIT
    const handleOnSubmit = async (formValues: any) => {
        // console.log({ formValues });

        await updateUser({ ...formValues, id: adminInfo?.id })
            .unwrap()
            .then(() => {
                handleClosePopup?.();
            });
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
            {role === USER_ROLE.SUPER_ADMIN && (
                <>
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
                </>
            )}
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
