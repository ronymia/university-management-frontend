"use client";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import loginImage from "@/assets/login-image.png";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";

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
    try {
      const response = await userLogin({ ...data }).unwrap();

      if (response.accessToken) {
        router.push("/profile");

        // Store the access token in local storage
        storeUserInfo({ accessToken: response.accessToken });

        // Handle successful login
      }
    } catch (error: any) {
      console.log("Error during login:", error?.message);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                id="id"
                name="id"
                type="text"
                size="large"
                label="User Id"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                id="password"
                name="password"
                type="password"
                size="large"
                label="User Password"
                required
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loginResult.isLoading}
            >
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
