import { IPopupOptions } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
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
          className={``}
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            filter: "drop-shadow(var(--drop-shadow-lg))",
          }}
        >
          {/* TITLE */}
          <h1
            style={{
              margin: "0px",
              fontSize: "24px",
              fontWeight: "500",
              textAlign: "left",
              padding: "10px 0px",
            }}
          >
            {popupOptions.title}
          </h1>
          <button type="button" onClick={handleClosePopup}>
            X
          </button>
        </header>

        {/* CONTENT */}
        <div
          className={``}
          style={{
            padding: "10px",
            overflow: "hidden",
            overflowY: "scroll",
            width: "100%",
            height: "100%",
          }}
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

  return {
    popupOptions,
    togglePopup,
    setPopupOptions,
    handleAddNewDepartment,
  };
}
