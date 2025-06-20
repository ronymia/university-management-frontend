import moment from "moment";

export const generateYears = ({
  startOfYear,
  length,
}: {
  startOfYear: number;
  endOfYear?: number;
  length: number;
}) => {
  return Array.from({ length }, (_, index) => startOfYear + index);
};

export const generateWeekDays = ({
  startOfWeekDay = 0,
}: {
  startOfWeekDay?: number;
}) => {
  const weekdays = moment.weekdays();
  const weekdaysShort = moment.weekdaysShort();

  const reorderedDays = [
    ...weekdays.slice(startOfWeekDay),
    ...weekdays.slice(0, startOfWeekDay),
  ];

  return reorderedDays.map((day, index) => {
    const originalIndex = weekdays.indexOf(day);
    return {
      id: index,
      label: day,
      value: originalIndex,
      shortName: weekdaysShort[originalIndex],
    };
  });
};
