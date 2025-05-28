import React, { useState } from "react";
import Popup from "reactjs-popup";
//

export default function CustomPopup({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [popupOptions, setPopupOptions] = useState({
    open: false,
    closeOnDocumentClick: true,
  });
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
        open={popupOptions.open}
        closeOnDocumentClick
        onClose={() => setPopupOptions((o) => ({ ...o, open: false }))}
      >
        {children}
      </Popup>
    </>
  );
}

// POPUP HOOK
export function usePopup() {
  const [popupOptions, setPopupOptions] = useState({
    open: false,
    closeOnDocumentClick: true,
  });

  const togglePopup = () => {
    setPopupOptions((o) => ({ ...o, open: !o.open }));
  };

  return {
    popupOptions,
    togglePopup,
    setPopupOptions,
  };
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
