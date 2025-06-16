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
      minWidth: 30,
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
      minWidth: 50,
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
        rowHeight={`h-52`}
        columns={columns}
        isLoading={isLoading}
        actions={actions}
        paginationConfig={{
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 0,
          showPagination: true,
          paginationHandler: () => {},
          changeLimitHandler: () => {},
        }}
        rows={
          myCourseSchedules?.map((row) => ({
            customCourseName: row?.offeredCourse?.course?.title,
            customCredits: row?.offeredCourse?.course?.credits,
            customSection: row?.offeredCourseSection?.title,
            customClassSchedule: (
              <>
                <ClassSchedule
                  data={
                    row?.offeredCourseSection
                      ?.offeredCourseClassSchedules as IOfferedCourseSchedule[]
                  }
                />
              </>
            ),
          })) || []
        }
      />
    </>
  );
}
