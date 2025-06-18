import CustomForm from "@/components/Forms/CustomForm";
import CustomSelect from "@/components/Forms/CustomSelect";
import CustomLoading from "@/components/Loader/CustomLoading";
import { monthOptions, yearOptions } from "@/constants/global";
import {
  useAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useUpdateAcademicSemesterMutation,
} from "@/redux/api/academic/semesterApi";
import { academicSemesterSchema } from "@/schemas/academic/semester";
import { zodResolver } from "@hookform/resolvers/zod";
const semesterOptions = [
  {
    label: "Autumn",
    value: "Autumn",
  },
  {
    label: "Summer",
    value: "Summer",
  },
  {
    label: "Fall",
    value: "Fall",
  },
];

export default function AcademicSemesterForm({
  id,
  popupCloseHandler,
}: {
  id: string;
  popupCloseHandler: () => void;
}) {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const [updateAcademicSemester] = useUpdateAcademicSemesterMutation();

  const { data, isLoading } = useAcademicSemesterQuery(id, { skip: !id });
  // console.log({ data });

  const defaultValues = {
    title: data?.title,
    year: data?.year?.toString(),
    startMonth: data?.startMonth,
    endMonth: data?.endMonth,
    isCurrent: data?.isCurrent,
  };

  const onSubmit = async (data: any) => {
    if (data?.title == "Autumn") data["code"] = "01";
    else if (data?.title == "Summer") data["code"] = "02";
    else data["code"] = "03";

    data.year = parseInt(data.year);

    // console.log(data);

    if (!!id) {
      const res = await updateAcademicSemester({ body: data, id }).unwrap();
      if (!!res) {
        popupCloseHandler?.();
      }
    } else {
      const res = await addAcademicSemester(data).unwrap();
      if (!!res) {
        popupCloseHandler?.();
      }
    }
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        cancelHandler={popupCloseHandler}
        resolver={zodResolver(academicSemesterSchema)}
        defaultValues={defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        {/* title */}
        <CustomSelect
          isLoading={false}
          name={"title"}
          id={"title"}
          options={semesterOptions}
          label={"Title"}
          placeholder={"Select Title"}
          required
        />
        {/* startMonth */}
        <CustomSelect
          isLoading={false}
          name={"startMonth"}
          id={"startMonth"}
          options={monthOptions}
          label={"Start Month"}
          placeholder={"Select Start Month"}
          required
        />
        {/* endMonth */}
        <CustomSelect
          // position={"top"}
          isLoading={false}
          name={"endMonth"}
          id={"endMonth"}
          options={monthOptions}
          label={"End Month"}
          placeholder={"Select End Month"}
          required
        />
        {/* year */}
        <CustomSelect
          position={"top"}
          isLoading={false}
          name={"year"}
          id={"year"}
          options={yearOptions}
          label={"Year"}
          placeholder={"Select Year"}
          required
        />
      </CustomForm>
    </>
  );
}
