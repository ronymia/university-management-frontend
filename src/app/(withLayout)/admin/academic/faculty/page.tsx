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
  useAcademicFacultiesQuery,
  useDeleteAcademicFacultyMutation,
} from "@/redux/api/academic/facultyApi";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function AcademicFacultyPage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewAcademicFaculty } =
    usePopup();
  const [deleteDepartment] = useDeleteAcademicFacultyMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useAcademicFacultiesQuery({ ...queries });

  const academicFaculties: any[] = data?.academicFaculties || [];
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteDepartment(id);
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
      form: "academic_faculty",
      title: "Update Academic Faculty",
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
      header: "Title",
      accessorKey: "title",
      show: true,
      minWidth: 30,
    },
    // NAME
    {
      header: "Created At",
      accessorKey: "customCreatedAt",
      show: true,
      minWidth: 30,
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
        title={`Manage Academic Faculty`}
        addButtonLabel={`Add Academic Faculty`}
        createHandler={handleAddNewAcademicFaculty}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          academicFaculties?.map((row) => ({
            ...row,
            customCreatedAt: dayjs(row.createdAt).format("MMM D, YYYY hh:mm A"),
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
