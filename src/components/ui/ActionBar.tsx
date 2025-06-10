import React from "react";
import CustomFilterButton from "../Button/CustomFilterButton";
import CustomAddButton from "../Button/CustomAddButton";

type IActionBarProps = {
  createHandler?: () => void;
  title: string;
  addButtonLabel: string;
};

export default function ActionBar({
  children,
  createHandler,
  title,
  addButtonLabel,
}: IActionBarProps) {
  return (
    <div className={`flex items-center justify-between my-3`}>
      <h1 className={`font-medium text-2xl`}>{title}</h1>

      <div className={`flex gap-3`}>
        {/* FILTER BUTTON */}
        <CustomFilterButton />
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
