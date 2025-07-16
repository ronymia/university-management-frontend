import ViewField from '@/components/Forms/ViewField';
import CustomPopup from '@/components/Popup/CustomPopup';
import useUserProfile from '@/hooks/useUserProfile';
import { FiEdit } from 'react-icons/fi';
import useDeviceWith from '@/hooks/useDeviceWith';
import usePopupOptions from '@/hooks/usePopupOptions';
import UpdateFacultyProfile from './UpdateFacultyProfile';

export default function FacultyProfile() {
    // DEVICE WIDTH
    const windowInnerWidth = useDeviceWith();
    // USER
    const { facultyInfo } = useUserProfile();
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

                {popupOptions.form === 'faculty_basic_info' ? (
                    <UpdateFacultyProfile
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
                                form: 'faculty_basic_info',
                                title: 'Update Faculty Information',
                            }));
                        }}
                        className={`flex gap-2 items-center justify-center text-base-300 bg-primary  border-2 border-primary rounded-md font-semibold w-fit h-fit px-3 py-1.5 cursor-pointer bg-gradient-to-tl to-primary shadow-md from-primary/70 text-xs md:text-base`}
                    >
                        <FiEdit className={`text-sm md:text-xl`} />
                        {/* {label} */}
                        Update
                    </button>
                </div>

                {/* Faculty ID */}
                <ViewField label={'Faculty ID'} value={`${facultyInfo?.id}`} />
                {/* NAME */}
                <ViewField
                    label={'Name'}
                    value={`${facultyInfo?.name?.firstName} ${facultyInfo?.name?.middleName} ${facultyInfo?.name?.lastName}`}
                />
                {/* EMAIL */}
                <ViewField label={'Email'} value={`${facultyInfo?.email}`} />
                {/* DESIGNATION */}
                <ViewField label={'Designation'} value={`${facultyInfo?.designation}`} />
                {/* ACADEMIC DEPARTMENT */}
                <ViewField
                    label={'Academic Department'}
                    value={`${facultyInfo?.academicDepartment?.title}`}
                />
                {/* ACADEMIC FACULTY */}
                <ViewField
                    label={'Academic Faculty'}
                    value={`${facultyInfo?.academicFaculty?.title}`}
                />
                {/* CONTACT NO */}
                <ViewField label={'Contact No.'} value={`${facultyInfo?.contactNo}`} />
                {/* EMERGENCY CONTACT NO. */}
                <ViewField
                    label={'Emergency Contact No.'}
                    value={`${facultyInfo?.emergencyContactNo}`}
                />
                {/* BLOOD GROUP */}
                <ViewField label={'Blood Group'} value={`${facultyInfo?.bloodGroup}`} />
                {/* DATE OF BIRTH */}
                <ViewField label={'Date of Birth'} value={`${facultyInfo?.dateOfBirth}`} />
                {/* GENDER */}
                <ViewField label={'Gender'} value={`${facultyInfo?.gender}`} />
                {/* PRESENT ADDRESS */}
                <ViewField label={'Present Address'} value={`${facultyInfo?.presentAddress}`} />
                {/* PERMANENT ADDRESS */}
                <ViewField label={'Permanent Address'} value={`${facultyInfo?.permanentAddress}`} />
            </section>
        </>
    );
}
