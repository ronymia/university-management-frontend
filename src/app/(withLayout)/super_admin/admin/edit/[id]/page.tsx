"use client";

import { use } from "react";
import AdminForm from "../../AdminForm";

type IAdminUpdatePageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminUpdatePage({ params }: IAdminUpdatePageProps) {
  const { id } = use(params);
  return <AdminForm id={id} />;
}
