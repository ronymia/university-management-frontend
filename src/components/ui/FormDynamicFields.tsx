'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { daysOptions } from '@/constants/global';
import CustomSelect from '../Forms/CustomSelect';
import BuildingField from './Fields/BuildingField';
import RoomField from './Fields/RoomField';
import CustomButton from '../Button/CustomButton';
import CoreFacultyField from './Fields/CoreFacultyField';
import { useState } from 'react';
import CustomTimePicker from '../Forms/CustomTimePicker';

const FormDynamicFields = ({ academicDepartmentId }: { academicDepartmentId?: string }) => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'classSchedules',
    });

    const [buildingId, setBuildingId] = useState<string>('');

    return (
        <div>
            <div>
                <h1 className={`text-center text-2xl font-semibold drop-shadow-2xl my-3`}>
                    Class Schedules
                </h1>
                {fields.length > 0 ? (
                    fields.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`mb-1.5 p-5 rounded-md border border-[#d9d9d9] flex flex-col gap-2`}
                            >
                                {/* dayOfWeek */}
                                <CustomSelect
                                    isLoading={false}
                                    id={`classSchedules.${index}.dayOfWeek`}
                                    name={`classSchedules.${index}.dayOfWeek`}
                                    label={`Day of week`}
                                    options={daysOptions}
                                    required
                                />

                                {/* startTime */}
                                <CustomTimePicker
                                    name={`classSchedules.${index}.startTime`}
                                    label={`Start Time`}
                                    maxTimeName={`classSchedules.${index}.endTime`}
                                />
                                {/* endTime */}
                                <CustomTimePicker
                                    name={`classSchedules.${index}.endTime`}
                                    minTimeName={`classSchedules.${index}.startTime`}
                                    label={`End Time`}
                                />

                                {/* building */}
                                <BuildingField
                                    name={`building`}
                                    label={`Building`}
                                    onChange={(e) => {
                                        setBuildingId(e);
                                    }}
                                />
                                {/* roomId */}
                                <RoomField
                                    name={`classSchedules.${index}.roomId`}
                                    label={'Room'}
                                    buildingId={buildingId}
                                    required
                                    disabled
                                />
                                {/* facultyId */}
                                <CoreFacultyField
                                    name={`classSchedules.${index}.facultyId`}
                                    label={'Faculty'}
                                    academicDepartmentId={academicDepartmentId}
                                />

                                <CustomButton
                                    htmlType="button"
                                    onClick={() => remove(index)}
                                    className={`self-end bg-red-500 font-semibold drop-shadow`}
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
        </div>
    );
};

export default FormDynamicFields;
