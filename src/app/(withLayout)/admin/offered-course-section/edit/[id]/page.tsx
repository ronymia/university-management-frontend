"use client";

import React, { use } from "react";
import OfferedCourseSectionForm from "../../OfferedCourseSectionForm";
import { useRouter } from "next/navigation";

type IDProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function UpdateOfferedCourseSectionPage({ params }: IDProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const router = useRouter();
  return (
    <OfferedCourseSectionForm id={id} popupCloseHandler={() => router.back()} />
  );
}
