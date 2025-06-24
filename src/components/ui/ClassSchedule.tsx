import { IOfferedCourseSchedule } from '@/types';
import Link from 'next/link';

type ClassScheduleProps = {
    data: IOfferedCourseSchedule[];
};

export default function ClassSchedule({ data }: ClassScheduleProps) {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <tbody className="space-y-4">
                    {data?.map((schedule, index) => (
                        <tr
                            key={index}
                            className="bg-white shadow-md rounded-xl border border-gray-200 block w-full mb-4 p-4"
                        >
                            <td className="block mb-2">
                                <strong>Faculty Name:</strong>{' '}
                                <Link
                                    href={`/student/faculty/${schedule?.faculty?.id}`}
                                    className="text-blue-600 hover:underline ml-1"
                                >
                                    {schedule?.faculty?.firstName} {schedule?.faculty?.lastName}{' '}
                                    {schedule?.faculty?.middleName}
                                </Link>
                            </td>
                            <td className="block mb-1">
                                <strong>Day:</strong>{' '}
                                <span className="ml-1">{schedule?.dayOfWeek}</span>
                            </td>
                            <td className="block mb-1">
                                <strong>Time:</strong>{' '}
                                <span className="ml-1">
                                    {schedule?.startTime} - {schedule?.endTime}
                                </span>
                            </td>
                            <td className="block mb-1">
                                <strong>Building:</strong>{' '}
                                <span className="ml-1">{schedule?.room?.building?.title}</span>
                            </td>
                            <td className="block mb-1">
                                <strong>Room No.:</strong>{' '}
                                <span className="ml-1">{schedule?.room?.roomNumber}</span>
                            </td>
                            <td className="block">
                                <strong>Floor No.:</strong>{' '}
                                <span className="ml-1">{schedule?.room?.floor}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
