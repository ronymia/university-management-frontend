import React from "react";
import { MdAddCircle } from "react-icons/md";

type ICustomButtonProps = {
  clickHandler?: () => void;
  label: string;
};

export default function CustomAddButton({
  clickHandler,
  label,
}: ICustomButtonProps) {
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={`flex gap-2 items-center justify-center rounded-full bg-primary px-3 py-2 text-base-300 cursor-pointer`}
    >
      <MdAddCircle size={24} />
      {label}
    </button>
  );
}
