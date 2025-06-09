"use client";

import FormModal from "@/components/Forms/FormModal";
import { usePopup } from "@/components/Popup/CustomPopup";
import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useAdminsQuery, useDeleteAdminMutation } from "@/redux/api/adminApi";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function AdminPage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
    adminId: "",
  });
  const { popupOptions, setPopupOptions, handleAddNewAdmin } = usePopup();
  const [deleteAdmin] = useDeleteAdminMutation();
  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useAdminsQuery({ ...queries });
  const admins = data?.admins;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteAdmin(id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleEdit = (updateData: any) => {
    console.log({ updateData });
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
      accessorKey: "customManagementDepartment",
      show: true,
      minWidth: 20,
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
      <ActionBar
        title={`Manage Admins`}
        addButtonLabel={`Add Admin`}
        createHandler={handleAddNewAdmin}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          admins?.map((row) => ({
            ...row,
            fullName: `${row?.name?.firstName} ${row?.name?.middleName} ${row?.name?.lastName}`,
            customManagementDepartment: row?.managementDepartment?.title,
            customCreatedAt: row?.createdAt
              ? dayjs(row?.createdAt).format("MMM D, YYYY hh:mm A")
              : "",
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
