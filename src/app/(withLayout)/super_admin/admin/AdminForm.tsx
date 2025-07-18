import CustomForm from '@/components/Forms/CustomForm';
import CustomTextareaField from '@/components/Forms/CustomTextareaField';
import CustomInputField from '@/components/Forms/CustomInputField';
import {
    useAddAdminWithFormDataMutation,
    useAdminByIdQuery,
    useUpdateAdminMutation,
} from '@/redux/api/adminApi';
import { useDepartmentsQuery } from '@/redux/api/departmentApi';
import { createAdminSchema, updateAdminSchema } from '@/schemas/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomLoading from '@/components/Loader/CustomLoading';
import CustomDatePicker from '@/components/Forms/CustomDatePicker';
import CustomSelect from '@/components/Forms/CustomSelect';
import GenderField from '@/components/ui/Fields/GenderField';
import { useRouter } from 'next/navigation';
import CustomImageUpload from '@/components/Forms/CustomImageUpload';
import BloodGroupField from '@/components/ui/Fields/BloodGroupField';

export default function AdminForm({ id = '' }: { id?: string }) {
    const router = useRouter();
    const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });
    const { data: adminData, isLoading: adminLoading } = useAdminByIdQuery(id);
    const [addAdminWithFormData] = useAddAdminWithFormDataMutation();
    const [updateAdmin] = useUpdateAdminMutation();
    const departments = data?.departments;

    const departmentOptions =
        departments &&
        departments?.map((department) => {
            return {
                label: department?.title,
                value: department?.id,
            };
        });

    const defaultValues = {
        password: '',
        admin: {
            name: {
                firstName: adminData?.name?.firstName,
                middleName: adminData?.name?.middleName,
                lastName: adminData?.name?.lastName,
            },
            email: adminData?.email,
            designation: adminData?.designation,
            dateOfBirth: adminData?.dateOfBirth,
            contactNo: adminData?.contactNo,
            emergencyContactNo: adminData?.emergencyContactNo,
            bloodGroup: adminData?.bloodGroup,
            gender: adminData?.gender,
            managementDepartment: adminData?.managementDepartment?.id,
            presentAddress: adminData?.presentAddress,
            permanentAddress: adminData?.permanentAddress,
        },
    };

    const onSubmit = async (values: any) => {
        const obj = { ...values };
        const file = obj.admin['profileImage'];
        delete obj['file'];

        const data = JSON.stringify(obj);

        // CREATE MULTIPART DATA
        const formData = new FormData();
        formData.append('file', file as Blob);
        formData.append('data', data);

        console.log({ obj });
        if (!!id) {
            const body = values.admin;
            // delete body['profileImage'];
            const res = await updateAdmin({ id, body }).unwrap();
            if (res?.id) {
                router.back();
            }
        } else {
            const res = await addAdminWithFormData(formData).unwrap();
            if (res?.id) {
                router.back();
            }
        }
    };

    if (adminLoading) return <CustomLoading height={`h-[80vh]`} />;
    return (
        <CustomForm
            submitHandler={onSubmit}
            cancelHandler={() => router.back()}
            resolver={zodResolver(id ? updateAdminSchema : createAdminSchema)}
            defaultValues={defaultValues ? defaultValues : undefined}
        >
            {/* ADMIN INFORMATION */}
            <div className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5`}>
                <p className={`font-bold mb-2.5 drop-shadow-sm`}>Admin Information</p>
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-3`}>
                    {/* PROFILE PICTURE */}
                    {!id && (
                        <CustomImageUpload
                            id="admin.profileImage"
                            name="admin.profileImage"
                            label="Profile Picture"
                            wrapperClassName="row-span-1 md:row-span-2"
                        />
                    )}

                    {/* firstName */}
                    <CustomInputField
                        id="admin.name.firstName"
                        name="admin.name.firstName"
                        type="text"
                        label="First Name"
                        placeholder="First Name"
                        required
                    />
                    {/* middleName */}
                    <CustomInputField
                        id="admin.name.middleName"
                        name="admin.name.middleName"
                        type="text"
                        label="Middle Name"
                        placeholder="Middle Name"
                        required
                    />
                    {/* lastName */}
                    <CustomInputField
                        id="admin.name.lastName"
                        name="admin.name.lastName"
                        type="text"
                        label="Last Name"
                        placeholder="Last Name"
                        required
                    />
                    {/* password */}
                    {!id ? (
                        <CustomInputField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            required
                        />
                    ) : null}

                    {/* gender */}
                    <GenderField name="admin.gender" label="Gender" required />
                    {/* managementDepartment */}
                    <CustomSelect
                        isLoading={isLoading}
                        name={'admin.managementDepartment'}
                        id={'admin.managementDepartment'}
                        options={departmentOptions || []}
                        label="Department"
                        placeholder={`Select Department`}
                        required
                    />
                    {/* file */}

                    {/* <UploadImage name="file" /> */}
                </div>
            </div>

            {/* basic info */}
            <div
                className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-1 md:grid-cols-3 gap-3`}
            >
                <>
                    <p className={`font-bold mb-2.5 drop-shadow-sm col-span-1 md:col-span-3`}>
                        Basic Information
                    </p>
                    {/* email */}
                    <CustomInputField
                        id="admin.email"
                        name="admin.email"
                        type="email"
                        label="Email address"
                        placeholder="Email address"
                        required
                    />
                    {/* contactNo */}
                    <CustomInputField
                        id="admin.contactNo"
                        name="admin.contactNo"
                        type="text"
                        label="Contact No."
                        placeholder="Contact No."
                        required
                    />
                    {/* emergencyContactNo */}
                    <CustomInputField
                        id="admin.emergencyContactNo"
                        name="admin.emergencyContactNo"
                        type="text"
                        label="Emergency Contact No."
                        placeholder="Emergency Contact No."
                        required
                    />
                    {/* dateOfBirth */}
                    <CustomDatePicker
                        // id="admin.dateOfBirth"
                        name="admin.dateOfBirth"
                        label="Date of birth"
                        placeholder="Date of birth"
                        required
                    />
                    {/* bloodGroup */}
                    <BloodGroupField name="admin.bloodGroup" label="Blood group" required={false} />
                    {/* designation */}
                    <CustomInputField
                        id="admin.designation"
                        name="admin.designation"
                        type="text"
                        label="Designation"
                        placeholder="Designation"
                        required
                    />
                    {/* presentAddress */}
                    <CustomTextareaField
                        id="admin.presentAddress"
                        name="admin.presentAddress"
                        label="Present address"
                        placeholder="Present address"
                        required
                        wrapperClassName={`col-span-1 md:col-span-3`}
                        height={`h-24`}
                    />
                    {/* permanentAddress */}
                    <CustomTextareaField
                        id="admin.permanentAddress"
                        name="admin.permanentAddress"
                        label="Permanent address"
                        placeholder="Permanent address"
                        required
                        wrapperClassName={`col-span-1 md:col-span-3`}
                        height={`h-24`}
                    />
                </>
            </div>
        </CustomForm>
    );
}
