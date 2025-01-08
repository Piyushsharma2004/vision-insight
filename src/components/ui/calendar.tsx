import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DayPickerProps } from "react-day-picker"
import { cn } from "@/lib/utils"

// Extend the DayPicker props to include our custom styling
export type CalendarProps = DayPickerProps & {
  showOutsideDays?: boolean
  className?: string
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 select-none rounded-xl bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center px-8",
        caption_label: "text-sm font-semibold text-gray-900 dark:text-gray-100",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "inline-flex items-center justify-center rounded-md p-1.5",
          "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
          "border border-gray-200 dark:border-gray-600",
          "hover:bg-gray-50 dark:hover:bg-gray-700",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
          "transition-colors duration-200"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-gray-500 dark:text-gray-400",
          "rounded-md w-9 font-medium text-[0.8rem]",
          "flex items-center justify-center h-9"
        ),
        row: "flex w-full mt-2 gap-1",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal",
          "flex items-center justify-center rounded-md",
          "transition-colors duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
          "aria-selected:opacity-100"
        ),
        day_selected: cn(
          "bg-blue-500 text-white hover:bg-blue-600",
          "dark:bg-blue-600 dark:hover:bg-blue-700",
          "font-semibold"
        ),
        day_today: cn(
          "bg-gray-100 text-gray-900 font-semibold",
          "dark:bg-gray-700 dark:text-gray-100"
        ),
        day_outside: "text-gray-400 opacity-50 dark:text-gray-500",
        day_disabled: "text-gray-400 opacity-50 dark:text-gray-500 hover:bg-transparent",
        day_range_middle: cn(
          "aria-selected:bg-gray-100 dark:aria-selected:bg-gray-700",
          "aria-selected:text-gray-900 dark:aria-selected:text-gray-100"
        ),
        day_range_start: "aria-selected:bg-blue-500 aria-selected:text-white",
        day_range_end: "aria-selected:bg-blue-500 aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 transition-transform duration-200 hover:scale-110" />
        ),
        ...components,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }