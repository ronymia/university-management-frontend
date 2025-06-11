import AcademicFacultyField from "@/components/Academic/AcademicFacultyField";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomLoading from "@/components/Loader/CustomLoading";
import {
  useAcademicDepartmentByIdQuery,
  useAddAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
} from "@/redux/api/academic/departmentApi";
import { academicDepartmentSchema } from "@/schemas/academic/departmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AcademicDepartmentForm({
  id,
  popupCloseHandler,
}: {
  id: string;
  popupCloseHandler: () => void;
}) {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const [updateAcademicDepartment] = useUpdateAcademicDepartmentMutation();

  const { data, isLoading } = useAcademicDepartmentByIdQuery(id, { skip: !id });
  const defaultValues = {
    title: data?.title,
    academicFacultyId: data?.academicFacultyId,
  };

  const onSubmit = async (data: any) => {
    console.log({ data });
    try {
      if (!!id) {
        const res = await updateAcademicDepartment({ body: data, id });
        if (!!res) {
          popupCloseHandler?.();
        }
      } else {
        const res = await addAcademicDepartment(data);
        if (!!res) {
          popupCloseHandler?.();
        }
        // console.log(data);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isLoading) {
    return <CustomLoading height={"h-40"} />;
  }
  return (
    <>
      <CustomForm
        submitHandler={onSubmit}
        resolver={zodResolver(academicDepartmentSchema)}
        defaultValues={defaultValues ? defaultValues : undefined}
        className={`flex flex-col gap-2`}
      >
        <CustomInputField
          id="title"
          name="title"
          type="text"
          label="Title"
          placeholder="Title"
          required
        />

        <AcademicFacultyField
          name="academicFacultyId"
          label="Academic Faculty"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            //   disabled={updateResult.isLoading || createResult.isLoading}
            className={`px-3 py-2 border border-primary rounded-lg text-primary drop-shadow-2xl cursor-pointer w-xs`}
          >
            Cancel
          </button>
          <button
            type="submit"
            //   disabled={updateResult.isLoading || createResult.isLoading}
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
