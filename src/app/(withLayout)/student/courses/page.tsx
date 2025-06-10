"use client";

import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useMyCoursesQuery } from "@/redux/api/studentApi";
import { useState } from "react";

export default function StudentCoursePage() {
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
  const { data, isLoading } = useMyCoursesQuery({ ...queries });
  console.log({ data });
  const myCourses = data?.myCourses;
  const meta = data?.meta;

  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    // {
    //   name: "edit",
    //   handler: handleEdit,
    //   Icon: RiEdit2Fill,
    //   permissions: [],
    //   disableOn: [],
    // },
    // {
    //   name: "delete",
    //   handler: deleteHandler,
    //   Icon: MdDelete,
    //   permissions: [],
    //   disableOn: [],
    // },
  ]);

  // TABLE COLUMNS DEFINE
  const columns: IColumn[] = [
    // NAME
    {
      header: "Course name",
      accessorKey: "customCourseName",
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
      header: "Status",
      accessorKey: "status",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Grade",
      accessorKey: "customGrade",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Points",
      accessorKey: "point",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Total Marks",
      accessorKey: "totalMarks",
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
        // addButtonLabel={`Add Course`}
        // createHandler={handleAddNewCourse}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          myCourses?.map((row) => ({
            id: row?.id,
            customCourseName: row?.course?.title,
            customGrade: row?.grade ? row?.grade : "-",
            credits: row?.course?.credits,
            createdAt: row?.createdAt,
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
