"use client";

import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useFacultyCourseStudentsQuery } from "@/redux/api/facultyApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";

export default function FacultyCoursesStudentsPage({
  searchParams,
}: Record<string, any>) {
  const router = useRouter();
  //   console.log(searchParams);
  const { courseId, offeredCourseSectionId } = searchParams;
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
    courseId: courseId ? courseId : "",
    offeredCourseSectionId: offeredCourseSectionId
      ? offeredCourseSectionId
      : "",
  });

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useFacultyCourseStudentsQuery({ ...queries });
  console.log({ data });

  const myCourseStudents = data?.myCourseStudents;
  const meta = data?.meta;

  const handleViewMarks = (updateData: any) => {
    console.log({ updateData });
    router.push(
      `/faculty/student-result?studentId=${updateData.id}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`
    );
  };

  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    {
      name: "View Marks",
      handler: handleViewMarks,
      Icon: RiEdit2Fill,
      permissions: [],
      disableOn: [],
    },
  ]);

  // TABLE COLUMNS DEFINE
  const columns: IColumn[] = [
    // NAME
    {
      header: "Student Name",
      accessorKey: "customStudentName",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Student ID",
      accessorKey: "studentId",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Email",
      accessorKey: "email",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Contact No.",
      accessorKey: "contactNo",
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
        title={`My Course Students`}
        addButtonLabel={`Add Course`}
        // createHandler={handleAddNewCourse}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={myCourseStudents || []}
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
