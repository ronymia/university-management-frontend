import CustomButton from '@/components/Button/CustomButton';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomToaster from '@/components/Notification/CustomToaster';
import useUserProfile from '@/hooks/useUserProfile';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import React from 'react';

export default function ChangePassword() {
    const { profileId } = useUserProfile();
    // REDUX
    const [changePasswordFn, result] = useChangePasswordMutation();

    // HANDLE SUBMIT
    const handleOnSubmit = async (formValues: any) => {
        await changePasswordFn({ ...formValues, id: profileId })
            .unwrap()
            .then(() => {
                // handleClosePopup?.();
                CustomToaster({ type: 'success', text: 'Password Changed' });
            });
    };

    //
    return (
        <div className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 items-start`}>
            {/* <h1>Change Password</h1> */}
            <CustomForm
                submitHandler={handleOnSubmit}
                className={`grid grid-cols-1 gap-3`}
                showFormActionButton={false}
            >
                <CustomInputField
                    name="oldPassword"
                    type="password"
                    label="Old Password"
                    required
                    wrapperClassName="max-w-md"
                />
                <CustomInputField
                    name="newPassword"
                    type="password"
                    label="New Password"
                    required
                    wrapperClassName="max-w-md"
                />

                <CustomButton htmlType="submit" isLoading={result.isLoading} className="max-w-md">
                    Change Password
                </CustomButton>
            </CustomForm>
        </div>
    );
}
