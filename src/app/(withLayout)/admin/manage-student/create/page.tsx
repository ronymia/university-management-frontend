"use client";

import React, { useEffect, useState } from "react";
import StudentForm from "../../../../../components/ui/Common/StudentForm";
import { studentStepSchemas } from "@/schemas/student";

export default function CreateStudentPage() {
  const [schema, setSchema] = useState(studentStepSchemas ?? []);
  console.log({ studentStepSchemas });
  console.log("first", { schema });

  useEffect(() => {
    console.log("second", { schema });
    setSchema(studentStepSchemas);
  }, []);
  return <StudentForm />;
}
