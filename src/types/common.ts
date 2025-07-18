export interface IMeta {
    page: number;
    limit: number;
    skip: number;
    total: number;
    paginationTotal: number;
    totalPages: number;
}

export type ResponseSuccessType = {
    data: any;
    meta?: IMeta;
};

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string;
    message: string;
};

export interface IDepartment {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Name {
    firstName: string;
    lastName: string;
    middleName: string;
}

export interface IManagementDepartment {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IUser {
    _id: string;
    id: string;
    role: string;
    needsChangePassword: boolean;
    faculty: IFaculty;
    student: IStudent;
    admin: IAdmin;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IAdmin {
    id: string;
    name: Name;
    gender: string;
    managementDepartment: IManagementDepartment;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    dateOfBirth: string;
    bloodGroup: string;
    designation: string;
    presentAddress: string;
    permanentAddress: string;
    profileImage: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IFaculty {
    id: string;
    name: Name;
    gender: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    dateOfBirth: string;
    bloodGroup: string;
    academicFaculty: IAcademicFaculty;
    academicDepartment: IAcademicDepartment;
    designation: string;
    presentAddress: string;
    permanentAddress: string;
    profileImage: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface IStudent {
    id: string;
    name: Name & { id: string };
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian & { id: string };
    localGuardian: LocalGuardian & { id: string };
    department: string;
    profileImage: string;
    academicDepartment: IAcademicDepartment;
    academicSemester: IAcademicSemester;
    academicFaculty: IAcademicFaculty;
    subject: string;
    createdAt: string;
    updatedAt: string;
}

export interface Guardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
}
export interface LocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export interface IAcademicFaculty {
    id: string;
    syncId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IAcademicDepartment {
    id: string;
    syncId: string;
    title: string;
    academicFaculty: IAcademicFaculty;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IAcademicSemester {
    id: string;
    syncId: string;
    title: string;
    year: number;
    code: string;
    startMonth: string;
    endMonth: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IBuilding {
    id: string;
    title: string;
    rooms: IRoom[];
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
}

export interface IRoom {
    id: string;
    roomNumber: string;
    floor: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    buildingId: string;
    building: IBuilding;
}

export interface ICourse {
    id: string;
    title: string;
    code: string;
    credits: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    prerequisites?: null[] | null;
    prerequisiteFor?: null[] | null;
}

export interface IAcademicCoreSemester {
    id: string;
    syncId?: null;
    title: string;
    code: string;
    year: number;
    isCurrent?: boolean;
    startMonth: string;
    endMonth: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
}
export interface ISemesterRegistration {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    maxCredit: number;
    minCredit: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    academicSemesterId: string;
    academicSemester?: IAcademicCoreSemester;
}

export interface IAcademicCoreDepartment {
    id: string;
    syncId?: null;
    title: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    academicFacultyId: string;
    academicFaculty?: IAcademicFaculty;
    offeredCourses: IOfferedCourse[];
}

export interface IOfferedCourse {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    courseId: string;
    semesterRegistrationId: string;
    academicDepartmentId: string;
    semesterRegistration: ISemesterRegistration;
    course: ICourse;
    academicDepartment: IAcademicCoreDepartment;
}

export interface IAcademicCoreFaculty {
    id: string;
    facultyId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    profileImage: string;
    email: string;
    contactNo: string;
    gender: string;
    bloodGroup: string;
    designation: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    academicDepartmentId: string;
    academicFacultyId: string;
}

export interface IOfferedCourseSchedule {
    id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    offeredCourseSectionId: string;
    roomId: string;
    facultyId: string;
    offeredCourseSection: IOfferedCourseSection;
    faculty: IAcademicCoreFaculty;
    room: IRoom;
}

export interface IOfferedCourseSection {
    id: string;
    title: string;
    maxCapacity: number;
    currentEnrolledStudent: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    offeredCourseId: string;
    offeredCourse: IOfferedCourse;
    offeredCourseClassSchedules?: IOfferedCourseSchedule[] | null;
    semesterRegistrationId: string;
    semesterRegistration: ISemesterRegistration;
    isTaken?: boolean;
}

export interface ICoreFaculty {
    id: string;
    facultyId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    profileImage: string;
    email: string;
    contactNo: string;
    gender: string;
    bloodGroup: string;
    designation: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    academicDepartmentId: string;
    academicFacultyId: string;
    academicFaculty: IAcademicFaculty;
    academicDepartment: IAcademicCoreDepartment;
}

export interface IMyCourse {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    studentId: string;
    courseId: string;
    academicSemesterId: string;
    grade?: null;
    point: number;
    totalMarks: number;
    status: string;
    course: ICourse;
}

export interface IFacultyCourse {
    course: ICourse;
    sections?: SectionsEntity[] | null;
}

export interface SectionsEntity {
    section: IOfferedCourseSection;
    classSchedules?: IOfferedCourseSchedule[] | null;
}

export interface IStudentEnrolledCourseMark {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    studentId: string;
    studentEnrolledCourseId: string;
    academicSemesterId: string;
    grade?: null;
    marks: number;
    examType: string;
    academicSemester: IAcademicCoreSemester;
    student: ICoreStudent;
    studentEnrolledCourse: IStudentEnrolledCourse;
}
export interface ICoreStudent {
    id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    profileImage: string;
    email: string;
    contactNo: string;
    gender: string;
    bloodGroup: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    academicSemesterId: string;
    academicDepartmentId: string;
    academicFacultyId: string;
    academicFaculty: IAcademicCoreFaculty;
    academicDepartment: IAcademicCoreDepartment;
    academicSemester: IAcademicCoreSemester;
}

export interface IStudentEnrolledCourse {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    studentId: string;
    courseId: string;
    academicSemesterId: string;
    grade?: null;
    point: number;
    totalMarks: number;
    status: string;
    academicSemester: IAcademicCoreSemester;
    student: ICoreStudent;
    course: ICourse;
}

export interface IStudentClassSchedule {
    studentId: string;
    student: IStudent;
    semesterRegistrationId: string;
    semesterRegistration: ISemesterRegistration;
    offeredCourseId: string;
    offeredCourse: IOfferedCourse;
    offeredCourseSectionId: string;
    offeredCourseSection: IOfferedCourseSection;
    createdAt: string;
    updatedAt: string;
}

export interface IClassSchedule {
    id: string;
    startTime: string;
    endTime: string;
    dayOfWeek: string;
    roomId: string;
    room: IRoom;
    offeredCourseSectionId: string;
    offeredCourseSection: IOfferedCourseSection;
    semesterRegistrationId: string;
    semesterRegistration: ISemesterRegistration;
    facultyId: string;
    faculty: IAcademicCoreFaculty;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
}
