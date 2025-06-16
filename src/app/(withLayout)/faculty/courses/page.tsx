"use client";

import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { useDebounced } from "@/hooks/useDebounced";
import { useFacultyCoursesQuery } from "@/redux/api/facultyApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUsersViewfinder } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";

export default function FacultyCoursePage() {
  const router = useRouter();
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
  });

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useFacultyCoursesQuery({ ...queries });
  console.log({ data });

  const myCourses = data?.myCourses || [];
  const meta = data?.meta;

  const handleEdit = (updateData: any) => {
    console.log({ updateData });
    const courseId = updateData?.course?.id;
    const offeredCourseSectionId =
      updateData?.sections[0]?.classSchedules[0]?.offeredCourseSectionId;
    console.log({ offeredCourseSectionId });
    router.push(
      `/faculty/courses/student?courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`
    );
  };

  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    {
      name: "View all students",
      handler: handleEdit,
      Icon: FaUsersViewfinder,
      permissions: [],
      disableOn: [],
    },
  ]);

  // TABLE COLUMNS DEFINE
  const columns: IColumn[] = [
    // NAME
    {
      header: "Course name",
      accessorKey: "customCourse",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Code",
      accessorKey: "courseCode",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Credits",
      accessorKey: "courseCredits",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Sections",
      accessorKey: "customSection",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Created At",
      accessorKey: "createdAt",
      show: false,
      minWidth: 20,
    },
  ];

  return (
    <>
      {/* ACTION BAR */}
      <ActionBar
        title={`My Courses`}
        addButtonLabel={`Add Course`}
        // createHandler={handleAddNewCourse}
      />

      {/* TABLE */}
      <CustomTable
        columns={columns}
        isLoading={isLoading}
        actions={actions}
        paginationConfig={{
          page: queries.page,
          limit: queries.limit,
          total: meta?.total || 0,
          totalPage: meta?.totalPage || 0,
          showPagination: true,
          paginationHandler: (page) => setQueries({ ...queries, page }),
          changeLimitHandler: (limit) => setQueries({ ...queries, limit }),
        }}
        rows={
          myCourses?.map((row) => ({
            ...row,
            customCourse: `${row?.course?.title}`,
            courseCode: `${row?.course?.code}`,
            courseCredits: `${row?.course?.credits}`,
            customSection: (
              <>
                {row?.sections
                  ?.map((section) => section.section)
                  .map((el, index) => {
                    return (
                      <div key={index} style={{ margin: "20px 0px" }}>
                        <span>
                          Sec - {el?.title} ({el?.currentEnrolledStudent}/
                          {el?.maxCapacity})
                        </span>
                      </div>
                    );
                  })}
              </>
            ),
          })) || []
        }
      />
    </>
  );
}
