import CustomDatePicker from '@/components/Forms/CustomDatePicker';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomTextareaField from '@/components/Forms/CustomTextareaField';
import CustomToaster from '@/components/Notification/CustomToaster';
import AcademicDepartmentField from '@/components/ui/Fields/Academic/AcademicDepartmentField';
import AcademicFacultyField from '@/components/ui/Fields/Academic/AcademicFacultyField';
import BloodGroupField from '@/components/ui/Fields/BloodGroupField';
import FacultyDesignationField from '@/components/ui/Fields/FacultyDesignationField';
import { USER_ROLE } from '@/enums/global';
import useUserProfile from '@/hooks/useUserProfile';
import { useUpdateUserMutation } from '@/redux/api/userApi';
import { getUserInfo } from '@/services/auth.service';
import { useEffect, useState } from 'react';

export default function UpdateFacultyProfile({
    handleClosePopup,
}: {
    handleClosePopup: () => void;
}) {
    const { role } = (getUserInfo() as any) || { role: '' };
    // USER
    const { facultyInfo } = useUserProfile();
    // STATE
    const [academicFacultyId, setAcademicFacultyId] = useState<string>('');
    // UPDATE API
    const [updateFaculty] = useUpdateUserMutation();

    // SET FACULTY ID
    useEffect(() => {
        if (facultyInfo?.academicFaculty?.syncId) {
            setAcademicFacultyId(facultyInfo?.academicFaculty?.syncId);
        }
    }, [facultyInfo?.academicFaculty?.syncId]);

    // DEFAULT VALUES
    const defaultValues = {
        name: {
            firstName: facultyInfo?.name?.firstName,
            middleName: facultyInfo?.name?.middleName,
            lastName: facultyInfo?.name?.lastName,
        },
        email: facultyInfo?.email,
        designation: facultyInfo?.designation,
        academicDepartment: facultyInfo?.academicDepartment?.syncId,
        academicFaculty: facultyInfo?.academicFaculty?.syncId,
        contactNo: facultyInfo?.contactNo,
        emergencyContactNo: facultyInfo?.emergencyContactNo,
        gender: facultyInfo?.gender,
        bloodGroup: facultyInfo?.bloodGroup,
        dateOfBirth: facultyInfo?.dateOfBirth,
        presentAddress: facultyInfo?.presentAddress,
        permanentAddress: facultyInfo?.permanentAddress,
    };

    // console.log({ defaultValues });

    // HANDLE SUBMIT
    const handleOnSubmit = async (formValues: any) => {
        console.log({ formValues });
        await updateFaculty({ ...formValues, id: facultyInfo?.id })
            .unwrap()
            .then((res) => {
                console.log('res', { res });
                // SUCCESS MESSAGE
                CustomToaster({ type: 'success', text: 'Profile Updated' });
                // CLOSE POPUP
                handleClosePopup?.();
            });
    };
    return (
        <CustomForm
            cancelHandler={handleClosePopup}
            submitHandler={handleOnSubmit}
            defaultValues={defaultValues}
            className={`grid grid-cols-1 md:grid-cols-2 gap-3`}
            actionButtonClassName={`col-span-1 md:col-span-2`}
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
            {role === USER_ROLE.ADMIN ||
                (role === USER_ROLE.SUPER_ADMIN && (
                    <>
                        {/* academicDepartment */}
                        <AcademicFacultyField
                            name={'academicFaculty'}
                            label="Academic Faculty"
                            onChange={(e) => setAcademicFacultyId(e)}
                        />
                        {/* academicDepartment */}
                        <AcademicDepartmentField
                            name={'academicDepartment'}
                            label="Academic Department"
                            academicFacultyId={academicFacultyId || ''}
                        />
                        {/* designation */}
                        <FacultyDesignationField name="designation" label="Designation" required />
                    </>
                ))}
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
