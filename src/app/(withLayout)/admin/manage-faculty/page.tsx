import FacultyPage from "@/components/ui/Common/FacultyPage";
import { Metadata } from "next";
import React from "react";

export const metaData: Metadata = {
  title: "Manage Faculty",
  description: "Manage Faculty",
};

export default function AdminFacultyPage() {
  return <FacultyPage />;
}
