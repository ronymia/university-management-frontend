import React from "react";
import CustomAddButton from "../Button/CustomAddButton";

type IActionBarProps = {
  createHandler?: () => void;
  title: string;
  addButtonLabel?: string;
  children?: React.ReactNode;
};

export default function ActionBar({
  children,
  createHandler,
  title,
  addButtonLabel = "Add",
}: IActionBarProps) {
  return (
    <div className={`flex items-center justify-between my-3`}>
      <h1 className={`font-medium text-base md:text-2xl drop-shadow-2xl`}>
        {title}
      </h1>
      <div className={`flex gap-3`}>
        {/* FILTER BUTTON */}
        {/* <CustomFilterButton /> */}
        {children}

        {/* ADD BUTTON */}
        {createHandler ? (
          <CustomAddButton
            clickHandler={createHandler}
            label={addButtonLabel}
          />
        ) : null}
      </div>
    </div>
  );
}
