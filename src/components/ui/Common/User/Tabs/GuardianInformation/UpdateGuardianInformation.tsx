import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomTextareaField from '@/components/Forms/CustomTextareaField';
import useUserProfile from '@/hooks/useUserProfile';
import React from 'react';

export default function UpdateGuardianInformation({
    handleClosePopup,
}: {
    handleClosePopup: () => void;
}) {
    const { studentInfo: userInfo } = useUserProfile();

    const defaultValues = {
        student: {
            guardian: {
                fatherName: userInfo?.guardian?.fatherName || '',
                fatherOccupation: userInfo?.guardian?.fatherOccupation || '',
                fatherContactNo: userInfo?.guardian?.fatherContactNo || '',
                motherName: userInfo?.guardian?.motherName || '',
                motherOccupation: userInfo?.guardian?.motherOccupation || '',
                motherContactNo: userInfo?.guardian?.motherContactNo || '',
                address: userInfo?.guardian?.address || '',
            },
            localGuardian: {
                name: userInfo?.localGuardian?.name || '',
                occupation: userInfo?.localGuardian?.occupation || '',
                contactNo: userInfo?.localGuardian?.contactNo || '',
                address: userInfo?.localGuardian?.address || '',
            },
        },
    };

    const handleOnSubmit = async (formValues: any) => {
        console.log({ formValues });
    };

    return (
        <CustomForm
            cancelHandler={handleClosePopup}
            submitHandler={handleOnSubmit}
            defaultValues={defaultValues}
        >
            <>
                <div
                    className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-1 lg:grid-cols-2 gap-3`}
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
                        wrapperClassName={`col-span-1 lg:col-span-2`}
                    />
                </div>
            </>
            <>
                <div
                    className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-1 lg:grid-cols-2 gap-3`}
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
                        wrapperClassName={`col-span-1 lg:col-span-2`}
                    />
                </div>
            </>
        </CustomForm>
    );
}
