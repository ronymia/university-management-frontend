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
  useDeleteFacultyMutation,
  useFacultiesQuery,
} from "@/redux/api/facultyApi";
import { getUserInfo } from "@/services/auth.service";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function FacultyPage() {
  const router = useRouter();
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });
  const { role } = getUserInfo() as any;
  const { popupOptions, setPopupOptions } = usePopup();
  const [deleteFaculty] = useDeleteFacultyMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useFacultiesQuery({ ...queries });

  const faculties = data?.faculties;
  const meta = data?.meta;
  // console.log(faculties);
  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteFaculty(id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleEdit = (updateData: any) => {
    console.log({ updateData });
    router.push(`manage-faculty/edit/${updateData.id}`);
    // setPopupOptions((prev) => ({
    //   ...prev,
    //   open: true,
    //   data: updateData,
    //   actionType: "update",
    //   form: "faculty",
    //   title: "Update Faculty",
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
      header: "Id",
      accessorKey: "id",
      show: true,
      minWidth: 10,
    },
    // NAME
    {
      header: "Name",
      accessorKey: "fullName",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Email",
      accessorKey: "email",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Department",
      accessorKey: "customAcademicDepartment",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Faculty",
      accessorKey: "customAcademicFaculty",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Designation",
      accessorKey: "designation",
      show: true,
      minWidth: 10,
    },
    // NAME
    {
      header: "Contact no.",
      accessorKey: "contactNo",
      show: true,
      minWidth: 10,
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
      <ActionBar title={`Manage Faculties`}>
        <Link href={`/${role}/manage-faculty/create`}>
          <CustomAddButton label={`Add Faculty`} />
        </Link>
      </ActionBar>

      {/* TABLE */}
      <CustomTable
        isLoading={isLoading}
        actions={actions}
        showPagination
        columns={columns}
        limit={queries.limit}
        totalData={meta?.total || 0}
        paginationHandler={(page: number) => setQueries({ ...queries, page })}
        rows={
          faculties?.map((row) => ({
            ...row,
            fullName: `${row?.name?.firstName} ${row?.name?.middleName} ${row?.name?.lastName}`,
            customAcademicDepartment: row?.academicDepartment?.title,
            customAcademicFaculty: row?.academicFaculty?.title,
            customCreatedAt: row?.createdAt
              ? dayjs(row?.createdAt).format("MMM D, YYYY hh:mm A")
              : "",
          })) || []
        }
      />
    </>
  );
}
