"use client";

import CustomButton from "@/components/Button/CustomButton";
import CustomLoading from "@/components/Loader/CustomLoading";
import {
  useMyRegistrationQuery,
  useStartRegistrationMutation,
} from "@/redux/api/semesterRegistrationApi";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function StudentRegistrationPage() {
  const { data, isLoading } = useMyRegistrationQuery({});
  const [startRegistration] = useStartRegistrationMutation();
  const router = useRouter();

  if (isLoading) return <CustomLoading />;

  const goToRegistrationHandler = async () => {
    if (!data?.studentSemesterRegistration) {
      try {
        await startRegistration({}).unwrap();
      } catch (error) {
        console.log({ error });
      }
    }
    router.push("/student/pre-registration");
  };
  return (
    <>
      <div style={{ margin: "10px 0px" }}>
        {data?.semesterRegistration &&
        data?.semesterRegistration?.status === "ONGOING" &&
        !data?.studentSemesterRegistration?.isConfirmed ? (
          <CustomButton onClick={goToRegistrationHandler}>
            Go to registration
          </CustomButton>
        ) : (
          <>
            <div>You are not allowed to do your registration. Stay tuned.</div>
          </>
        )}
      </div>

      {!data?.semesterRegistration ||
        (data?.studentSemesterRegistration?.isConfirmed && (
          <div>
            <>
              <span>Your registration has been completed successfully</span>
              <Link href="/student/courses" style={{ marginLeft: "10px" }}>
                View Your courses
              </Link>
            </>
          </div>
        ))}
    </>
  );
}
