import { IPopupOptions } from '@/types';
import { useState } from 'react';

export default function usePopupOptions() {
    const [popupOptions, setPopupOptions] = useState<IPopupOptions>({
        open: false,
        closeOnDocumentClick: true,
        actionType: 'create',
        form: '',
        data: null,
        title: '',
    });

    const togglePopup = () => {
        setPopupOptions((o) => ({ ...o, open: !o.open }));
    };

    const handleAddNewDepartment = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'department',
            title: 'Create Department',
        }));
    };
    const handleAddNewAdmin = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'admin',
            title: 'Create Admin',
        }));
    };
    const handleAddNewFaculty = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'faculty',
            title: 'Create Faculty',
        }));
    };
    const handleAddNewAcademicDepartment = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'academic_department',
            title: 'Create Academic Department',
        }));
    };
    const handleAddNewAcademicFaculty = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'academic_faculty',
            title: 'Create Academic Faculty',
        }));
    };
    const handleAddNewAcademicSemester = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'academic_semester',
            title: 'Create Academic Semester',
        }));
    };
    const handleAddNewBuilding = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'building',
            title: 'Create Building',
        }));
    };
    const handleAddNewRoom = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'room',
            title: 'Create Room',
        }));
    };
    const handleAddNewCourse = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'course',
            title: 'Create Course',
        }));
    };
    const handleAddNewOfferedCourse = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'offered_course',
            title: 'Create Offered Course',
        }));
    };
    const handleAddNewSemesterRegistration = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'semester_registration',
            title: 'Create Semester Registration',
        }));
    };
    const handleAddNewOfferedCourseSection = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'offered_course_section',
            title: 'Offered Course Section',
        }));
    };

    // CREATE NEW STUDENT
    const handleAddNewStudent = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'student',
            title: 'Create Student',
        }));
    };

    // ASSIGN COURSE INTO FACULTY
    const handleAssignCourseIntoFaculty = () => {
        setPopupOptions((prev) => ({
            ...prev,
            open: true,
            actionType: 'create',
            form: 'student',
            title: 'Assign Course into Faculty',
        }));
    };

    //
    return {
        popupOptions,
        setPopupOptions,
        togglePopup,
        handleAddNewDepartment,
        handleAddNewAdmin,
        handleAddNewFaculty,
        handleAddNewAcademicDepartment,
        handleAddNewAcademicFaculty,
        handleAddNewAcademicSemester,
        handleAddNewBuilding,
        handleAddNewRoom,
        handleAddNewCourse,
        handleAddNewOfferedCourse,
        handleAddNewSemesterRegistration,
        handleAddNewOfferedCourseSection,
        handleAddNewStudent,
        handleAssignCourseIntoFaculty,
    };
}
