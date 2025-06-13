import React from "react";
import CustomFilterButton from "../Button/CustomFilterButton";
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
      <div className="flex items-center justify-center gap-3">
        <h1 className={`font-medium text-2xl drop-shadow-2xl`}>{title}</h1>{" "}
        <small
          className={`bg-primary/10 font-bold text-primary rounded w-6 h-6 flex items-center justify-center drop-shadow-2xl shadow`}
        >
          5
        </small>
      </div>
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
