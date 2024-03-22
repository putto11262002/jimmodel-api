import { isLastColumn, isLastRow } from "../../pages/calendar/utils";
import { cn } from "../../lib/utils";
import dayjs from "dayjs";
import { useLayoutEffect, useRef } from "react";
import { Skeleton } from "../ui/skeleton";
import utc from "dayjs/plugin/utc";
import CalendarCell from "./cell";
import { CellDialogProvider } from "./cell-dialog";
import { useCalendar } from "./context";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

dayjs.extend(utc);

export default function CalendarComp() {
  const calendarBoxRef = useRef<HTMLDivElement | null>(null);
  const now = dayjs();

 const {dates} = useCalendar()

  // Calculate height of each date cell
  useLayoutEffect(() => {
    const updateCellHeight = () => {
      if (calendarBoxRef.current) {
        const cellHeight =
          calendarBoxRef.current.clientHeight / Math.ceil(dates.length / 7);
        const dateCells = calendarBoxRef.current.querySelectorAll<HTMLElement>(
          ".calendar-date-cell"
        );
        dateCells.forEach((cell) => {
          cell.style.height = `${cellHeight}px`;
        });
      }
    };

    updateCellHeight();
    window.addEventListener("resize", updateCellHeight);
    return () => window.removeEventListener("resize", updateCellHeight);
  }, [dates]);

  
  return (
    <CellDialogProvider>
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-7">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className={cn(
              "text-center text-sm font-medium pt-1",
              !isLastColumn(i) ? "border-r" : ""
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div ref={calendarBoxRef} className={cn("grid grid-cols-7 grow")}>
        {(dates === undefined || dates.length < 1) 
          ? Array(35)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-full p-1">
                  <Skeleton className="h-full" />
                </div>
              ))
          : dates.map((calendarDate, index) => (
              <div
                key={index}
                className={cn(
                  "h-full p-1",
                  !isLastRow(index, dates.length) ? "border-b" : "",
                  !isLastColumn(index) ? "border-r" : "",
                  "calendar-date-cell",
                  "overflow-hidden"
                )}
              >
                <CalendarCell
                  date={calendarDate.date}
                  now={now}
                  // events={calendar.events}
                />
              </div>
            ))}
      </div>
    </div>
    </CellDialogProvider>
  );
}