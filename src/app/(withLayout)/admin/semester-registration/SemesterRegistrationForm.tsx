'use client';

import AcademicSemesterField from '@/components/ui/Fields/Academic/AcademicSemesterField';
import CustomDatePicker from '@/components/Forms/CustomDatePicker';
import CustomForm from '@/components/Forms/CustomForm';
import CustomInputField from '@/components/Forms/CustomInputField';
import CustomSelect from '@/components/Forms/CustomSelect';
import CustomLoading from '@/components/Loader/CustomLoading';
import { semesterRegistrationStatus } from '@/constants/global';
import {
    useAddSemesterRegistrationsMutation,
    useSemesterRegistrationQuery,
    useUpdateSemesterRegistrationsMutation,
} from '@/redux/api/semesterRegistrationApi';
import { semesterRegistrationSchema } from '@/schemas/admin/semesterRegistration';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
type IDProps = {
    popupCloseHandler: () => void;
    id: string;
};

export default function SemesterRegistrationForm({ id, popupCloseHandler }: IDProps) {
    const { data, isLoading } = useSemesterRegistrationQuery(id, { skip: !id });
    const [addSemesterRegistrations] = useAddSemesterRegistrationsMutation();
    const [updateSemesterRegistration] = useUpdateSemesterRegistrationsMutation();

    const onSubmit = async (values: any) => {
        const tempObject = { ...values };
        tempObject['startDate'] = dayjs(tempObject['startDate'], 'DD-MM-YYYY').toISOString();
        tempObject['endDate'] = dayjs(tempObject['endDate'], 'DD-MM-YYYY').toISOString();
        tempObject['minCredit'] = Number(tempObject['minCredit']);
        tempObject['maxCredit'] = Number(tempObject['maxCredit']);

        if (id) {
            const res = await updateSemesterRegistration({
                id,
                body: tempObject,
            }).unwrap();

            if (res?.id) {
                popupCloseHandler?.();
            }
        } else {
            const res = await addSemesterRegistrations(tempObject).unwrap();
            if (res?.id) {
                popupCloseHandler?.();
            }
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
            if (data?.status === 'UPCOMING') {
                if (el.value === 'ENDED') {
                    el.disabled = true;
                }
            } else if (data?.status === 'ONGOING') {
                if (el.value === 'UPCOMING') {
                    el.disabled = true;
                }
            } else if (data?.status === 'ENDED') {
                if (el.value === 'UPCOMING' || el.value === 'ONGOING') {
                    el.disabled = true;
                }
            }
            return el;
        });

    const defaultValues = {
        startDate: dayjs(data?.startDate).format('DD-MM-YYYY') || '',
        endDate: dayjs(data?.endDate).format('DD-MM-YYYY') || '',
        academicSemesterId: data?.academicSemesterId || '',
        minCredit: String(data?.minCredit) || '',
        maxCredit: String(data?.maxCredit) || '',
        status: data?.status || '',
    };

    if (isLoading) {
        return <CustomLoading height="h-[50vh]" />;
    }
    return (
        <>
            <CustomForm
                submitHandler={onSubmit}
                cancelHandler={popupCloseHandler}
                resolver={zodResolver(semesterRegistrationSchema)}
                defaultValues={!!defaultValues ? defaultValues : undefined}
                className={`flex flex-col gap-2`}
            >
                {/* startDate */}
                <CustomDatePicker name={`startDate`} label={`Start date`} required />
                {/* endDate */}
                <CustomDatePicker name={`endDate`} label={`End date`} required />
                {/* academicSemesterId */}
                <AcademicSemesterField name={`academicSemesterId`} label={`Academic Semester`} />

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
                    isLoading={false}
                    id={`status`}
                    name={`status`}
                    label={`Status`}
                    options={statusOptions}
                    required
                    position="top"
                />
            </CustomForm>
        </>
    );
}
