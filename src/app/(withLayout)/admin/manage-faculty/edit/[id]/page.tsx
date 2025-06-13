"use client";

import FacultyForm from "@/components/ui/Common/FacultyForm";
import { use } from "react";

type IAdminFacultyEditPage = {
  params: Promise<{ id: string }>;
};

export default function AdminFacultyEditPage({
  params,
}: IAdminFacultyEditPage) {
  const { id } = use(params);
  return <FacultyForm id={id} />;
}
