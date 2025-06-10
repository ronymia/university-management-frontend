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
  useAcademicDepartmentsQuery,
  useDeleteAcademicDepartmentMutation,
} from "@/redux/api/academic/departmentApi";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function AcademicDepartmentPage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewAcademicDepartment } =
    usePopup();
  const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useAcademicDepartmentsQuery({ ...queries });

  const academicDepartments: any[] = data?.academicDepartments || [];
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteAcademicDepartment(id);
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
      form: "academic_department",
      title: "Update Academic Department",
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
      header: "Academic Faculty",
      accessorKey: "customAcademicFaculty",
      show: true,
      minWidth: 30,
    },
    // NAME
    {
      header: "created At",
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
        title={`Manage Academic Departments`}
        addButtonLabel={`Add Academic Department`}
        createHandler={handleAddNewAcademicDepartment}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          academicDepartments.map((row) => ({
            ...row,
            customAcademicFaculty: row?.academicFaculty?.title,
            customCreatedAt: dayjs(row?.createdAt).format(
              "MMM D, YYYY hh:mm A"
            ),
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
