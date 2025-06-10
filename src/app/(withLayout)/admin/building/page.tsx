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
  useBuildingsQuery,
  useDeleteBuildingMutation,
} from "@/redux/api/buildingApi";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function BuildingPage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewBuilding } = usePopup();
  const [deleteBuilding] = useDeleteBuildingMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useBuildingsQuery({ ...queries });

  const buildings: any[] = data?.buildings || [];
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteBuilding(id);
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
      form: "building",
      title: "Update Building",
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
    <>
      {/* FORM MODAL */}
      <FormModal
        popupOptions={popupOptions}
        setPopupOptions={setPopupOptions}
      />

      {/* ACTION BAR */}
      <ActionBar
        title={`Manage Buildings`}
        addButtonLabel={`Add Building`}
        createHandler={handleAddNewBuilding}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={buildings || []}
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
