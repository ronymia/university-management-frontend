import ViewField from '@/components/Forms/ViewField';
import CustomPopup from '@/components/Popup/CustomPopup';
import usePopupOptions from '@/hooks/usePopupOptions';
import useUserProfile from '@/hooks/useUserProfile';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import UpdateGuardianInformation from './UpdateGuardianInformation';

export default function GuardianInformation() {
    const { studentInfo: userInfo } = useUserProfile();
    const { popupOptions, setPopupOptions } = usePopupOptions();
    return (
        <>
            <CustomPopup popupOptions={popupOptions} setPopupOptions={setPopupOptions}>
                {popupOptions?.form === 'guardian_info' ? (
                    <UpdateGuardianInformation
                        handleClosePopup={() => {
                            setPopupOptions((prev) => ({
                                ...prev,
                                open: false,
                            }));
                        }}
                    />
                ) : null}
            </CustomPopup>

            <section
                className={`rounded-md p-3 border border-[#eee] shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}
            >
                <div
                    className={`col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-row justify-between items-center`}
                >
                    <h1
                        className={`text-center text-lg md:text-2xl font-semibold drop-shadow-2xl my-3`}
                    >
                        Guardian Information
                    </h1>
                    <button
                        type="button"
                        onClick={() => {
                            setPopupOptions((prev) => ({
                                ...prev,
                                open: true,
                                actionType: 'update',
                                form: 'guardian_info',
                                title: 'Update Guardian Information',
                            }));
                        }}
                        className={`flex gap-2 items-center justify-center text-base-300 bg-primary  border-2 border-primary rounded-md font-semibold text-sm w-fit h-fit px-3 py-1.5 cursor-pointer bg-gradient-to-tl to-primary shadow-md from-primary/70 text-xs md:text-base`}
                    >
                        <FiEdit className={`text-sm md:text-xl`} />
                        {/* {label} */}
                        Update
                    </button>
                </div>

                {/* GUARDIAN */}
                <ViewField label={"Father's Name"} value={`${userInfo?.guardian?.fatherName}`} />
                <ViewField
                    label={"Father's Contact No."}
                    value={`${userInfo?.guardian?.fatherContactNo}`}
                />
                <ViewField
                    label={"Father's Occupation."}
                    value={`${userInfo?.guardian?.fatherOccupation}`}
                />
                <ViewField label={"Mother's Name"} value={`${userInfo?.guardian?.motherName}`} />
                <ViewField
                    label={"Mother's Contact No."}
                    value={`${userInfo?.guardian?.motherContactNo}`}
                />
                <ViewField
                    label={"Mother's Occupation"}
                    value={`${userInfo?.guardian?.motherOccupation}`}
                />
                <ViewField label={'Address'} value={`${userInfo?.guardian?.address}`} />

                {/* LOCAL GUARDIAN */}
                <div
                    className={`col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-row justify-between items-center`}
                >
                    <h1 className={`text-center text-lg md:text-2xl font-semibold drop-shadow-2xl`}>
                        Local Guardian Information
                    </h1>
                </div>
                <ViewField label={'Name'} value={`${userInfo?.localGuardian?.name}`} />
                <ViewField label={'Contact No.'} value={`${userInfo?.localGuardian?.contactNo}`} />
                <ViewField label={'Occupation'} value={`${userInfo?.localGuardian?.occupation}`} />
                <ViewField label={'Address'} value={`${userInfo?.localGuardian?.address}`} />
            </section>
        </>
    );
}
