"use client";

import { use } from "react";
import OfferedCourseSectionForm from "../../OfferedCourseSectionForm";

type IDProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function UpdateOfferedCourseSectionPage({ params }: IDProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return <OfferedCourseSectionForm id={id} />;
}
