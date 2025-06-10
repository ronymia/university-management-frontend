"use client";

import ActionBar from "@/components/ui/ActionBar";
import ClassSchedule from "@/components/ui/ClassSchedule";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useMyCourseSchedulesQuery } from "@/redux/api/studentApi";
import { IOfferedCourseSchedule } from "@/types";
import React, { useState } from "react";

export default function MyCourseSchedulePage() {
  const { data, isLoading } = useMyCourseSchedulesQuery({});
  const myCourseSchedules = data?.myCourseSchedules;

  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    // {
    //   name: "edit",
    //   handler: handleEdit,
    //   Icon: RiEdit2Fill,
    //   permissions: [],
    //   disableOn: [],
    // },
    // {
    //   name: "delete",
    //   handler: deleteHandler,
    //   Icon: MdDelete,
    //   permissions: [],
    //   disableOn: [],
    // },
  ]);

  // TABLE COLUMNS DEFINE
  const columns: IColumn[] = [
    // NAME
    {
      header: "Course name",
      accessorKey: "customCourseName",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Credits",
      accessorKey: "customCredits",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Section",
      accessorKey: "customSection",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Class Schedules",
      accessorKey: "customClassSchedule",
      show: true,
      minWidth: 20,
    },
  ];
  return (
    <>
      {/* ACTION BAR */}
      <ActionBar
        title={`My Course Schedule`}
        // addButtonLabel={`Add Course`}
        // createHandler={handleAddNewCourse}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          myCourseSchedules?.map((row) => ({
            id: row?.id,
            customCourseName: row?.course?.title,
            customGrade: row?.grade ? row?.grade : "-",
            customCredits: row?.course?.credits,
            customSection: row?.title,
            createdAt: row?.createdAt,
            customClassSchedule: (
              <>
                <ClassSchedule
                  data={
                    row?.offeredCourseClassSchedules as IOfferedCourseSchedule[]
                  }
                />
              </>
            ),
          })) || []
        }
        isLoading={isLoading}
        actions={actions}
      />
    </>
  );
}
