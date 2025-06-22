import AcademicFacultyField from '@/components/Academic/AcademicFacultyField';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomLoading from '@/components/Loader/CustomLoading';
import CustomToaster from '@/components/Notification/CustomToaster';
import {
    useAcademicDepartmentByIdQuery,
    useAddAcademicDepartmentMutation,
    useUpdateAcademicDepartmentMutation,
} from '@/redux/api/academic/departmentApi';
import { academicDepartmentSchema } from '@/schemas/academic/departmentSchema';
import { zodResolver } from '@hookform/resolvers/zod';

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
        // console.log({ data });
        if (!!id) {
            const res = await updateAcademicDepartment({ body: data, id }).unwrap();
            if (res?.id) {
                popupCloseHandler?.();
                CustomToaster({
                    type: 'success',
                    text: 'Academic Department Updated',
                });
            }
        } else {
            const res = await addAcademicDepartment(data).unwrap();
            if (res?.id) {
                popupCloseHandler?.();
            }
            // console.log(data);
        }
    };

    if (isLoading) {
        return <CustomLoading height={'h-40'} />;
    }
    return (
        <>
            <CustomForm
                submitHandler={onSubmit}
                resolver={zodResolver(academicDepartmentSchema)}
                defaultValues={defaultValues ? defaultValues : undefined}
                cancelHandler={popupCloseHandler}
                className={`flex flex-col gap-2 h-full flex-1`}
            >
                <CustomInputField
                    id="title"
                    name="title"
                    type="text"
                    label="Title"
                    placeholder="Title"
                    required
                />

                <AcademicFacultyField name="academicFacultyId" label="Academic Faculty" />
            </CustomForm>
        </>
    );
}
