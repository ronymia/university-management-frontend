import ViewField from '@/components/Forms/ViewField';
import React from 'react';

export default function SuperAdminProfile() {
    return (
        <section
            className={`rounded-md p-3 border border-[#eee] shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}
        >
            {/*  */}
            {/* <div
                className={`col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-row justify-between items-center`}
            >
                <h1 className={`text-center text-2xl font-semibold drop-shadow-2xl my-3`}>
                    Basic Information
                </h1>
            </div> */}

            {/* Admin ID */}
            <ViewField label={'ID'} value={`Super Admin`} />
            {/* NAME */}
            <ViewField label={'Name'} value={`MD. Rony Mia`} />
            {/* EMAIL */}
            <ViewField label={'Email'} value={`rony.mia7800@gmail.com`} />
            {/* CONTACT NO */}
            <ViewField label={'Contact No.'} value={`+8801321185989`} />
            {/* EMERGENCY CONTACT NO. */}
            <ViewField label={'Emergency Contact No.'} value={`+8801321185989`} />
            {/* BLOOD GROUP */}
            <ViewField label={'Blood Group'} value={`$AB+`} />
            {/* DATE OF BIRTH */}
            <ViewField label={'Date of Birth'} value={`10-12-1998`} />
            {/* GENDER */}
            <ViewField label={'Gender'} value={`MALE`} />
            {/* PRESENT ADDRESS */}
            <ViewField label={'Present Address'} value={`DHAKA`} />
            {/* PERMANENT ADDRESS */}
            <ViewField label={'Permanent Address'} value={`DHAKA`} />
        </section>
    );
}
