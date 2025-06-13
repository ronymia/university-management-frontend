"use client";
import DepartmentForm from "@/app/(withLayout)/super_admin/department/DepartmentForm";
import { IPopupOptions } from "@/types";
import { Dispatch, SetStateAction } from "react";
import CustomPopup from "../Popup/CustomPopup";
import AdminForm from "@/app/(withLayout)/super_admin/admin/AdminForm";
import AcademicDepartmentForm from "@/app/(withLayout)/admin/academic/department/DepartmentForm";
import AcademicFacultyForm from "@/app/(withLayout)/admin/academic/faculty/FacultyForm";
import AcademicSemesterForm from "@/app/(withLayout)/admin/academic/semester/SemesterForm";
import BuildingForm from "@/app/(withLayout)/admin/building/BuildingForm";
import RoomForm from "@/app/(withLayout)/admin/room/RoomForm";
import CourseForm from "@/app/(withLayout)/admin/course/CourseForm";
import OfferedCourseForm from "@/app/(withLayout)/admin/offered-course/OfferedCourseForm";
import SemesterRegistrationForm from "@/app/(withLayout)/admin/semester-registration/SemesterRegistrationForm";
import OfferedCourseSectionForm from "@/app/(withLayout)/admin/offered-course-section/OfferedCourseSectionForm";
import Popup from "reactjs-popup";
import { motion } from "motion/react";
import CustomButton from "../Button/CustomButton";
import StudentForm from "@/app/(withLayout)/admin/manage-student/StudentForm";
import FacultyForm from "../ui/Common/FacultyForm";
const popupVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 15 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2, ease: "easeInOut" }, // Smooth close effect
  },
};

export default function FormModal({
  popupOptions,
  setPopupOptions,
}: {
  popupOptions: IPopupOptions;
  setPopupOptions: Dispatch<SetStateAction<IPopupOptions>>;
}) {
  const handleClosePopup = () =>
    setPopupOptions((prev) => ({ ...prev, open: false }));

  // FORM CONTENT
  const FormContent = () => {
    switch (popupOptions?.actionType) {
      case "delete":
        if (popupOptions.data?.id) {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="mx-auto text-center my-4 w-full"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2 mx-auto text-red-500"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  duration: 0.4,
                }}
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </motion.svg>
              <div className="mx-auto my-4 w-full">
                <h3 className="text-lg font-black text-gray-800">
                  Confirm Delete
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  Are you sure you want to delete this{" "}
                  <span className="text-error font-bold">
                    {/* {formatRole(popupOptions?.form ? popupOptions?.form : "")} */}
                    {popupOptions?.form}
                  </span>
                  ?
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <CustomButton
                  variant="outlined"
                  onClick={() => handleClosePopup?.()}
                  // className="btn text-white bg-red-500 hover:bg-red-600"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    popupOptions?.deleteHandler?.();
                    handleClosePopup?.();
                  }}
                  // className="btn text-white bg-red-500 hover:bg-red-600"
                >
                  Delete
                </CustomButton>
              </div>
            </motion.div>
          );
        }
        break;
      case "create":
      case "update":
        switch (popupOptions.form) {
          case "department":
            return (
              <DepartmentForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "admin":
            return (
              <AdminForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "faculty":
            return (
              <FacultyForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "academic_department":
            return (
              <AcademicDepartmentForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "academic_faculty":
            return (
              <AcademicFacultyForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "academic_semester":
            return (
              <AcademicSemesterForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "building":
            return (
              <BuildingForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "room":
            return (
              <RoomForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "course":
            return (
              <CourseForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "offered_course":
            return (
              <OfferedCourseForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "offered_course_section":
            return (
              <OfferedCourseSectionForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "semester_registration":
            return (
              <SemesterRegistrationForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );
          case "student":
            return (
              <StudentForm
                id={
                  popupOptions?.actionType === "update" && popupOptions?.data
                    ? popupOptions?.data?.id
                    : ""
                }
                popupCloseHandler={handleClosePopup}
              />
            );

          default:
            break;
        }
        break;

      default:
        return "Unknown Action Type";
    }
  };
  return popupOptions?.actionType === "delete" ? (
    <Popup
      open={popupOptions?.open}
      overlayStyle={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)",
      }}
      closeOnDocumentClick={false}
      className={`relative overflow-hidden w-1/2 rounded-xl pop`}
    >
      <motion.div
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`relative bg-base-300 shadow-xl rounded-xl border-2 w-96 md:w-[512px] border-error`}
      >
        {<FormContent />}
      </motion.div>
    </Popup>
  ) : (
    <CustomPopup popupOptions={popupOptions} setPopupOptions={setPopupOptions}>
      {/* FORM CONTENT */}

      <FormContent />
    </CustomPopup>
  );
}
