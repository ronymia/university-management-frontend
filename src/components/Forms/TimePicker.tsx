import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { FaSync } from 'react-icons/fa';
import { MdOutlineAccessTime } from 'react-icons/md';
import { motion } from 'motion/react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { convertTo12HourFormat, convertTo24HourFormat } from '@/utils/time.utils';

type ITime = {
    hour: number;
    minute: number;
    second: number;
    meridiem: 'AM' | 'PM';
};

function convertTo12HourTime(time24: string): ITime {
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return { hour, minute, second: 0, meridiem };
}

function TimePicker({
    isLoading,
    name,
    id,
    value,
    onChange,
    min,
    max,
    position = 'bottom',
    errorMessage,
    placeholder,
    isTimePickerOpen,
    setIsTimePickerOpen,
}: {
    isLoading: boolean;
    label?: string;
    name?: string;
    id?: string;
    value?: string;
    min?: string;
    max?: string;
    placeholder?: string;
    position: 'top' | 'bottom';
    onChange: (value: string) => void;
    isTimePickerOpen: boolean;
    setIsTimePickerOpen: Dispatch<SetStateAction<boolean>>;
    errorMessage: string;
}) {
    const [displayValue, setDisplayValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [time, setTime] = useState<ITime>({
        hour: 12,
        minute: 0,
        second: 0,
        meridiem: 'AM',
    });

    useEffect(() => {
        if (!value) return;

        const newTime = convertTo12HourTime(value);
        const currentTime = convertTo12HourTime(
            convertTo24HourFormat(`${time.hour}:${time.minute} ${time.meridiem}`),
        );

        // Only update if the incoming value is different from current state
        if (
            newTime.hour !== currentTime.hour ||
            newTime.minute !== currentTime.minute ||
            newTime.meridiem !== currentTime.meridiem
        ) {
            setTime(newTime);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // GET LIMIT
    const getLimit = (key: keyof ITime) => (key === 'hour' ? 12 : 59);
    // GET MIN
    const getMin = (key: keyof ITime) => (key === 'hour' ? 1 : 0);

    const increase = (key: 'hour' | 'minute') => {
        setTime((prev) => {
            const limit = getLimit(key);
            const min = getMin(key);
            const updatedValue = prev[key] + 1 > limit ? min : prev[key] + 1;

            const shouldToggleMeridiem = key === 'hour' && prev.hour === 11 && updatedValue === 12;

            return {
                ...prev,
                [key]: updatedValue,
                meridiem: shouldToggleMeridiem
                    ? prev.meridiem === 'AM'
                        ? 'PM'
                        : 'AM'
                    : prev.meridiem,
            };
        });
    };

    const decrease = (key: 'hour' | 'minute') => {
        setTime((prev) => {
            const limit = getLimit(key);
            const min = getMin(key);
            const updatedValue = prev[key] - 1 < min ? limit : prev[key] - 1;

            // Handle meridiem toggle when hour rolls back from 12 ➜ 11
            const shouldToggleMeridiem = key === 'hour' && prev.hour === 12 && updatedValue === 11;

            return {
                ...prev,
                [key]: updatedValue,
                meridiem: shouldToggleMeridiem
                    ? prev.meridiem === 'AM'
                        ? 'PM'
                        : 'AM'
                    : prev.meridiem,
            };
        });
    };

    //  TOGGLE MERIDIEM
    const toggleMeridiem = () => {
        setTime((prev) => ({
            ...prev,
            meridiem: prev.meridiem === 'AM' ? 'PM' : 'AM',
        }));
    };

    const renderBottomMessage = () => {
        // if (!min || !max) return null;
        const from = min && (convertTo12HourTime(min) as ITime);
        const to = max && convertTo12HourTime(max);

        // BETWEEN MIN AND MAX
        if (from && to) {
            return (
                <div className="text-xs font-medium mt-2">
                    Allowed from {from?.hour}:{String(from?.minute).padStart(2, '0')}{' '}
                    {from?.meridiem} to {to?.hour}:{String(to?.minute).padStart(2, '0')}{' '}
                    {to?.meridiem}
                </div>
            );
        } else if (from) {
            return (
                <div className="text-xs font-medium mt-2">
                    Allowed from {from?.hour}:{String(from?.minute).padStart(2, '0')}{' '}
                    {from?.meridiem}
                </div>
            );
        } else if (to) {
            return (
                <div className="text-xs font-medium mt-2">
                    Allowed till {to?.hour}:{String(to?.minute).padStart(2, '0')} {to?.meridiem}
                </div>
            );
        }

        return <div className="text-xs font-medium mt-2">Out of allowed range</div>;
    };

    // UPDATE VALUE
    useEffect(() => {
        const formatted = convertTo24HourFormat(`${time.hour}:${time.minute} ${time.meridiem}`);

        if ((min && formatted < min) || (max && formatted > max)) {
            setError(
                `Time must be between ${convertTo12HourFormat(min as string)} and ${convertTo12HourFormat(
                    max as string,
                )}`,
            );
            setDisplayValue('');
            onChange?.('');
        } else {
            const display = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')} ${time.meridiem}`;
            setError(null);
            setDisplayValue(display);
            onChange?.(formatted);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time.hour, time.minute, time.meridiem, min, max]);

    useEffect(() => {
        const formatted = convertTo24HourFormat(`${time.hour}:${time.minute} ${time.meridiem}`);

        if ((min && formatted < min) || (max && formatted > max)) {
            setError(
                `Time must be between ${convertTo12HourFormat(min as string)} and ${convertTo12HourFormat(
                    max as string,
                )}`,
            );
            setDisplayValue('');
            onChange?.('');
        } else {
            const display = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')} ${time.meridiem}`;
            setError(null);
            setDisplayValue(display);
            onChange?.(formatted); // Safe here
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time.hour, time.minute, time.meridiem, min, max]);

    //  RENDER
    return (
        <Fragment>
            {/* INPUT */}
            <button
                type="button"
                // ref={timeRef as RefObject<HTMLButtonElement>}
                // onClick={() => setShowPicker(true)}
                className="flex items-center gap-2 relative h-11"
            >
                <MdOutlineAccessTime size={24} className={`absolute left-2 text-gray-400`} />
                <input
                    type="text"
                    id={id}
                    name={name}
                    readOnly
                    onClick={() => setIsTimePickerOpen((prev) => !prev)}
                    value={displayValue}
                    placeholder={placeholder}
                    className="w-full h-full px-10 rounded-md border border-[#d9d9d9] placeholder:text-gray-400 focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />

                {/* Right-side Icon */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    {isLoading ? (
                        <FaSync className={'text-gray-500 animate-spin'} />
                    ) : (
                        <motion.svg
                            initial={false}
                            animate={{ scaleY: isTimePickerOpen ? -1 : 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 35 }}
                            className={`h-5 w-5 text-gray-500`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </motion.svg>
                    )}
                </div>
            </button>
            {/* error */}
            {error ? (
                <small className={`text-error font-medium`}>{error || errorMessage}</small>
            ) : null}

            {/* TIME PICKER */}
            {isTimePickerOpen && (
                <div
                    className={`w-2xs p-4 bg-base-300 rounded-md shadow-md drop-shadow-xs text-center border border-primary/20 flex flex-col gap-1.5 z-50 absolute ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}`}
                >
                    {/* HEADER */}
                    <div className="text-sm text-gray-600 font-medium">
                        {`${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(
                            2,
                            '0',
                        )}:${String(time.second).padStart(2, '0')} ${time.meridiem}`}
                    </div>
                    {/* CONTENT */}
                    <div className="flex flex-row items-center justify-center gap-1.5">
                        {/* HOURS */}
                        <div className="flex flex-col justify-center gap-1.5">
                            <button
                                type="button"
                                // data-auto={`hour-plus-${dataAuto}`}
                                onClick={() => increase('hour')}
                                className={`w-16 px-3 py-2 border bg-slate-100 text-slate-700 rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200 cursor-pointer`}
                            >
                                <FiPlus className="" />
                            </button>
                            <input
                                type="text"
                                readOnly
                                value={String(time.hour).padStart(2, '0')}
                                className={`w-16 px-3 py-1 border border-[#d9d9d9] text-center rounded-md bg-transparent outline-none`}
                            />
                            <button
                                type="button"
                                // data-auto={`minute-plus-${dataAuto}`}
                                onClick={() => decrease('hour')}
                                className={`w-16 px-3 py-2 bg-slate-100 text-slate-700 border rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200 cursor-pointer`}
                            >
                                <FiMinus className="" />
                            </button>
                        </div>
                        <strong className={`text-lg`}>:</strong>

                        {/* MINUTES */}
                        <div className="flex flex-col justify-center gap-1.5">
                            {/* {[FiPlus]} */}

                            <button
                                type="button"
                                // data-auto={`hour-plus-${dataAuto}`}
                                onClick={() => increase('minute')}
                                className={`w-16 px-3 py-2 border bg-slate-100 text-slate-700 rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200 cursor-pointer`}
                            >
                                <FiPlus />
                            </button>
                            <input
                                type="text"
                                readOnly
                                value={String(time.minute).padStart(2, '0')}
                                className={`w-16 px-3 py-1 border border-[#d9d9d9] text-center rounded-md bg-transparent outline-none cursor-pointer`}
                            />
                            <button
                                type="button"
                                // data-auto={`minute-plus-${dataAuto}`}
                                onClick={() => decrease('minute')}
                                className={`w-16 px-3 py-2 bg-slate-100 text-slate-700 border rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200 cursor-pointer`}
                            >
                                <FiMinus />
                            </button>
                        </div>
                        {/* AM/PM  */}
                        <div
                            // data-auto={`amPm-container-${dataAuto}`}
                            className="grid grid-cols-2 md:grid-cols-1 text-md gap-x-5 md:gap-y-2  w-full md:w-auto relative"
                        >
                            {['AM', 'PM'].map((meridiem) => (
                                <button
                                    key={meridiem}
                                    type="button"
                                    // data-auto={`am-${dataAuto}`}
                                    onClick={toggleMeridiem}
                                    className={`${
                                        time.meridiem === meridiem
                                            ? 'bg-primary text-base-300 hover:text-base-300 border-primary'
                                            : 'border-gray-300'
                                    } cursor-default w-full px-3 py-2 rounded-md  border-2`}
                                >
                                    {meridiem}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* BOTTOM MESSAGE */}
                    {/* <div className={`text-xs font-medium`}>Allowed from 10 AM to 5 PM</div> */}
                    {renderBottomMessage() || null}
                </div>
            )}
        </Fragment>
    );
}

export default TimePicker;
