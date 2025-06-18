"use client";

import FormModal from "@/components/Forms/FormModal";
import { usePopup } from "@/components/Popup/CustomPopup";
import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import {
  useDeleteOfferedCourseMutation,
  useOfferedCoursesQuery,
} from "@/redux/api/offeredCourseApi";
import { IOfferedCourse } from "@/types";
import { useState } from "react";

export default function OfferedCoursePage() {
  // QUERIES
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });
  // POPUP
  const { popupOptions, setPopupOptions, handleAddNewOfferedCourse } =
    usePopup();
  // DELETION
  const [deleteOfferedCourse, deleteResult] = useDeleteOfferedCourseMutation();
  //   DEBOUNCE FOR SEARCH
  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useOfferedCoursesQuery({ ...queries });

  const offeredCourses = data?.offeredCourses || [];
  const meta = data?.meta;

  const deleteHandler = async (deleteData: IOfferedCourse) => {
    await deleteOfferedCourse(deleteData?.id);
  };

  const handleEdit = (updateData: IOfferedCourse) => {
    // console.log({ updateData });
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      data: updateData,
      actionType: "update",
      form: "offered_course",
      title: "Update Offered Course",
    }));
  };

  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    {
      name: "edit",
      type: "button",
      handler: handleEdit,
      permissions: [],
      disableOn: [],
    },
    {
      name: "delete",
      type: "button",
      handler: deleteHandler,
      permissions: [],
      disableOn: [],
    },
  ]);

  // TABLE COLUMNS DEFINE
  const columns: IColumn[] = [
    // NAME
    {
      header: "Course",
      accessorKey: "customCourse",
      show: true,
      minWidth: 30,
    },
    // NAME
    {
      header: "Academic department",
      accessorKey: "customAcademicDepartment",
      show: true,
      minWidth: 30,
    },
    // NAME
    {
      header: "Created At",
      accessorKey: "createdAt",
      show: false,
      minWidth: 20,
    },
  ];
  return (
    <>
      {/* FORM MODAL */}
      <FormModal
        popupOptions={popupOptions}
        setPopupOptions={setPopupOptions}
      />

      {/* ACTION BAR */}
      <ActionBar
        title={`Manage Offered Courses`}
        addButtonLabel={`Add New`}
        createHandler={handleAddNewOfferedCourse}
      />

      {/* TABLE */}
      <CustomTable
        isLoading={isLoading || deleteResult.isLoading}
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
          offeredCourses?.map((row) => ({
            ...row,
            customCourse: row?.course?.title,
            customAcademicDepartment: row?.academicDepartment?.title,
          })) || []
        }
      />
    </>
  );
}
