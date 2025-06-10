"use client";

import CustomButton from "@/components/Button/CustomButton";
import ActionBar from "@/components/ui/ActionBar";
import CustomTable, {
  IAction,
  IColumn,
} from "@/components/ui/Table/CustomTable";
import { ExamType } from "@/constants/global";
import { useDebounced } from "@/hooks/useDebounced";
import {
  useStudentEnrolledCourseMarksQuery,
  useUpdateFinalMarksMutation,
} from "@/redux/api/studentEnrollCourseMarkApi";
import { IStudentEnrolledCourseMark } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";

export default function StudentResultPage({
  searchParams,
}: Record<string, any>) {
  const router = useRouter();
  //   console.log(searchParams);
  const { studentId, courseId, offeredCourseSectionId } = searchParams;
  const [queries, setQueries] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
    studentId: studentId ? studentId : "",
    courseId: courseId ? courseId : "",
    offeredCourseSectionId: offeredCourseSectionId
      ? offeredCourseSectionId
      : "",
  });
  const [academicSemesterId, setAcademicSemesterId] = useState<string>();
  const [updateFinalMarks] = useUpdateFinalMarksMutation();

  const debouncedSearchTerm = useDebounced({
    searchQuery: queries.searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    setQueries((prev) => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }
  const { data, isLoading } = useStudentEnrolledCourseMarksQuery({
    ...queries,
  });
  console.log({ data });

  const studentEnrolledCourseMarks = data?.studentEnrolledCourseMarks;
  const meta = data?.meta;
  const handleUpdateFinalMarks = async (values: any) => {
    // console.log(values);
    try {
      const res = await updateFinalMarks(values);
      if (res) {
        // message.success("Final Marks Updated");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleUpdateMarks = (updateData: any) => {
    console.log({ updateData });
    router.push(
      `/faculty/update-mark?&examType=${data?.examType}&marks=${data?.marks}&academicSemesterId=${data?.academicSemesterId}&studentId=${studentId}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`
    );
  };
  // ALL ACTION BUTTONS
  const [actions] = useState<IAction[]>([
    {
      name: "Update marks",
      handler: handleUpdateMarks,
      Icon: RiEdit2Fill,
      permissions: [],
      disableOn: [],
    },
  ]);

  // TABLE COLUMNS DEFINE
  const columns: IColumn[] = [
    // NAME
    {
      header: "Student id",
      accessorKey: "customStudent",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Grade info",
      accessorKey: "customGradeInfo",
      show: true,
      minWidth: 20,
    },
    // NAME
    {
      header: "Exam Type",
      accessorKey: "examType",
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
      {/* ACTION BAR */}
      <ActionBar
        title={`My Course Students`}
        addButtonLabel={`Add Course`}
        // createHandler={handleAddNewCourse}
      >
        <div style={{ marginLeft: "auto" }}>
          {data?.studentEnrolledCourseMarks
            .filter(
              (el: IStudentEnrolledCourseMark) => el.examType === ExamType.FINAL
            )
            .map((el, index) => {
              if (el.marks > 0) {
                return (
                  <Fragment key={index}>
                    <CustomButton
                      htmlType="button"
                      onClick={() =>
                        handleUpdateFinalMarks({
                          studentId,
                          courseId,
                          academicSemesterId,
                        })
                      }
                    >
                      Update Final Marks
                    </CustomButton>
                  </Fragment>
                );
              }
            })}
        </div>
      </ActionBar>

      {/* TABLE */}
      <CustomTable
        columns={columns}
        rows={
          studentEnrolledCourseMarks?.map((row) => ({
            ...row,
            customStudent: (
              <>
                <table>
                  <p title="name">
                    {row?.firstName} {row?.middleName} {row?.lastName}
                  </p>
                  <p title="student ID">{row?.studentId}</p>
                </table>
              </>
            ),
            customGradeInfo: (
              <>
                <table>
                  <p title="name">{!marks?.grade ? "-" : marks?.grade}</p>
                  <p title="student ID">{row?.marks}</p>
                </table>
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
