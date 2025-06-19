"use client";

import CustomLoading from "@/components/Loader/CustomLoading";
import StepperForm from "@/components/StepperForm/StepperForm";
import GuardianInfo from "@/components/StudentForms/GuardianInfo";
import LocalGuardianInfo from "@/components/StudentForms/LocalGuardianInfo";
import StudentBasicInfo from "@/components/StudentForms/StudentBasicInfo";
import StudentInfo from "@/components/StudentForms/StudentInfo";
import {
  useAddStudentWithFormDataMutation,
  useStudentQuery,
  useUpdateStudentMutation,
} from "@/redux/api/studentApi";
import { studentMasterSchema, studentStepSchemas } from "@/schemas/student";
import { useRouter } from "next/navigation";

export default function StudentForm({ id = "" }: { id?: string }) {
  const router = useRouter();
  const [addStudentWithFormData] = useAddStudentWithFormDataMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const { data, isLoading, isFetching } = useStudentQuery(id, { skip: !id });
  const steps = [
    {
      title: "Student Information",
      content: (
        <StudentInfo
          studentId={id}
          academicFacultyId={data?.academicFaculty?.syncId}
        />
      ),
    },
    {
      title: "Basic Information",
      content: <StudentBasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <GuardianInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianInfo />,
    },
  ];

  const handleStudentSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    if (!!id) {
      const body = values.student;
      // delete body["profileImage"];
      const res = await updateStudent({ id, body }).unwrap();
      if (res?.id) {
        router.back();
      }
    } else {
      const res = await addStudentWithFormData(formData).unwrap();
      if (res?.id) {
        router.back();
      }
    }
  };

  const defaultValues = {
    password: "", // optional
    student: {
      name: {
        firstName: data?.name?.firstName ?? "",
        middleName: data?.name?.middleName ?? "",
        lastName: data?.name?.lastName ?? "",
      },
      gender: data?.gender ?? "",
      academicSemester: data?.academicSemester?.syncId ?? "",
      academicFaculty: data?.academicFaculty?.syncId ?? "",
      academicDepartment: data?.academicDepartment?.syncId ?? "",

      // Optional fallback to avoid form crash on missing nested structure:
      email: data?.email ?? "",
      contactNo: data?.contactNo ?? "",
      emergencyContactNo: data?.emergencyContactNo ?? "",
      dateOfBirth: data?.dateOfBirth ?? "",
      bloodGroup: data?.bloodGroup ?? "",

      presentAddress: data?.presentAddress ?? "",
      permanentAddress: data?.permanentAddress ?? "",

      guardian: {
        fatherName: data?.guardian?.fatherName ?? "",
        fatherOccupation: data?.guardian?.fatherOccupation ?? "",
        fatherContactNo: data?.guardian?.fatherContactNo ?? "",
        motherName: data?.guardian?.motherName ?? "",
        motherOccupation: data?.guardian?.motherOccupation ?? "",
        motherContactNo: data?.guardian?.motherContactNo ?? "",
        address: data?.guardian?.address ?? "",
      },

      localGuardian: {
        name: data?.localGuardian?.name ?? "",
        occupation: data?.localGuardian?.occupation ?? "",
        contactNo: data?.localGuardian?.contactNo ?? "",
        address: data?.localGuardian?.address ?? "",
      },

      profileImage: data?.profileImage ?? "",
    },
  };

  console.log({ defaultValues });
  if (isLoading || isFetching) return <CustomLoading />;
  return (
    <>
      <StepperForm
        defaultValues={defaultValues ? defaultValues : undefined}
        stepSchema={studentStepSchemas}
        masterSchema={studentMasterSchema}
        persistKey="student-create-form"
        submitHandler={(value) => {
          handleStudentSubmit(value);
        }}
        steps={steps}
      />
    </>
  );
}
