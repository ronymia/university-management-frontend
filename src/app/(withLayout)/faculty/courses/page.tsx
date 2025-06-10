"use client";

import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useFacultyCoursesQuery } from "@/redux/api/facultyApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";

export default function FacultyCoursePage() {
  const router = useRouter();
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useFacultyCoursesQuery({ ...queries });
  console.log({ data });

  const myCourses = data?.myCourses || [];
  const meta = data?.meta;

  const handleEdit = (updateData: any) => {
    console.log({ updateData });
    router.push(
      `/faculty/courses/student?courseId=${updateData?.course?.id}&offeredCourseSectionId=${updateData?.id}`
    );
  };

  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    {
      name: "View all students",
      handler: handleEdit,
      Icon: RiEdit2Fill,
      permissions: [],
      disableOn: [],
    },
  ]);

  // TABLE COLUMNS DEFINE
  const columns: IColumn[] = [
    // NAME
    {
      header: "Course name",
      accessorKey: "customCourse",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Code",
      accessorKey: "code",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Credits",
      accessorKey: "credits",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Sections",
      accessorKey: "customSection",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Created At",
      accessorKey: "createdAt",
      show: true,
      minWidth: 20,
    },
  ];

  return (
    <>
      {/* ACTION BAR */}
      <ActionBar
        title={`My Courses`}
        addButtonLabel={`Add Course`}
        // createHandler={handleAddNewCourse}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={myCourses || []}
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
