import { SemesterRegistrationStatus } from "@/enums/global";

export type IBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type IGender = "male" | "female";
export type IDesignation =
  | "Lecturer"
  | "Assistant Lecturer"
  | "Assistant Professor"
  | "Associate Professor"
  | "Professor"
  | "Senior Professor";

export type ISemesterRegistrationStatus =
  | SemesterRegistrationStatus.UPCOMING
  | SemesterRegistrationStatus.ONGOING
  | SemesterRegistrationStatus.ENDED;
