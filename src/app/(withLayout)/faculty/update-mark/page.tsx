"use client";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import ActionBar from "@/components/ui/ActionBar";
import { useUpdateMarksMutation } from "@/redux/api/studentEnrollCourseMarkApi";
import { useRouter } from "next/navigation";
import React, { use } from "react";

interface IUpdateMarkPageProps {
  searchParams: Promise<{
    examType: string;
    marks: string;
    academicSemesterId: string;
    studentId: string;
    courseId: string;
    offeredCourseSectionId: string;
  }>;
}

export default function UpdateMarkPage({ searchParams }: IUpdateMarkPageProps) {
  const {
    examType,
    marks,
    academicSemesterId,
    studentId,
    courseId,
    offeredCourseSectionId,
  } = use(searchParams);
  const router = useRouter();

  const [updateMarks] = useUpdateMarksMutation();
  const onSubmit = async (values: any) => {
    values.marks = parseInt(values.marks);
    const res = await updateMarks(values).unwrap();
    if (res) {
      //   message.success("Marks updated");
      router.back();
    }
  };

  const defaultValues = {
    examType,
    marks,
    academicSemesterId,
    studentId,
    courseId,
    offeredCourseSectionId,
  };
  return (
    <>
      <ActionBar title="Update mark"></ActionBar>
      <CustomForm
        submitHandler={onSubmit}
        cancelHandler={() => router.back()}
        // resolver={zodResolver(managementDepartmentSchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* title */}
        <CustomInputField
          id="marks"
          name="marks"
          type="text"
          label="marks"
          placeholder="marks"
          required
        />
      </CustomForm>
    </>
  );
}
