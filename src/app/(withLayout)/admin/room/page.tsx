"use client";

import FormModal from "@/components/Forms/FormModal";
import { usePopup } from "@/components/Popup/CustomPopup";
import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useDeleteRoomMutation, useRoomsQuery } from "@/redux/api/roomApi";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function RoomPage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewRoom } = usePopup();
  const [deleteRoom] = useDeleteRoomMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useRoomsQuery({ ...queries });

  const rooms: any[] = data?.rooms || [];
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteRoom(id);
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
      form: "room",
      title: "Update Room",
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
      accessorKey: "roomNumber",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Floor",
      accessorKey: "floor",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Building",
      accessorKey: "customBuilding",
      show: true,
      minWidth: 20,
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
        title={`Manage Rooms`}
        addButtonLabel={`Add Room`}
        createHandler={handleAddNewRoom}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          rooms?.map((room: any) => ({
            ...room,
            customBuilding: room?.building?.title,
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
