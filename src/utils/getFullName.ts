export const getFullName = (name: {
  firstName: string;
  middleName?: string;
  lastName: string;
}) => {
  return `${name?.firstName} ${name?.middleName ? name?.middleName : ""} ${
    name?.lastName
  }`;
};
