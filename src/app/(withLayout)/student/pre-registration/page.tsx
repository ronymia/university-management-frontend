"use client";

import CustomButton from "@/components/Button/CustomButton";
import CustomLoading from "@/components/Loader/CustomLoading";
import ActionBar from "@/components/ui/ActionBar";
import {
  useConfirmMyRegistrationMutation,
  useEnrollIntoCourseMutation,
  useMySemesterRegistrationCoursesQuery,
  useWithdrawFromCourseMutation,
} from "@/redux/api/semesterRegistrationApi";
import React from "react";

export default function ViewPreregistrationPage() {
  const { data, isLoading } = useMySemesterRegistrationCoursesQuery({});
  const [enrollIntoCourse] = useEnrollIntoCourseMutation();
  const [withdrawFromCourse] = useWithdrawFromCourseMutation();
  const [confirmMyRegistration] = useConfirmMyRegistrationMutation();
  //   console.log(data, "offeredCourseSections");

  const handleEnroll = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: any) => {
    try {
      await enrollIntoCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const handleWithdraw = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: any) => {
    try {
      await withdrawFromCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  const handleConfirmRegistration = async () => {
    try {
      const res = await confirmMyRegistration({}).unwrap();
      if (res) {
        // message.success("Successfully registered");
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  console.log({ data });

  const availableCourses: any[] = data?.map(
    (availableCourse: any, index: number) => {
      const obj = {
        key: index,
        label: availableCourse?.course?.title,
        isTaken: availableCourse.isTaken,
        children: (
          <table style={{ padding: "0px 10px", borderSpacing: "10px 15px" }}>
            {availableCourse?.offeredCourseSections?.map(
              (section: any, index: number) => (
                <tr key={index}>
                  <td style={{ width: "30%" }}>
                    <strong>Sec - {section?.title}</strong>
                  </td>
                  <td style={{ width: "30%" }}>
                    Enrolled - ({section?.currentEnrolledStudent}/
                    {section?.maxCapacity})
                  </td>
                  <td style={{ width: "30%" }}>
                    <table
                      style={{
                        border: "1px solid #d9d9d9",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              textAlign: "center",
                              borderBottom: "1px solid black",
                              textTransform: "capitalize",
                            }}
                            colSpan={3}
                          >
                            class schedule
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section?.offeredCourseClassSchedules?.map(
                          (el: any, index: number) => (
                            <tr key={index}>
                              <td
                                style={{
                                  fontWeight: 700,
                                  marginRight: "10px",
                                  textTransform: "capitalize",
                                  textAlign: "right",
                                }}
                              >
                                {el?.dayOfWeek}
                              </td>
                              <td
                                style={{
                                  textAlign: "left",
                                  padding: "0px 15px",
                                }}
                              >
                                {el?.startTime} - {el?.endTime}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </td>
                  <td style={{ width: "30%" }}>
                    {availableCourse?.isTaken && section?.isTaken ? (
                      <CustomButton
                        onClick={() =>
                          handleWithdraw({
                            offeredCourseId: availableCourse?.id,
                            offeredCourseSectionId: section?.id,
                          })
                        }
                      >
                        Withdraw
                      </CustomButton>
                    ) : (
                      <CustomButton
                        onClick={() =>
                          handleEnroll({
                            offeredCourseId: availableCourse?.id,
                            offeredCourseSectionId: section?.id,
                          })
                        }
                      >
                        Enroll
                      </CustomButton>
                    )}
                  </td>
                </tr>
              )
            )}
          </table>
        ),
        // children: (
        //   <table style={{ padding: "0px 10px", borderSpacing: "10px 15px" }}>
        //     <tbody>
        //       {availableCourse?.offeredCourseSections?.map(
        //         (section: any, index: number) => (
        //           <tr key={index}>
        //             <td style={{ width: "30%" }}>
        //               <strong>Sec - {section?.title}</strong>
        //             </td>
        //             <td style={{ width: "30%" }}>
        //               Enrolled - ({section?.currentEnrolledStudent}/
        //               {section?.maxCapacity})
        //             </td>
        //             <td style={{ width: "30%" }}>
        //               <table
        //                 style={{
        //                   border: "1px solid #d9d9d9",
        //                   padding: "5px 10px",
        //                   borderRadius: "5px",
        //                 }}
        //               >
        //                 <thead>
        //                   <tr>
        //                     <th
        //                       style={{
        //                         textAlign: "center",
        //                         borderBottom: "1px solid black",
        //                         textTransform: "capitalize",
        //                       }}
        //                       colSpan={3}
        //                     >
        //                       class schedule
        //                     </th>
        //                   </tr>
        //                 </thead>
        //                 <tbody>
        //                   {section?.offeredCourseClassSchedules?.map(
        //                     (el: any, index: number) => (
        //                       <tr key={index}>
        //                         <td
        //                           style={{
        //                             fontWeight: 700,
        //                             marginRight: "10px",
        //                             textTransform: "capitalize",
        //                             textAlign: "right",
        //                           }}
        //                         >
        //                           {el?.dayOfWeek}
        //                         </td>
        //                         <td
        //                           style={{
        //                             textAlign: "left",
        //                             padding: "0px 15px",
        //                           }}
        //                         >
        //                           {el?.startTime} - {el?.endTime}
        //                         </td>
        //                       </tr>
        //                     )
        //                   )}
        //                 </tbody>
        //               </table>
        //             </td>
        //             <td style={{ width: "30%" }}>
        //               {availableCourse?.isTaken && section?.isTaken ? (
        //                 <CustomButton
        //                   onClick={() =>
        //                     handleWithdraw({
        //                       offeredCourseId: availableCourse?.id,
        //                       offeredCourseSectionId: section?.id,
        //                     })
        //                   }
        //                 >
        //                   Withdraw
        //                 </CustomButton>
        //               ) : (
        //                 <CustomButton
        //                   onClick={() =>
        //                     handleEnroll({
        //                       offeredCourseId: availableCourse?.id,
        //                       offeredCourseSectionId: section?.id,
        //                     })
        //                   }
        //                 >
        //                   Enroll
        //                 </CustomButton>
        //               )}
        //             </td>
        //           </tr>
        //         )
        //       )}
        //     </tbody>
        //   </table>
        // ),
      };

      return obj;
    }
  );

  const isAtLeastOneCourseTaken =
    availableCourses?.filter((el: any) => el.isTaken === true).length > 0
      ? true
      : false;
  console.log({ availableCourses });

  if (isLoading) return <CustomLoading />;
  return (
    <>
      <ActionBar title="Course Pre-registration" />

      {availableCourses?.length > 0 ? (
        <CustomCollapse items={availableCourses} />
      ) : null}

      {isAtLeastOneCourseTaken && (
        <div
          style={{
            margin: "15px 0px",
          }}
        >
          <CustomButton onClick={handleConfirmRegistration} type="primary">
            Confirm Registration
          </CustomButton>
        </div>
      )}
    </>
  );
}

function CustomCollapse({ items }: any) {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.key}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>{item.label}</h3>
          <div>{item.children}</div>
        </div>
      ))}
    </div>
  );
}
