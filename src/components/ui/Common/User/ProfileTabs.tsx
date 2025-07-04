'use client';

import { useEffect, useRef, useState } from 'react';
import { AiOutlineProject } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { TbCalendarUser } from 'react-icons/tb';
import { GrSchedulePlay } from 'react-icons/gr';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProfileTabs({ setActiveTab }: any) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentTab = searchParams.get('tabs') || 'profile';

    const tabs = [
        {
            label: 'Profile',
            value: 'profile',
            show: true,
            Icon: CgProfile,
        },
        {
            label: 'Class Schedule',
            value: 'class-schedule',
            show: true,
            Icon: GrSchedulePlay,
        },
        {
            label: 'Guardian Information',
            value: 'guardian-information',
            show: true,
            Icon: HiOutlineDocumentText,
        },
        {
            label: 'Academic Report',
            value: 'academic-report',
            show: true,
            Icon: HiOutlineAcademicCap,
        },
        {
            label: 'Course Management',
            value: 'course-management',
            show: true,
            Icon: AiOutlineProject,
        },
        {
            label: 'Academic Result',
            value: 'academic-result',
            show: true,
            Icon: HiOutlineAcademicCap,
        },
        {
            label: 'Payments Details',
            value: 'payment-details',
            show: true,
            Icon: TbCalendarUser,
        },
    ];

    // HANDLE HORIZONTAL SCROLL (Mouse Drag and Wheel)
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Effect for Mouse Wheel horizontal scrolling
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Crucial: Prevents default vertical scroll of the browser
            if (scrollContainer) {
                scrollContainer.scrollLeft += e.deltaY; // Scrolls horizontally
            }
        };

        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel, {
                passive: false,
            });
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    // Mouse down event for initiating the drag
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scrollContainerRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
            scrollContainerRef.current.style.cursor = 'grabbing';
            scrollContainerRef.current.style.userSelect = 'none';
        }
    };

    // Mouse move event for dragging
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    // Mouse up or leave event for stopping the drag
    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
            scrollContainerRef.current.style.userSelect = 'auto';
        }
    };

    return (
        <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="inline-flex select-none items-center gap-x-2 cursor-grab overflow-x-auto overflow-y-hidden scroll-smooth w-full"
        >
            {/* LEFT NAVIGATE */}
            <button
                onClick={() => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollLeft -= 100;
                    }
                }}
                className={`sticky hover:text-primary cursor-pointer flex justify-start items-center bg-gradient-to-l from-transparent via-base-300 to-base-300 left-0 bottom-0 min-h-14 min-w-7 z-10`}
            >
                <FiChevronLeft className={`text-xl`} />
            </button>

            {tabs
                ?.filter((t) => t?.show)
                ?.map((singleTab) => (
                    <button
                        key={singleTab.value}
                        className={`${
                            currentTab === singleTab?.value
                                ? 'bg-gradient-to-tl to-primary shadow-md from-primary/70 text-base-300'
                                : ''
                        } font-semibold rounded-xl border border-[#eee] text-sm px-3 cursor-pointer text-center h-12 gap-2 flex items-center justify-center shrink-0`}
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            console.log({ params });
                            params.set('tabs', singleTab?.value);
                            router.push(`?${params.toString()}`);
                            setActiveTab(singleTab?.value);
                        }}
                    >
                        <singleTab.Icon className="text-xl drop-shadow" />{' '}
                        <span className={`drop-shadow`}>{singleTab?.label}</span>
                    </button>
                ))}

            {/* RIGHT NAVIGATE */}
            <button
                onClick={() => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollLeft += 100;
                    }
                }}
                className={`sticky flex cursor-pointer hover:text-primary justify-end items-center bg-gradient-to-r from-transparent via-base-300 to-base-300 right-0 bottom-0 min-h-14 min-w-7 z-10`}
            >
                <FiChevronRight className={`text-xl`} />
            </button>
        </div>
    );
}
