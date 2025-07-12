import ViewField from '@/components/Forms/ViewField';
import CustomPopup from '@/components/Popup/CustomPopup';
import useUserProfile from '@/hooks/useUserProfile';
import { FiEdit } from 'react-icons/fi';
import UpdateStudentProfile from './UpdateStudentProfile';
import useDeviceWith from '@/hooks/useDeviceWith';
import usePopupOptions from '@/hooks/usePopupOptions';

export default function StudentProfile() {
    // DEVICE WIDTH
    const windowInnerWidth = useDeviceWith();
    // USER
    const { studentInfo } = useUserProfile();
    // POPUP
    const { popupOptions, setPopupOptions } = usePopupOptions();

    // GET CUSTOM WIDTH
    const getCustomWidth = () => {
        if (windowInnerWidth < 768) return '97%';
        if (windowInnerWidth > 1250) return '50%';
        return '70%';
    };
    return (
        <>
            {/* POPUP */}
            <CustomPopup
                popupOptions={popupOptions}
                setPopupOptions={setPopupOptions}
                // customHeight={customHeight}
                customWidth={getCustomWidth()}
            >
                {/* FORM CONTENT */}

                {popupOptions.form === 'student_basic_info' ? (
                    <UpdateStudentProfile
                        handleClosePopup={() => {
                            setPopupOptions((prev) => ({
                                ...prev,
                                open: false,
                            }));
                        }}
                    />
                ) : null}
            </CustomPopup>

            {/* PROFILE */}
            <section
                className={`rounded-md p-3 border border-[#eee] shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}
            >
                {/*  */}
                <div
                    className={`col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-row justify-between items-center`}
                >
                    <h1 className={`text-center text-2xl font-semibold drop-shadow-2xl my-3`}>
                        Basic Information
                    </h1>
                    <button
                        type="button"
                        onClick={() => {
                            setPopupOptions((prev) => ({
                                ...prev,
                                open: true,
                                actionType: 'update',
                                form: 'student_basic_info',
                                title: 'Update Student Basic Information',
                            }));
                        }}
                        className={`flex gap-2 items-center justify-center text-base-300 bg-primary  border-2 border-primary rounded-md font-semibold text-sm w-fit h-fit px-3 py-1.5 cursor-pointer bg-gradient-to-tl to-primary shadow-md from-primary/70 text-xs md:text-base`}
                    >
                        <FiEdit className={`text-sm md:text-xl`} />
                        {/* {label} */}
                        Update
                    </button>
                </div>

                {/* NAME */}
                <ViewField
                    label={'Name'}
                    value={`${studentInfo?.name?.firstName} ${studentInfo?.name?.middleName} ${studentInfo?.name?.lastName}`}
                />
                {/* EMAIL */}
                <ViewField label={'Email'} value={`${studentInfo?.email}`} />
                {/* CONTACT NO */}
                <ViewField label={'Contact No.'} value={`${studentInfo?.contactNo}`} />
                {/* EMERGENCY CONTACT NO. */}
                <ViewField
                    label={'Emergency Contact No.'}
                    value={`${studentInfo?.emergencyContactNo}`}
                />
                {/* BLOOD GROUP */}
                <ViewField label={'Blood Group'} value={`${studentInfo?.bloodGroup}`} />
                {/* DATE OF BIRTH */}
                <ViewField label={'Date of Birth'} value={`${studentInfo?.dateOfBirth}`} />
                {/* GENDER */}
                <ViewField label={'Gender'} value={`${studentInfo?.gender}`} />
                {/* PRESENT ADDRESS */}
                <ViewField label={'Present Address'} value={`${studentInfo?.presentAddress}`} />
                {/* PERMANENT ADDRESS */}
                <ViewField label={'Permanent Address'} value={`${studentInfo?.permanentAddress}`} />
            </section>
        </>
    );
}
