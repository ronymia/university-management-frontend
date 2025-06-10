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
import { useDeleteRoomMutation, useRoomsQuery } from "@/redux/api/roomApi";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function OfferedCoursePage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewOfferedCourse } =
    usePopup();
  const [deleteOfferedCourse] = useDeleteOfferedCourseMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useOfferedCoursesQuery({ ...queries });

  const offeredCourses: any[] = data?.offeredCourses || [];
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteOfferedCourse(id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleEdit = (updateData: any) => {
    console.log({ updateData });
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
      handler: handleEdit,
      Icon: RiEdit2Fill,
      permissions: [],
      disableOn: [],
    },
    {
      name: "delete",
      handler: deleteHandler,
      Icon: MdDelete,
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
      show: true,
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
        addButtonLabel={`Add Offered Course`}
        createHandler={handleAddNewOfferedCourse}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          offeredCourses?.map((row: any) => ({
            ...row,
            customCourse: row?.course?.title,
            customAcademicDepartment: row?.customAcademicDepartment?.title,
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
