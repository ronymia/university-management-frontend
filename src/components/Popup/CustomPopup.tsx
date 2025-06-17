import useDeviceWith from "@/hooks/useDeviceWith";
import { IPopupOptions } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Popup from "reactjs-popup";
//

export default function CustomPopup({
  children,
  popupOptions,
  setPopupOptions,
  customWidth,
  customHeight,
}: {
  children?: React.ReactNode;
  popupOptions: IPopupOptions;
  setPopupOptions: Dispatch<SetStateAction<IPopupOptions>>;
  customHeight?: string;
  customWidth?: string;
}) {
  // GET DEVICE WIDTH
  const windowInnerWidth = useDeviceWith();
  const isMobile = windowInnerWidth < 768;
  const handleClosePopup = () =>
    setPopupOptions((prev) => ({ ...prev, open: false }));

  return (
    <>
      <Popup
        modal={true}
        lockScroll
        position={isMobile ? "bottom center" : "center center"}
        open={popupOptions.open}
        closeOnDocumentClick={false}
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: isMobile ? "flex-end" : "center",
          alignItems: isMobile ? "flex-end" : "center",
        }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          width: customWidth || (isMobile ? "98%" : "50%"),
          height: customHeight || "auto",
          maxHeight: "90vh",
          borderRadius: "10px",
          background: "#fff",
          margin: isMobile ? "10px" : undefined,
          ...(isMobile && {
            width: "calc(100% - 20px)",
            // maxWidth: "400px",
          }),
        }}
      >
        {/* HEADER */}
        <header
          className={`p-4 flex justify-between items-center drop-shadow shadow`}
        >
          {/* TITLE */}
          <h1 className={`m-0 text-2xl font-semibold py-1.5`}>
            {popupOptions.title}
          </h1>
          <button type="button" onClick={handleClosePopup}>
            <IoCloseCircleSharp
              size={30}
              className={`text-gray-500 hover:text-error`}
            />
          </button>
        </header>

        {/* CONTENT */}
        <div
          className={`p-2.5 flex-1 overflow-hidden overflow-y-scroll scroll-smooth scroll-auto`}
        >
          {children}
        </div>
      </Popup>
    </>
  );
}

export function TriggerPopup({
  label,
  className,
  clickHandler = () => {},
}: {
  label: string;
  className?: React.ReactNode;
  clickHandler?: () => void;
}) {
  return (
    <button
      type="button"
      className={`${className}`}
      onClick={() => {
        if (clickHandler) clickHandler();
      }}
    >
      {label}
    </button>
  );
}

// POPUP HOOK
export function usePopup() {
  const [popupOptions, setPopupOptions] = useState<IPopupOptions>({
    open: false,
    closeOnDocumentClick: true,
    actionType: "add",
    form: "",
    data: null,
    title: "",
  });

  const togglePopup = () => {
    setPopupOptions((o) => ({ ...o, open: !o.open }));
  };

  const handleAddNewDepartment = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "department",
      title: "Create Department",
    }));
  };
  const handleAddNewAdmin = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "admin",
      title: "Create Admin",
    }));
  };
  const handleAddNewFaculty = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "faculty",
      title: "Create Faculty",
    }));
  };
  const handleAddNewAcademicDepartment = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "academic_department",
      title: "Create Academic Department",
    }));
  };
  const handleAddNewAcademicFaculty = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "academic_faculty",
      title: "Create Academic Faculty",
    }));
  };
  const handleAddNewAcademicSemester = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "academic_semester",
      title: "Create Academic Semester",
    }));
  };
  const handleAddNewBuilding = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "building",
      title: "Create Building",
    }));
  };
  const handleAddNewRoom = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "room",
      title: "Create Room",
    }));
  };
  const handleAddNewCourse = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "course",
      title: "Create Course",
    }));
  };
  const handleAddNewOfferedCourse = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "offered_course",
      title: "Create Offered Course",
    }));
  };
  const handleAddNewSemesterRegistration = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "semester_registration",
      title: "Create Semester Registration",
    }));
  };
  const handleAddNewOfferedCourseSection = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "offered_course_section",
      title: "Offered Course Section",
    }));
  };
  const handleAddNewStudent = () => {
    setPopupOptions((prev) => ({
      ...prev,
      open: true,
      actionType: "create",
      form: "student",
      title: "Create Student",
    }));
  };

  return {
    popupOptions,
    togglePopup,
    setPopupOptions,
    handleAddNewDepartment,
    handleAddNewAdmin,
    handleAddNewFaculty,
    handleAddNewAcademicDepartment,
    handleAddNewAcademicFaculty,
    handleAddNewAcademicSemester,
    handleAddNewBuilding,
    handleAddNewRoom,
    handleAddNewCourse,
    handleAddNewOfferedCourse,
    handleAddNewSemesterRegistration,
    handleAddNewOfferedCourseSection,
    handleAddNewStudent,
  };
}
