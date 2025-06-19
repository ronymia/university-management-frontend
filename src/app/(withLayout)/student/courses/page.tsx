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
  // QUERIES
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });
  // DEBOUNCE FOR SEARCH
  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  // DATABASE QUERY
  const { data, isLoading } = useMyCoursesQuery({ ...queries });
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
          page: meta?.page || 0,
          limit: meta?.limit || 0,
          skip: meta?.skip || 0,
          total: meta?.total || 0,
          paginationTotal: meta?.paginationTotal || 0,
          totalPages: meta?.totalPages || 0,
          showPagination: meta?.total ? meta?.total > meta?.limit : false,
          paginationHandler: (page: number) => {
            setQueries((prev) => ({ ...prev, page: page }));
          },
          changeLimitHandler: (limit: number) => {
            setQueries((prev) => ({ ...prev, limit: limit }));
          },
        }}
        // searchConfig={{
        //   searchTerm: queries.searchTerm,
        //   onSearch: (searchTerm) => setQueries({ ...queries, searchTerm }),
        // }}
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
