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
}) {
  const handleClosePopup = () =>
    setPopupOptions((prev) => ({ ...prev, open: false }));

  return (
    <>
      {/* <button
        type="button"
        className="button"
        onClick={() => setPopupOptions((o) => ({ ...o, open: !o.open }))}
      >
        Controlled Popup
      </button> */}
      <Popup
        modal={true}
        open={popupOptions.open}
        closeOnDocumentClick={false}
        // onClose={handleClosePopup}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          width: customWidth ? customWidth : "50%",
          // height: customHeight ? customHeight : "100%",
          maxHeight: "90vh",
          borderRadius: "10px",
          // padding: "10px",
          background: "#fff",
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
  };
}
