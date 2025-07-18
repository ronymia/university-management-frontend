import ViewField from '@/components/Forms/ViewField';
import { superAdminInfo } from '@/constants/superAdmin';
import { getFullName } from '@/utils/getFullName';
import React from 'react';

export default function SuperAdminProfile() {
    return (
        <section
            className={`rounded-md p-3 border border-[#eee] shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}
        >
            {/*  */}
            <div
                className={`col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-row justify-between items-center`}
            >
                <h1 className={`text-center text-2xl font-semibold drop-shadow-2xl my-3`}>
                    Super Admin Information
                </h1>
            </div>

            {/* Admin ID */}
            <ViewField label={'ID'} value={`Super Admin`} />
            {/* NAME */}
            <ViewField label={'Name'} value={`${getFullName(superAdminInfo.name)}`} />
            {/* EMAIL */}
            <ViewField label={'Email'} value={superAdminInfo.email} />
            {/* CONTACT NO */}
            <ViewField label={'Contact No.'} value={superAdminInfo.contactNo} />
            {/* EMERGENCY CONTACT NO. */}
            <ViewField label={'Emergency Contact No.'} value={superAdminInfo.emergencyContactNo} />
            {/* BLOOD GROUP */}
            <ViewField label={'Blood Group'} value={superAdminInfo.bloodGroup} />
            {/* DATE OF BIRTH */}
            <ViewField label={'Date of Birth'} value={superAdminInfo.dateOfBirth} />
            {/* GENDER */}
            <ViewField label={'Gender'} value={superAdminInfo.gender} />
            {/* PRESENT ADDRESS */}
            <ViewField label={'Present Address'} value={superAdminInfo.presentAddress} />
            {/* PERMANENT ADDRESS */}
            <ViewField label={'Permanent Address'} value={superAdminInfo.permanentAddress} />
        </section>
    );
}
