"use client";

import OfferedCourseSectionForm from "../OfferedCourseSectionForm";
import { useRouter } from "next/navigation";

export default function CreateOfferedCourseSectionPage() {
  const router = useRouter();
  return (
    <OfferedCourseSectionForm id={""} popupCloseHandler={() => router.back()} />
  );
}
