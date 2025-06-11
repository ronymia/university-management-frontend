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
  useDeleteSemesterRegistrationsMutation,
  useSemesterRegistrationsQuery,
  useStartNewSemesterMutation,
} from "@/redux/api/semesterRegistrationApi";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDelete, MdPlayCircleOutline } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function SemesterRegistrationPage() {
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewSemesterRegistration } =
    usePopup();
  const [deleteSemesterRegistrations] =
    useDeleteSemesterRegistrationsMutation();
  const [startNewSemester] = useStartNewSemesterMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useSemesterRegistrationsQuery({ ...queries });

  const semesterRegistrations = data?.semesterRegistrations || [];
  const meta = data?.meta;

  const handleStartSemester = async (startSemesterData: {
    [key: string]: any;
  }) => {
    try {
      const res = await startNewSemester(
        startSemesterData?.academicSemesterId
      ).unwrap();
      console.log(res);
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const deleteHandler = async (deleteData: any) => {
    try {
      //   console.log(data);
      await deleteSemesterRegistrations(deleteData?.id);
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
      form: "semester_registration",
      title: "Update Semester Registration",
    }));
  };

  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    {
      name: "Start Semester",
      handler: handleStartSemester,
      Icon: MdPlayCircleOutline,
      permissions: [],
      disableOn: [
        {
          accessorKey: "status",
          value: "UPCOMING",
        },
        {
          accessorKey: "status",
          value: "ONGOING",
        },
      ],
    },
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
      header: "Start Date",
      accessorKey: "customStartDate",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "End Date",
      accessorKey: "customEndDate",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Status",
      accessorKey: "status",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Academic Semester",
      accessorKey: "customAcademicSemester",
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
        title={`Manage Semester Registrations`}
        addButtonLabel={`Add Semester Registration`}
        createHandler={handleAddNewSemesterRegistration}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          semesterRegistrations?.map((row) => ({
            ...row,
            customStartDate: dayjs(row?.startDate).format("MMM D, YYYY"),
            customEndDate: dayjs(row?.endDate).format("MMM D, YYYY"),
            customAcademicSemester: row?.academicSemester?.title,
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
