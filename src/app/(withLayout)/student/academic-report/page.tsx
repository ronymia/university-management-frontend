'use client';

import ActionBar from '@/components/ui/ActionBar';
import CustomTable, { IAction, IColumn } from '@/components/Table/CustomTable';
import { useMyAcademicInfosQuery } from '@/redux/api/studentApi';
import React, { useState } from 'react';

export default function AcademicReportPage() {
    const query: Record<string, any> = {};
    const { data, isLoading } = useMyAcademicInfosQuery({ ...query });
    // ALL ACTION BUTTONS
    const [actions] = useState<IAction[]>([]);
    // TABLE COLUMNS DEFINE
    const columns: IColumn[] = [
        // NAME
        {
            header: 'Grade Report',
            accessorKey: 'customGradeReport',
            show: true,
            minWidth: 20,
        },
    ];
    return (
        <>
            <ActionBar title="My Academic Grade Report" />

            <div className={`grid grid-cols-2 gap-3`}>
                <div>
                    <div title="Total CGPA">
                        <b>{data?.academicInfo?.cgpa}</b>
                    </div>
                </div>
                <div>
                    <div title="Total completed credit">
                        <b>
                            {data?.academicInfo?.totalCompletedCredit}{' '}
                            {data?.academicInfo?.totalCompletedCredit <= 1 ? 'credit' : 'credits'}
                        </b>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <CustomTable
                columns={columns}
                rows={
                    data?.courses?.map((row: any) => ({
                        ...row,
                        customGradeReport: (
                            <>
                                <div style={{ marginBottom: '15px' }}>
                                    <div>
                                        <b>
                                            {data?.academicSemester?.title} -{' '}
                                            {data?.academicSemester?.year}
                                        </b>{' '}
                                        -{' '}
                                        <div color="blue">
                                            <b>
                                                {data?.academicSemester?.isCurrent === true
                                                    ? 'ongoing'
                                                    : ''}
                                            </b>
                                        </div>
                                    </div>
                                    <ul style={{ listStyle: 'none', marginTop: '20px' }}>
                                        {data?.completedCourses?.map((el: any) => {
                                            return (
                                                <li key={el.id}>
                                                    <div
                                                        style={{
                                                            border: '1px solid #d9d9d9',
                                                            borderRadius: '5px',
                                                            marginBottom: '5px',
                                                            padding: '10px',
                                                        }}
                                                    >
                                                        <b>{el?.course?.title}</b>
                                                        <div>
                                                            <span>
                                                                Grade: <b>{el?.grade}</b>
                                                            </span>
                                                            <span style={{ marginLeft: '20px' }}>
                                                                Gpa: <b>{el?.point}</b>
                                                            </span>
                                                            <span style={{ marginLeft: '20px' }}>
                                                                Status: <b>{el?.status}</b>
                                                            </span>
                                                            <span style={{ marginLeft: '20px' }}>
                                                                Marks: <b>{el?.totalMarks}</b>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </>
                        ),
                    })) || []
                }
                isLoading={isLoading}
                actions={actions}
            />
        </>
    );
}
