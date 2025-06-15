"use client";

import CustomAddButton from "@/components/Button/CustomAddButton";
import FormModal from "@/components/Forms/FormModal";
import { usePopup } from "@/components/Popup/CustomPopup";
import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import {
  useDeleteStudentMutation,
  useStudentsQuery,
} from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import type { IStudent } from "@/types";
import { getFullName } from "@/utils/getFullName";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function StudentPage() {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
    adminId: "",
  });
  const { popupOptions, setPopupOptions } = usePopup();
  const [deleteStudent] = useDeleteStudentMutation();
  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useStudentsQuery({ ...queries });

  const students = data?.students;
  const meta = data?.meta;
  // console.log(students);
  const deleteHandler = async (deleteData: IStudent) => {
    try {
      //   console.log(data);
      await deleteStudent(deleteData?.id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleEdit = (updateData: IStudent) => {
    console.log({ updateData });
    router.push(`manage-student/edit/${updateData.id}`);
    // setPopupOptions((prev) => ({
    //   ...prev,
    //   open: true,
    //   data: updateData,
    //   actionType: "update",
    //   form: "department",
    //   title: "Update Department",
    // }));
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
      header: "Student Id",
      accessorKey: "id",
      show: true,
      minWidth: 10,
    },
    // NAME
    {
      header: "Name",
      accessorKey: "fullName",
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
      header: "Semester",
      accessorKey: "customAcademicSemester",
      show: true,
      minWidth: 10,
    },
    // NAME
    {
      header: "Department",
      accessorKey: "customAcademicDepartment",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Contact no.",
      accessorKey: "contactNo",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Created at",
      accessorKey: "customCreatedAt",
      show: true,
      minWidth: 15,
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
        title={`Manage Students`}
        // addButtonLabel={`Add Student`}
        // createHandler={handleAddNewStudent}
        // createHandler={() => {
        //   router.push("/super_admin/manage-student/create");
        // }}
      >
        <Link href={`/${role}/manage-student/create`}>
          <CustomAddButton label={`Add Student`}></CustomAddButton>
        </Link>
      </ActionBar>

      {/* TABLE */}
      <CustomTable
        isLoading={isLoading}
        showPagination={true}
        actions={actions}
        columns={columns}
        limit={queries?.limit}
        totalData={meta?.total || 0}
        paginationHandler={(page: number) => {
          setQueries((prev) => ({ ...prev, page: page }));
        }}
        rows={
          students?.map((row) => ({
            ...row,
            fullName: row?.name ? getFullName(row?.name) : `N/A`,
            customAcademicDepartment: row?.academicDepartment?.title,
            customAcademicSemester: row?.academicSemester?.title,
            customCreatedAt: row?.createdAt
              ? dayjs(row?.createdAt).format("MMM D, YYYY hh:mm A")
              : "",
          })) || []
        }
      />
    </>
  );
}
