import AcademicDepartmentField from "@/components/Academic/AcademicDepartmentField";
import AcademicFacultyField from "@/components/Academic/AcademicFacultyField";
import CustomDatePicker from "@/components/Forms/CustomDatePicker";
import CustomFileUpload from "@/components/Forms/CustomFileUpload";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomRadioButton from "@/components/Forms/CustomRadioButton";
import CustomTextareaField from "@/components/Forms/CustomTextareaField";
import { useAddFacultyWithFormDataMutation } from "@/redux/api/facultyApi";
import { facultySchema } from "@/schemas/faculty";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FacultyForm({ id, popupCloseHandler }: any) {
  const [addFacultyWithFormData] = useAddFacultyWithFormDataMutation();
  const onSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    try {
      const res = await addFacultyWithFormData(formData);
      if (!!res) {
      }
      console.log({ formData });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // if (isLoading) return <CustomLoading height={`h-[80vh]`} />;
  return (
    <CustomForm submitHandler={onSubmit} resolver={zodResolver(facultySchema)}>
      {/* ADMIN INFORMATION */}
      <div className={`border border-[#d9d9d9] rounded p-3.5 mb-2.5`}>
        <p className={`font-bold mb-2.5 drop-shadow-sm`}>Admin Information</p>
        <div className={`grid grid-cols-3 gap-3`}>
          <CustomFileUpload name="file" required label="Image" />

          {/* firstName */}
          <CustomInputField
            id="faculty.name.firstName"
            name="faculty.name.firstName"
            type="text"
            label="First Name"
            placeholder="First Name"
            required
          />
          {/* middleName */}
          <CustomInputField
            id="faculty.name.middleName"
            name="faculty.name.middleName"
            type="text"
            label="Middle Name"
            placeholder="Middle Name"
            required
          />
          {/* lastName */}
          <CustomInputField
            id="faculty.name.lastName"
            name="faculty.name.lastName"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            required
          />
          {/* password */}
          <CustomInputField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            required
          />
          {/* gender */}
          <CustomRadioButton
            id="faculty.gender"
            name="faculty.gender"
            label="Gender"
            required
            options={[
              {
                name: "faculty.gender",
                title: "Male",
                value: "male",
              },
              {
                name: "faculty.gender",
                title: "Female",
                value: "female",
              },
            ]}
          />
          {/* academicDepartment */}
          <AcademicFacultyField
            name={"faculty.academicFaculty"}
            label="Academic Faculty"
          />
          {/* academicDepartment */}
          <AcademicDepartmentField
            name={"faculty.academicDepartment"}
            label="Academic Department"
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
            id="faculty.email"
            name="faculty.email"
            type="email"
            label="Email address"
            placeholder="Email address"
            required
          />
          {/* contactNo */}
          <CustomInputField
            id="faculty.contactNo"
            name="faculty.contactNo"
            type="text"
            label="Contact No."
            placeholder="Contact No."
            required
          />
          {/* emergencyContactNo */}
          <CustomInputField
            id="faculty.emergencyContactNo"
            name="faculty.emergencyContactNo"
            type="text"
            label="Emergency Contact No."
            placeholder="Emergency Contact No."
            required
          />
          {/* dateOfBirth */}
          <CustomDatePicker
            id="faculty.dateOfBirth"
            name="faculty.dateOfBirth"
            label="Date of birth"
            placeholder="Date of birth"
            required
          />
          {/* bloodGroup */}
          <CustomInputField
            id="faculty.bloodGroup"
            name="faculty.bloodGroup"
            type="text"
            label="Blood group"
            placeholder="Blood group"
            required
          />
          {/* designation */}
          <CustomInputField
            id="faculty.designation"
            name="faculty.designation"
            type="text"
            label="Designation"
            placeholder="Designation"
            required
          />
          {/* presentAddress */}
          <CustomTextareaField
            id="faculty.presentAddress"
            name="faculty.presentAddress"
            label="Present address"
            placeholder="Present address"
            required
            wrapperClassName={`col-span-3`}
            height={`h-24`}
          />
          {/* permanentAddress */}
          <CustomTextareaField
            id="faculty.permanentAddress"
            name="faculty.permanentAddress"
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
