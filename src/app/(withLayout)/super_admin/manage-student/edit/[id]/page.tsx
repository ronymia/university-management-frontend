"use client";
import StudentForm from "@/app/(withLayout)/admin/manage-student/StudentForm";
import React, { use } from "react";

interface IUpdateStudentPageProps {
  params: Promise<{ id: string }>;
}

export default function SuperAdminUpdateStudentPage({
  params,
}: IUpdateStudentPageProps) {
  const { id } = use(params);
  return <StudentForm id={id} />;
}
