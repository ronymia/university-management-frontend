'use client';
import Image from 'next/image';
import loginImage from '@/assets/login-image.png';
import { SubmitHandler } from 'react-hook-form';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { storeUserInfo } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import CustomForm from '../Forms/CustomForm';
import CustomInputField from '../Forms/CustomInputField';
import CustomButton from '../Button/CustomButton';
import { loginSchema } from '@/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the form values type
type FormValues = {
    id: string;
    password: string;
};

// Login page component
const LoginPage = () => {
    // Initialize the router
    const router = useRouter();
    const [userLogin, loginResult] = useUserLoginMutation();
    // Define the form submission handler
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        // console.log({ data });
        const response = await userLogin({ ...data }).unwrap();

        if (response.accessToken) {
            router.push('/profile');

            // Store the access token in local storage
            storeUserInfo({ accessToken: response.accessToken });

            // Handle successful login
        }
    };

    return (
        <div
            className={`h-screen flex flex-col md:flex-row items-center justify-start md:justify-center`}
        >
            {/* IMAGE */}
            <div>
                <Image src={loginImage} width={500} alt="login image" />
            </div>

            {/* LOGIN FORM */}
            <div className={`flex flex-col items-center justify-center`}>
                <h1 className={`text-2xl font-bold text-shadow-primary text-center mb-5`}>
                    First login your account
                </h1>
                <div>
                    <CustomForm
                        submitHandler={onSubmit}
                        resolver={zodResolver(loginSchema)}
                        className={`flex flex-col gap-1 w-xs sm:w-md`}
                        showFormActionButton={false}
                    >
                        <CustomInputField
                            id="id"
                            name="id"
                            type="text"
                            label="User Id"
                            placeholder="User Id"
                            required
                        />
                        <CustomInputField
                            id="password"
                            name="password"
                            type="password"
                            label="User Password"
                            placeholder="User Password"
                            required
                        />
                        <CustomButton
                            htmlType="submit"
                            disabled={loginResult.isLoading}
                            isLoading={loginResult.isLoading}
                            className={`mt-5`}
                        >
                            Login
                        </CustomButton>
                    </CustomForm>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
