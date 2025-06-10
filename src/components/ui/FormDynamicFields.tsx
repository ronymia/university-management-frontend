"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { daysOptions } from "@/constants/global";
import CustomSelect from "../Forms/CustomSelect";
import CustomInputField from "../Forms/CustomInputField";
import BuildingField from "./Fields/BuildingField";
import RoomField from "./Fields/RoomField";
import CustomButton from "../Button/CustomButton";
import CoreFacultyField from "./Fields/CoreFacultyField";

const FormDynamicFields = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classSchedules",
  });

  return (
    <>
      <div>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={index}
                className={`mb-1.5 p-5 rounded-md border border-[#d9d9d9] flex flex-col gap-2`}
              >
                {/* dayOfWeek */}
                <CustomSelect
                  id={`classSchedules.${index}.dayOfWeek`}
                  name={`classSchedules.${index}.dayOfWeek`}
                  label={`Day of week`}
                  options={daysOptions}
                  required
                />
                {/* startTime */}
                <CustomInputField
                  id={`classSchedules.${index}.startTime`}
                  name={`classSchedules.${index}.startTime`}
                  type="text"
                  label="Start time"
                  placeholder="Start time"
                  required
                />
                {/* endTime */}
                <CustomInputField
                  id={`classSchedules.${index}.endTime`}
                  name={`classSchedules.${index}.endTime`}
                  type="text"
                  label="End time"
                  placeholder="End time"
                  required
                />
                {/* building */}
                <BuildingField name={`building`} label={`Building`} />
                {/* roomId */}
                <RoomField
                  name={`classSchedules.${index}.roomId`}
                  label={"Room"}
                />
                {/* facultyId */}
                <CoreFacultyField
                  name={`classSchedules.${index}.facultyId`}
                  label={"Faculty"}
                />

                <CustomButton
                  htmlType="button"
                  onClick={() => remove(index)}
                  className={`self-end`}
                >
                  Delete
                </CustomButton>
              </div>
            );
          })
        ) : (
          <h1>No class schedule found</h1>
        )}
      </div>
      <CustomButton
        htmlType="button"
        onClick={() => append(undefined)}
        className={`self-end w-fit`}
      >
        Add Schedule
      </CustomButton>
    </>
  );
};

export default FormDynamicFields;
