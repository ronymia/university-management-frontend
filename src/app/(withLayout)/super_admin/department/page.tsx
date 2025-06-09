"use client";

import FormModal from "@/components/Forms/FormModal";
import { usePopup } from "@/components/Popup/CustomPopup";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import {
  useDeleteDepartmentMutation,
  useDepartmentsQuery,
} from "@/redux/api/departmentApi";
import { useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function DepartmentPage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewDepartment } = usePopup();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const debouncedTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedTerm }));
  }
  const { data, isLoading } = useDepartmentsQuery({ ...queries });

  const departments: any[] = data?.departments || [];
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
      form: "department",
      title: "Update Department",
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
  ];

  return (
    <div className={``}>
      <FormModal
        popupOptions={popupOptions}
        setPopupOptions={setPopupOptions}
      />
      <div className={`flex items-center justify-between my-3`}>
        <h1 className={`font-medium text-2xl`}>Departments</h1>

        <div className={`flex gap-3`}>
          <button
            type="button"
            className={`flex gap-2 items-center justify-center rounded-full bg-primary px-3 py-2 text-base-300`}
          >
            <HiAdjustmentsHorizontal size={22} />
            Filter
          </button>
          <button
            type="button"
            onClick={() => handleAddNewDepartment()}
            className={`flex gap-2 items-center justify-center rounded-full bg-primary px-3 py-2 text-base-300 cursor-pointer`}
          >
            <MdAddCircle size={24} />
            Add Department
          </button>
        </div>
      </div>
      {/* TABLE */}
      <CustomTable
        dataAuto="awarding_body"
        columns={columns}
        rows={departments || []}
        isLoading={isLoading}
        actions={actions}
      />
    </div>
  );
}
