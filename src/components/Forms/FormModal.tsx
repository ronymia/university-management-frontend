import DepartmentForm from "@/app/(withLayout)/super_admin/department/DepartmentForm";
import { IPopupOptions } from "@/types";
import { Dispatch, SetStateAction } from "react";
import CustomPopup from "../Popup/CustomPopup";
import AdminForm from "@/app/(withLayout)/super_admin/admin/AdminForm";
import FacultyForm from "@/app/(withLayout)/super_admin/manage-faculty/FacultyForm";
import AcademicDepartmentForm from "@/app/(withLayout)/admin/academic/department/DepartmentForm";
import AcademicFacultyForm from "@/app/(withLayout)/admin/academic/faculty/FacultyForm";
import AcademicSemesterForm from "@/app/(withLayout)/admin/academic/semester/SemesterForm";
import BuildingForm from "@/app/(withLayout)/admin/building/BuildingForm";
import RoomForm from "@/app/(withLayout)/admin/room/RoomForm";
import CourseForm from "@/app/(withLayout)/admin/course/CourseForm";
import OfferedCourseForm from "@/app/(withLayout)/admin/offered-course/OfferedCourseForm";

export default function FormModal({
  popupOptions,
  setPopupOptions,
}: {
  popupOptions: IPopupOptions;
  setPopupOptions: Dispatch<SetStateAction<IPopupOptions>>;
}) {
  //   const { popupOptions, setPopupOptions } = usePopup();

  // FORM CONTENT
  const FormContent = () => {
    switch (popupOptions?.actionType) {
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
                popupCloseHandler={() => {
                  setPopupOptions((prev) => ({ ...prev, open: false }));
                }}
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
  return (
    <CustomPopup popupOptions={popupOptions} setPopupOptions={setPopupOptions}>
      {/* FORM CONTENT */}

      <FormContent />
    </CustomPopup>
  );
}
