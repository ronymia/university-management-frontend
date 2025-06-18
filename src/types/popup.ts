type IAction_TYPE = "create" | "update" | "delete" | "view";

type IForm_NAME =
  | "academic_semester"
  | "academic_faculty"
  | "academic_department"
  | "building"
  | "room"
  | "course"
  | "semester_registration"
  | "offered_course";

export interface IPopupOptions {
  open: boolean;
  closeOnDocumentClick?: boolean;
  actionType: IAction_TYPE;
  form: IForm_NAME;
  data?: any;
  title: string;
  deleteHandler?: () => void;
}
