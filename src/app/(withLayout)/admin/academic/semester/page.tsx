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
  useAcademicSemestersQuery,
  useDeleteAcademicSemesterMutation,
} from "@/redux/api/academic/semesterApi";
import { IAcademicCoreSemester } from "@/types";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function AcademicSemesterPage() {
  // DATABASE QUERY
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  // POPUP
  const { popupOptions, setPopupOptions, handleAddNewAcademicSemester } =
    usePopup();

  // DELETE
  const [deleteAcademicSemester, deleteResult] =
    useDeleteAcademicSemesterMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useAcademicSemestersQuery({ ...queries });

  const academicSemesters: any[] = data?.academicSemesters || [];
  const meta = data?.meta;
  const deleteHandler = async (id: IAcademicCoreSemester) => {
    try {
      //   console.log(data);
      await deleteAcademicSemester(id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleEdit = (updateData: IAcademicCoreSemester) => {
    // console.log({ updateData });
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      data: updateData,
      actionType: "update",
      form: "academic_semester",
      title: "Update Academic Semester",
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
      minWidth: 20,
    },
    // NAME
    {
      header: "Code",
      accessorKey: "code",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Start month",
      accessorKey: "startMonth",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "End month",
      accessorKey: "endMonth",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Year",
      accessorKey: "year",
      show: true,
      minWidth: 10,
    },
    // NAME
    {
      header: "Created at",
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
        title={`Manage Academic Semesters`}
        addButtonLabel={`Add Academic Semester`}
        createHandler={handleAddNewAcademicSemester}
      />

      {/* TABLE */}
      <CustomTable
        isLoading={isLoading || deleteResult.isLoading}
        columns={columns}
        actions={actions}
        paginationConfig={{
          page: queries.page,
          limit: queries.limit,
          total: meta?.total || 0,
          onPageChange: (page: number) => setQueries({ ...queries, page }),
          onLimitChange: (limit: number) => setQueries({ ...queries, limit }),
          onPageLimitChange: (page, limit) =>
            setQueries({ ...queries, page, limit }),
        }}
        // searchConfig={{
        //   searchTerm: queries.searchTerm,
        //   onSearch: (searchTerm) => setQueries({ ...queries, searchTerm }),
        // }}
        rows={academicSemesters || []}
      />
    </>
  );
}
