"use client";

import AcademicSemesterField from "@/components/Academic/AcademicSemesterField";
import CustomDatePicker from "@/components/Forms/CustomDatePicker";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomSelect from "@/components/Forms/CustomSelect";
import CustomLoading from "@/components/Loader/CustomLoading";
import { semesterRegistrationStatus } from "@/constants/global";
import {
  useAddSemesterRegistrationsMutation,
  useSemesterRegistrationQuery,
  useUpdateSemesterRegistrationsMutation,
} from "@/redux/api/semesterRegistrationApi";
import { semesterRegistrationSchema } from "@/schemas/admin/semesterRegistration";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
type IDProps = {
  popupCloseHandler: () => void;
  id: string;
};

export default function SemesterRegistrationForm({
  id,
  popupCloseHandler,
}: IDProps) {
  const { data, isLoading } = useSemesterRegistrationQuery(id, { skip: !id });
  const [addSemesterRegistrations, createResult] =
    useAddSemesterRegistrationsMutation();
  const [updateSemesterRegistration, updateResult] =
    useUpdateSemesterRegistrationsMutation();

  const onSubmit = async (values: any, reset: any) => {
    const tempObject = { ...values };
    tempObject["startDate"] = dayjs(
      tempObject["startDate"],
      "DD-MM-YYYY"
    ).toISOString();
    tempObject["endDate"] = dayjs(
      tempObject["endDate"],
      "DD-MM-YYYY"
    ).toISOString();
    tempObject["minCredit"] = Number(tempObject["minCredit"]);
    tempObject["maxCredit"] = Number(tempObject["maxCredit"]);
    try {
      if (id) {
        const res = await updateSemesterRegistration({
          id,
          body: tempObject,
        }).unwrap();
        console.log({ res });
        if (res?.id) {
          reset?.();
          popupCloseHandler?.();
        }
      } else {
        const res = await addSemesterRegistrations(tempObject).unwrap();
        if (res?.id) {
          reset?.();
          popupCloseHandler?.();
        }
      }
    } catch (err: any) {
      reset?.(tempObject);
      console.error(err.message);
      // message.error(err.message);
    }
  };

  const statusOptions = semesterRegistrationStatus
    ?.map((status) => {
      return {
        label: status,
        value: status,
        disabled: false,
      };
    })
    .map((el) => {
      if (data?.status === "UPCOMING") {
        if (el.value === "ENDED") {
          el.disabled = true;
        }
      } else if (data?.status === "ONGOING") {
        if (el.value === "UPCOMING") {
          el.disabled = true;
        }
      } else if (data?.status === "ENDED") {
        if (el.value === "UPCOMING" || el.value === "ONGOING") {
          el.disabled = true;
        }
      }
      return el;
    });

  const defaultValues = {
    startDate: data?.startDate || "",
    endDate: data?.endDate || "",
    academicSemesterId: data?.academicSemester?.id || "",
    minCredit: data?.minCredit || "",
    maxCredit: data?.maxCredit || "",
    status: data?.status || "",
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        resolver={zodResolver(semesterRegistrationSchema)}
        defaultValues={!!defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* startDate */}
        <CustomDatePicker name={`startDate`} label={`Start date`} required />
        {/* endDate */}
        <CustomDatePicker name={`endDate`} label={`End date`} required />
        {/* academicSemesterId */}
        <AcademicSemesterField
          name={`academicSemesterId`}
          label={`Academic Semester`}
        />

        {/* minCredit */}
        <CustomInputField
          id="minCredit"
          name="minCredit"
          type="number"
          label="Min Credit"
          placeholder="Min Credit"
          required
        />
        {/* maxCredit */}
        <CustomInputField
          id="maxCredit"
          name="maxCredit"
          type="number"
          label="Max Credit"
          placeholder="Max Credit"
          required
        />

        {/* status */}
        <CustomSelect
          id={`status`}
          name={`status`}
          label={`Status`}
          options={statusOptions}
          required
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            disabled={updateResult.isLoading || createResult.isLoading}
            className={`px-3 py-2 border border-primary rounded-lg text-primary drop-shadow-2xl cursor-pointer w-xs`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateResult.isLoading || createResult.isLoading}
            className={`px-3 py-2 bg-primary rounded-lg text-base-300 drop-shadow-2xl cursor-pointer w-xs`}
          >
            Submit
          </button>
        </div>
        {/* <FormAction
          disabled={updateResult.isLoading || createResult.isLoading}
          cancelHandler={popupCloseHandler}
        /> */}
      </CustomForm>
    </>
  );
}
