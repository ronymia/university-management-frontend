import CustomForm from "@/components/Forms/CustomForm";
import CustomTextareaField from "@/components/Forms/CustomTextareaField";
import CustomInputField from "@/components/Forms/CustomInputField";
import {
  useAddAdminWithFormDataMutation,
  useAdminByIdQuery,
  useUpdateAdminMutation,
} from "@/redux/api/adminApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { createAdminSchema, updateAdminSchema } from "@/schemas/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomLoading from "@/components/Loader/CustomLoading";
import CustomDatePicker from "@/components/Forms/CustomDatePicker";
import CustomSelect from "@/components/Forms/CustomSelect";
import CustomFileUpload from "@/components/Forms/CustomFileUpload";
import GenderField from "@/components/ui/Fields/GenderField";
import { useRouter } from "next/navigation";

export default function AdminForm({ id = "" }: { id?: string }) {
  const router = useRouter();
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });
  const { data: adminData, isLoading: adminLoading } = useAdminByIdQuery(id);
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  //@ts-ignore
  const departments: IDepartment[] = data?.departments;

  const departmentOptions =
    departments &&
    departments?.map((department) => {
      return {
        label: department?.title,
        value: department?.id,
      };
    });

  const defaultValues = {
    password: "",
    admin: {
      name: {
        firstName: adminData?.name?.firstName,
        middleName: adminData?.name?.middleName,
        lastName: adminData?.name?.lastName,
      },
      email: adminData?.email,
      designation: adminData?.designation,
      dateOfBirth: adminData?.dateOfBirth,
      contactNo: adminData?.contactNo,
      emergencyContactNo: adminData?.emergencyContactNo,
      bloodGroup: adminData?.bloodGroup,
      gender: adminData?.gender,
      managementDepartment: adminData?.managementDepartment?.id,
      presentAddress: adminData?.presentAddress,
      permanentAddress: adminData?.permanentAddress,
    },
  };

  const onSubmit = async (values: any) => {
    console.log({ values });
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    try {
      if (!!id) {
        const body = values.admin;
        delete body["profileImage"];
        const res = await updateAdmin({ id, body });
        if (!!res) {
          router.back();
          console.log("res", { res });
        }
      } else {
        await addAdminWithFormData(formData);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (adminLoading) return <CustomLoading height={`h-[80vh]`} />;
  return (
    <CustomForm
      submitHandler={onSubmit}
      resolver={zodResolver(id ? updateAdminSchema : createAdminSchema)}
      defaultValues={defaultValues ? defaultValues : undefined}
    >
      {/* ADMIN INFORMATION */}
      <div className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5`}>
        <p className={`font-bold mb-2.5 drop-shadow-sm`}>Admin Information</p>
        <div className={`grid grid-cols-3 gap-3`}>
          {!id && (
            <CustomFileUpload id="file" name="file" required label="Image" />
          )}

          {/* firstName */}
          <CustomInputField
            id="admin.name.firstName"
            name="admin.name.firstName"
            type="text"
            label="First Name"
            placeholder="First Name"
            required
          />
          {/* middleName */}
          <CustomInputField
            id="admin.name.middleName"
            name="admin.name.middleName"
            type="text"
            label="Middle Name"
            placeholder="Middle Name"
            required
          />
          {/* lastName */}
          <CustomInputField
            id="admin.name.lastName"
            name="admin.name.lastName"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            required
          />
          {/* password */}
          {!id ? (
            <CustomInputField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              required
            />
          ) : null}

          {/* gender */}
          <GenderField name="admin.gender" label="Gender" required />
          {/* managementDepartment */}
          <CustomSelect
            isLoading={isLoading}
            name={"admin.managementDepartment"}
            id={"admin.managementDepartment"}
            options={departmentOptions}
            label="Department"
            placeholder={`Select Department`}
            required
          />
          {/* file */}

          {/* <UploadImage name="file" /> */}
        </div>
      </div>

      {/* basic info */}
      <div
        className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5 grid grid-cols-3 gap-3`}
      >
        <>
          <p className={`font-bold mb-2.5 drop-shadow-sm col-span-3`}>
            Basic Information
          </p>
          {/* email */}
          <CustomInputField
            id="admin.email"
            name="admin.email"
            type="email"
            label="Email address"
            placeholder="Email address"
            required
          />
          {/* contactNo */}
          <CustomInputField
            id="admin.contactNo"
            name="admin.contactNo"
            type="text"
            label="Contact No."
            placeholder="Contact No."
            required
          />
          {/* emergencyContactNo */}
          <CustomInputField
            id="admin.emergencyContactNo"
            name="admin.emergencyContactNo"
            type="text"
            label="Emergency Contact No."
            placeholder="Emergency Contact No."
            required
          />
          {/* dateOfBirth */}
          <CustomDatePicker
            // id="admin.dateOfBirth"
            name="admin.dateOfBirth"
            label="Date of birth"
            placeholder="Date of birth"
            required
          />
          {/* bloodGroup */}
          <CustomInputField
            id="admin.bloodGroup"
            name="admin.bloodGroup"
            type="text"
            label="Blood group"
            placeholder="Blood group"
            required
          />
          {/* designation */}
          <CustomInputField
            id="admin.designation"
            name="admin.designation"
            type="text"
            label="Designation"
            placeholder="Designation"
            required
          />
          {/* presentAddress */}
          <CustomTextareaField
            id="admin.presentAddress"
            name="admin.presentAddress"
            label="Present address"
            placeholder="Present address"
            required
            wrapperClassName={`col-span-3`}
            height={`h-24`}
          />
          {/* permanentAddress */}
          <CustomTextareaField
            id="admin.permanentAddress"
            name="admin.permanentAddress"
            label="Permanent address"
            placeholder="Permanent address"
            required
            wrapperClassName={`col-span-3`}
            height={`h-24`}
          />
        </>
      </div>
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
    </CustomForm>
  );
}
