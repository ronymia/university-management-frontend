import { IPopupOptions } from "@/types";
import CustomPopup from "./CustomPopup";
import { Dispatch, SetStateAction } from "react";
import DepartmentForm from "@/app/(withLayout)/super_admin/department/DepartmentForm";

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
                id={popupOptions?.data ? popupOptions?.data?.id : ""}
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
