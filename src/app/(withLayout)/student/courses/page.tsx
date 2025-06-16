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
    // customCourseName
    {
      header: "Course name",
      accessorKey: "customCourseName",
      show: true,
      minWidth: 20,
    },
    // courseCode
    {
      header: "Code",
      accessorKey: "courseCode",
      show: true,
      minWidth: 10,
    },
    // credits
    {
      header: "Credits",
      accessorKey: "credits",
      show: true,
      minWidth: 10,
    },
    // status
    {
      header: "Status",
      accessorKey: "status",
      show: true,
      minWidth: 10,
    },
    // customGrade
    {
      header: "Grade",
      accessorKey: "customGrade",
      show: true,
      minWidth: 10,
    },
    // point
    {
      header: "Points",
      accessorKey: "points",
      show: true,
      minWidth: 10,
    },
    // totalMarks
    {
      header: "Total Marks",
      accessorKey: "totalMarks",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Created At",
      accessorKey: "createdAt",
      show: false,
      minWidth: 30,
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
        isLoading={isLoading}
        actions={actions}
        columns={columns}
        paginationConfig={{
          showPagination: true,
          page: queries.page,
          limit: queries.limit,
          total: meta?.total || 0,
          totalPage: meta?.totalPage || 0,
          paginationHandler: (page: number) => setQueries({ ...queries, page }),
          changeLimitHandler: (limit: number) =>
            setQueries({ ...queries, limit }),
        }}
        rows={
          myCourses?.map((row) => ({
            ...row,
            customCourseName: row?.course?.title,
            customGrade: row?.grade ? row?.grade : "-",
            courseCode: row?.course?.code,
            credits: row?.course?.credits,
            createdAt: row?.createdAt,
          })) || []
        }
      />
    </>
  );
}
