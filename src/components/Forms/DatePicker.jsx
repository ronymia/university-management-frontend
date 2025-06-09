import Cleave from "cleave.js/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const generateYears = ({ startOfYear, endOfYear, length }) => {
  return Array.from({ length }, (_, index) => startOfYear + index);
};

const generateWeekDays = ({ startOfWeekDay = 0 }) => {
  const weekdays = moment.weekdays();
  const weekdaysShort = moment.weekdaysShort();

  const reorderedDays = [
    ...weekdays.slice(startOfWeekDay),
    ...weekdays.slice(0, startOfWeekDay)
  ];

  return reorderedDays.map((day, index) => {
    const originalIndex = weekdays.indexOf(day);
    return {
      id: index,
      label: day,
      value: originalIndex,
      shortName: weekdaysShort[originalIndex]
    };
  });
};

export default function DatePicker({
  id,
  name,
  label,
  value,
  placeholder,
  required = false,
  disabled = false,
  readOnly = true,
  error,
  offDays = [],
  offDayClassName,
  specialDates = [],
  disabledDates = [],
  disableBeforeDate,
  disableAfterDate,
  fieldClassName,
  visibleBorder = false,
  onChange,
  wrapperClassName,
  dataAuto,
  right,
  top = false,
  small,
  startOfYear,
  startOfWeekDay = 0,
  formatDate = "DD-MM-YYYY",
  pick = "day" // month, year, day
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [currentYear, setCurrentYear] = useState(
    startOfYear && moment(startOfYear, "DD-MM-YYYY", true).isValid()
      ? moment(startOfYear, "DD-MM-YYYY").year()
      : moment().year()
  );

  // GENERATE YEAR ARRAY FOR CALENDER
  const [allYears, setAllYears] = useState(
    generateYears({ startOfYear: currentYear - (currentYear % 12), length: 12 })
  );
  const [renderComponent, setRenderComponent] = useState(pick);
  const [invalidDateError, setInvalidDateError] = useState(null);
  const calendarRef = useRef(null);

  // SET DEFAULT DATE
  useEffect(() => {
    // Validate the default date
    if (value) {
      // Validate the default date
      const parsedDefaultDate = moment(value, formatDate, true);
      if (!parsedDefaultDate.isValid()) {
        setInvalidDateError("Please enter a valid date");
        return;
      } else if (
        parsedDefaultDate.isValid() &&
        !!disableBeforeDate &&
        parsedDefaultDate.isSameOrBefore(disableBeforeDate, formatDate)
      ) {
        setInvalidDateError(
          `Please enter a date after ${moment(
            disableBeforeDate,
            formatDate
          ).format(formatDate)}`
        );
        return;
      } else if (
        parsedDefaultDate.isValid() &&
        !!disableAfterDate &&
        parsedDefaultDate.isSameOrAfter(disableAfterDate, formatDate)
      ) {
        setInvalidDateError(
          `Please enter a date before ${moment(
            disableAfterDate,
            formatDate
          ).format(formatDate)}`
        );
        return;
      } else if (
        parsedDefaultDate.isValid() &&
        !!disabledDates.some((disabledDate) =>
          parsedDefaultDate.isSame(moment(disabledDate, formatDate), "day")
        )
      ) {
        setInvalidDateError(
          `Please enter a date before ${moment(
            disableAfterDate,
            formatDate
          ).format(formatDate)}`
        );
        return;
      } else {
        setSelectedDate(parsedDefaultDate.format(formatDate));
        setCurrentMonth(moment(parsedDefaultDate, formatDate));
        setCurrentYear(moment(parsedDefaultDate, formatDate).year());
      }
    }

    // Validate the error
    if (error) {
      setInvalidDateError(error);
    }
  }, [error, value]);

  // SET CURRENT MONTH
  useEffect(() => {
    setCurrentMonth((prevMonth) => {
      const newMonth = moment([currentYear, prevMonth.month(), 1]);
      return newMonth;
    });
  }, [currentYear]);

  // OUT SIDE CLICK HANDLER
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        event.target &&
        !calendarRef.current.contains(event.target)
      ) {
        setCalendarVisible(false);
      }
    };
    if (calendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarVisible]);

  // SELECT DATE
  const handleDateClick = (day) => {
    const now = moment(); // current time

    const combined = day
      .clone()
      .hour(now.hour())
      .minute(now.minute())
      .second(now.second())
      .millisecond(now.millisecond());

    // const formattedDateTime = combined.toISOString(); // or .format("YYYY-MM-DD HH:mm:ss") for SQL

    setSelectedDate(day.format(formatDate));
    setCalendarVisible(false);
    onChange?.(day.format(formatDate));
  };

  const goToPreviousMonth = () => {
    const newMonth = currentMonth.clone().subtract(1, "month");
    setCurrentMonth(newMonth);
  };

  const goToNextMonth = () => {
    const newMonth = currentMonth.clone().add(1, "month");
    setCurrentMonth(newMonth);
  };

  const goToPreviousYearSet = () => {
    const startYear = allYears[0] - 12;
    setAllYears(Array.from({ length: 12 }, (_, index) => startYear + index));
  };

  const goToNextYearSet = () => {
    const startYear = allYears[allYears.length - 1] + 1;
    setAllYears(Array.from({ length: 12 }, (_, index) => startYear + index));
  };

  // GENERATE YEARS FOR CALENDER

  // GENERATE MONTHS FOR CALENDER
  const renderCalendarMonths = () => {
    return Array.from({ length: 12 }, (_, i) =>
      moment().month(i).format("MMMM")
    );
  };
  // RENDER WEEKDAYS
  const renderWeekDays = () => {
    return generateWeekDays({ startOfWeekDay: startOfWeekDay }).map(
      (weekDay, index) => (
        <div
          key={`weekDay-${index}`}
          className="w-10 text-center py-2 font-bold"
        >
          {weekDay?.shortName}
        </div>
      )
    );
  };
  const renderCalendarDays = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");
    const daysInMonth = [];
    let currentDay = startOfMonth.clone();

    while (currentDay.isSameOrBefore(endOfMonth, "day")) {
      daysInMonth.push(currentDay);
      currentDay = currentDay.clone().add(1, "day");
    }

    const today = moment();

    // This gives how many empty boxes to insert at the beginning
    const emptyDivs = (startOfMonth.day() - startOfWeekDay + 7) % 7;

    return (
      <>
        {/* Render empty divs for alignment */}
        {Array.from({ length: emptyDivs }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-10 h-10 bg-transparent"
          ></div>
        ))}

        {/* Render days of the month */}
        {daysInMonth.map((day) => {
          const isOffDay = offDays.includes(day.day());
          const isSelected = day.isSame(
            moment(selectedDate, formatDate),
            "day"
          );

          const isToday = day.isSame(today, "day");
          const isDisabledBefore =
            disableBeforeDate &&
            day.isBefore(moment(disableBeforeDate, formatDate));
          const isDisabledAfter =
            disableAfterDate &&
            day.isAfter(moment(disableAfterDate, formatDate));
          const isDisabled = disabledDates.some((disabledDate) =>
            day.isSame(moment(disabledDate, formatDate), "day")
          );
          const isSpecialDate = specialDates.some((specialDate) =>
            day.isSame(moment(specialDate, formatDate), "day")
          );
          const isDisabledInDateRange =
            isDisabled && (isDisabledBefore || isDisabledAfter);
          const isSpecialDateInDateRange =
            isSpecialDate && (isDisabledBefore || isDisabledAfter);

          let buttonClass = "w-10 h-10 rounded-md ";
          if (isSelected) {
            buttonClass += " bg-primary text-base-300 border-primary";
          } else if (isToday) {
            buttonClass += " bg-blue-100";
          } else if (isDisabledInDateRange) {
            buttonClass +=
              " bg-yellow-300 cursor-not-allowed border-yellow-300";
          } else if (isSpecialDateInDateRange) {
            buttonClass += " bg-green-500 text-white border-green-500";
          } else if (isDisabled && !isDisabledBefore && !isDisabledAfter) {
            buttonClass +=
              " bg-yellow-300 cursor-not-allowed border-yellow-300";
          } else if (isDisabledBefore || isDisabledAfter) {
            buttonClass +=
              " border border-solid border-gray bg-gray opacity-20";
          } else if (isSpecialDate) {
            buttonClass += " bg-green-500 text-white border-green-500";
          } else if (isOffDay) {
            buttonClass += offDayClassName;
          }
          // else if (isToday) {
          //   buttonClass += " bg-blue-100";
          // }
          else {
            buttonClass +=
              " bg-gray-500 bg-opacity-40 border-gray-500 border-opacity-40 hover:border-primary hover:bg-primary-content ";
          }
          if (isDisabled && (isDisabledBefore || isDisabledAfter)) {
            buttonClass += " disabled-before-after";
          }

          return (
            <button
              type="button"
              data-auto={`days`}
              title={`${isOffDay ? "College Off Day" : ""}`}
              key={day.format("x")}
              onClick={() => handleDateClick(day)}
              className={` ${buttonClass} ${
                small ? "h-7 w-7" : "md:h-10 md:w-10 h-7 w-7"
              }`}
              disabled={isDisabled || !!isDisabledBefore || !!isDisabledAfter}
            >
              {day.format("D")}
            </button>
          );
        })}
      </>
    );
  };

  // MONTH AND YEAR
  const renderMonthAndYear = () => {
    return (
      <div
        data-auto={`month_year_component`}
        className="inline-flex items-center justify-center gap-x-2 w-full font-semibold text-lg"
      >
        {/* MONTH */}
        <button
          type="button"
          data-auto={`select_month`}
          onClick={() => setRenderComponent("month")} // SHOW MONTH COMPONENT
        >
          {currentMonth.format("MMMM")}
        </button>
        {/* YEAR */}
        <button
          type="button"
          data-auto={`select_year`}
          onClick={() => setRenderComponent("year")} // SHOW YEAR COMPONENT
        >
          {currentMonth.format("YYYY")}
        </button>
      </div>
    );
  };

  const handleMonthClick = (index) => {
    setCurrentMonth(currentMonth.clone().month(index));
    setRenderComponent("day");
  };

  const handleYearClick = (year) => {
    setCurrentYear(year);
    if (pick === "year") {
      onChange?.(year);
      setCalendarVisible(false);
      return;
    }
    setRenderComponent("day");
  };

  return (
    <div
      ref={calendarRef}
      data-auto={`${dataAuto}-date_picker_wrapper`}
      className={`relative flex flex-col justify-start gap-y-2 w-full ${wrapperClassName}`}
    >
      {/* LABEL */}
      {label && (
        <label
          htmlFor={id}
          data-auto={`${dataAuto}-date_picker_label`}
          className="label-text text-md font-bold"
        >
          {label}{" "}
          {!disabled && required && (
            <span className="text-error font-bold text-md">*</span>
          )}
        </label>
      )}

      {/* INPUT FIELD */}
      <div className="relative">
        <DateInputCleave
          pickedValue={selectedDate}
          onChange={(dateValue) => {
            if (moment(dateValue, formatDate).isValid()) {
              setSelectedDate(dateValue);
              onChange?.(dateValue);
            }
          }}
          className={`w-full bg-base-300 rounded-md border border-solid px-3 py-2 placeholder:text-sm placeholder:capitalize focus:outline-none
          ${fieldClassName}
          ${
            disabled
              ? `${
                  visibleBorder && "disabled:border-base-200 border-opacity-10"
                }`
              : ""
          }
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-600 focus:border-primary"
            }
          `}
        />
        {/* <input
          data-auto={dataAuto}
          type="text"
          id={id}
          name={name}
          value={
            selectedDate
              ? moment(selectedDate, formatDate).format(formatDate)
              : ""
          }
          placeholder={placeholder || "Select Date"}
          onClick={() => !disabled && setCalendarVisible(!calendarVisible)}
          readOnly={readOnly}
          // className="w-96 h-11 border border-solid border-gray-300 rounded px-2 py-1"
          className={`w-full bg-base-300  rounded-md  border border-solid border-[#C5C5C5] px-3 py-2 placeholder:text-sm placeholder:capitalize focus:outline-none
          ${fieldClassName}
          ${
            disabled
              ? `${
                  visibleBorder && "disabled:border-gray-200 border-opacity-10"
                }`
              : ""
          }
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
            }
          `}
          // disabled={disabled}
        /> */}
        <button
          type="button"
          disabled={calendarVisible}
          className={`absolute text-3xl right-2.5  bottom-1/2 translate-y-1/2 ${
            selectedDate ? "-top-10" : "top-0"
          } `}
        >
          {selectedDate ? (
            <BiReset
              data-tip="reset"
              data-auto={`${dataAuto}-date_picker_reset`}
              className={`tooltip tooltip-bottom  text-xl text-primary `}
              onClick={(event) => {
                event.preventDefault();
                if (!disabled) {
                  setSelectedDate(null);
                  onChange?.("");
                }
              }}
            />
          ) : (
            <FaRegCalendarAlt
              className="text-primary text-xl"
              onClick={() => !disabled && setCalendarVisible(!calendarVisible)}
            />
          )}
        </button>
      </div>

      {/* RENDER CALENDER */}
      {calendarVisible && (
        <div
          data-auto={`date_picker`}
          className={`w-[350px] absolute bg-base-100 shadow-xl border p-5 rounded-md z-[1000]
                    ${right ? "right-0" : "left-0"}
                    ${top ? "top-auto bottom-full mb-2" : "top-full mt-2"}
                    ${
                      small
                        ? "md:w-[250px] px-3 py-3"
                        : "md:w-[350px] px-3 md:px-5 md:py-5"
                    }
  `}
        >
          {/* DATE SELECT */}
          {renderComponent === "day" && (
            <section data-auto={`date_component`}>
              {/* MONTH AND YEAR NAME */}
              <header className="flex justify-between">
                {/* PREVIOUS BUTTON */}
                <button
                  type="button"
                  data-auto={`prev_month`}
                  onClick={goToPreviousMonth}
                >
                  {" "}
                  <FaAngleLeft size={24} />{" "}
                </button>
                {/* SHOW MONTH AND YEAR */}
                {renderMonthAndYear()}
                {/* NEXT BUTTON */}
                <button
                  type="button"
                  data-auto={`next_month`}
                  onClick={goToNextMonth}
                >
                  {" "}
                  <FaAngleRight size={24} />
                </button>
              </header>

              {/* RENDER WEEKS AND DAYS */}
              <section
                data-auto={`${dataAuto}-calender_days`}
                className="grid grid-cols-7 mt-4 gap-1"
              >
                {renderWeekDays()}
                {renderCalendarDays()}
              </section>
            </section>
          )}

          {/* MONTH SELECT COMPONENT */}
          {renderComponent === "month" && (
            <section data-auto={`month_component`}>
              {/* TITLE */}
              <header className="flex items-center justify-center">
                <h3
                  className={`text-center mb-2 text-primary text-lg font-medium`}
                >
                  Select Month
                </h3>
              </header>
              {/* MONTH LIST */}
              <section
                data-auto={`month_list`}
                className="grid grid-cols-3 gap-1 mt-4"
              >
                {renderCalendarMonths().map((month, index) => (
                  <button
                    key={index}
                    type="button"
                    data-auto={`${dataAuto}-month`}
                    onClick={() => handleMonthClick(index)}
                    className={`btn ${
                      currentMonth.month() === index
                        ? "bg-primary text-white"
                        : "border border-solid border-gray bg-primary-content opacity-60 hover:bg-primary hover:opacity-90 hover:text-white"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </section>
            </section>
          )}

          {/* YEAR COMPONENT */}
          {renderComponent === "year" && (
            <section data-auto={`year_component`}>
              {/* HEADER */}
              <header className="flex justify-between">
                {/* PREVIOUS YEARS BUTTON */}
                <button
                  type="button"
                  data-auto={`prev_year`}
                  onClick={goToPreviousYearSet}
                >
                  {" "}
                  <FaAngleLeft size={24} />
                </button>
                {/*  */}
                <span>{`${allYears[0]} - ${allYears[allYears.length - 1]}`}</span>
                {/* NEXT YEARS BUTTON */}
                <button
                  type="button"
                  data-auto={`next_year`}
                  onClick={goToNextYearSet}
                >
                  <FaAngleRight size={24} />
                </button>
              </header>

              {/* YEAR LIST */}
              <section
                data-auto={`year_list`}
                className="grid grid-cols-3 mt-4"
              >
                {allYears.map((year, index) => {
                  const yearMoment = moment(year, "YYYY");
                  const isSelected = moment(currentYear, "YYYY").isSame(
                    yearMoment
                  );
                  return (
                    <button
                      key={index}
                      type="button"
                      data-auto={`${dataAuto}-year`}
                      onClick={() => handleYearClick(year)}
                      className={`btn ${
                        isSelected
                          ? "bg-primary text-white"
                          : "border border-solid border-gray bg-primary-content opacity-60 hover:bg-primary hover:opacity-90 hover:text-white"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </section>
            </section>
          )}
        </div>
      )}
      {invalidDateError && (
        <p
          data-auto={`${dataAuto}-date_picker_error_message`}
          id={`${id}-error`} // ID to link with input field's aria-describedby
          role="alert"
          aria-label="error message"
          aria-live="assertive" // Ensures screen readers announce the message immediately
          aria-atomic="true" // Ensures the whole message is read out
          className="text-xs text-red-500 pt-1"
        >
          {invalidDateError}
        </p>
      )}
    </div>
  );
}

function DateInputCleave({ onChange, pickedValue, className }) {
  const handleChange = (e) => {
    const val = e.target.value;

    // Validate date format with moment
    const isValid = moment(val, "DD-MM-YYYY", true).isValid();

    if (isValid) {
      onChange?.(val);
    } else {
      onChange?.(null);
    }
  };

  return (
    <Cleave
      options={{
        date: true,
        delimiter: "-",
        datePattern: ["d", "m", "Y"]
      }}
      placeholder="DD-MM-YYYY"
      value={pickedValue || ""}
      onChange={handleChange}
      className={className}
      inputMode="numeric"
    />
  );
}
