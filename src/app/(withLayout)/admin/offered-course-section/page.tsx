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
  useDeleteOfferedCourseSectionMutation,
  useOfferedCourseSectionsQuery,
} from "@/redux/api/offeredCourseSectionApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export default function OfferedCourseSectionPage() {
  const router = useRouter();
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const { popupOptions, setPopupOptions, handleAddNewOfferedCourseSection } =
    usePopup();
  const [deleteOfferedCourseSection] = useDeleteOfferedCourseSectionMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useOfferedCourseSectionsQuery({ ...queries });

  const offeredCourseSections: any[] = data?.offeredCourseSections || [];
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      //   console.log(data);
      await deleteOfferedCourseSection(id);
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
      form: "offered_course_section",
      title: "Update Offered Course Section",
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
      header: "Offered courses",
      accessorKey: "customOfferedCourse",
      show: true,
      minWidth: 30,
    },
    // NAME
    {
      header: "Section",
      accessorKey: "title",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Max Capacity",
      accessorKey: "maxCapacity",
      show: true,
      minWidth: 15,
    },
    // NAME
    {
      header: "Currently Enrolled Student",
      accessorKey: "currentlyEnrolledStudent",
      show: true,
      minWidth: 25,
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
        title={`Manage Offered Course Sections`}
        addButtonLabel={`Add Offered Course Section`}
        createHandler={() =>
          router.push("/admin/offered-course-section/create")
        }
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          offeredCourseSections?.map((row: any) => ({
            ...row,
            customOfferedCourse: row?.offeredCourse?.title,
            customAcademicDepartment: row?.customAcademicDepartment?.title,
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
