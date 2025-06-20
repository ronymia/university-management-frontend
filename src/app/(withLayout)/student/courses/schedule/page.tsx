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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queries, setQueries] = useState({});
  const { data, isLoading } = useMyCourseSchedulesQuery({});
  const myCourseSchedules = data?.myCourseSchedules;
  const meta = data?.meta;

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
          page: meta?.page || 0,
          limit: meta?.limit || 0,
          skip: meta?.skip || 0,
          total: meta?.total || 0,
          paginationTotal: meta?.paginationTotal || 0,
          totalPages: meta?.totalPages || 0,
          showPagination: meta?.total ? meta?.total > meta?.limit : false,
          paginationHandler: (page: number) => {
            setQueries((prev) => ({ ...prev, page: page }));
          },
          changeLimitHandler: (limit: number) => {
            setQueries((prev) => ({ ...prev, limit: limit }));
          },
        }}
        // searchConfig={{
        //   searchTerm: queries.searchTerm,
        //   onSearch: (searchTerm) => setQueries({ ...queries, searchTerm }),
        // }}
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
