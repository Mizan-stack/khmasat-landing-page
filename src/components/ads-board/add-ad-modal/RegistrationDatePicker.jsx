import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaCalendarDays, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MotionDiv = motion.div

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function isSameDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
}

function isSameMonth(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth()
  )
}

function parseStoredDate(value) {
  if (!value) return null

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
    const [datePart] = value.split('T')
    const [year, month, day] = datePart.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const parsedDate = new Date(value)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

function toInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDisplayValue(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

function formatMonthLabel(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function buildCalendarDays(monthDate) {
  const firstDayOfMonth = startOfMonth(monthDate)
  const monthStartIndex = firstDayOfMonth.getDay()
  const gridStartDate = new Date(firstDayOfMonth)
  gridStartDate.setDate(firstDayOfMonth.getDate() - monthStartIndex)

  return Array.from({ length: 42 }, (_, index) => {
    const cellDate = new Date(gridStartDate)
    cellDate.setDate(gridStartDate.getDate() + index)
    return cellDate
  })
}

function CalendarMonth({ monthDate, draftDate, today, onSelectDate }) {
  const calendarDays = useMemo(() => buildCalendarDays(monthDate), [monthDate])

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--ads-calendar-weekday-text)]">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="py-1">
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((date) => {
          const disabled = date > today
          const outsideMonth = date.getMonth() !== monthDate.getMonth()
          const selected = isSameDay(date, draftDate)
          const isToday = isSameDay(date, today)

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(date)}
              className={`relative flex h-10 items-center justify-center rounded-2xl text-sm font-black transition-all ${
                selected
                  ? 'border-2 border-[var(--ads-calendar-selected-border)] text-[var(--ads-calendar-selected-text)] shadow-[0_10px_24px_-18px_rgba(34,211,238,0.56)] [background:var(--ads-calendar-selected-bg)]'
                  : disabled
                    ? 'cursor-not-allowed text-[var(--ads-calendar-disabled-text)]'
                    : outsideMonth
                      ? 'text-[var(--ads-calendar-outside-text)]'
                      : 'text-[var(--ads-calendar-day-text)] hover:bg-[var(--ads-calendar-day-hover-bg)]'
              }`}
            >
              <span>{date.getDate()}</span>
              {isToday && !selected ? (
                <span className="pointer-events-none absolute bottom-1.5 h-0.5 w-4 rounded-full bg-[var(--ads-calendar-today-dot)]" />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RegistrationDatePicker({ value, error, onChange, onBlur }) {
  const wrapperRef = useRef(null)
  const today = useMemo(() => startOfDay(new Date()), [])
  const selectedDate = useMemo(() => {
    const parsedDate = parseStoredDate(value)
    return parsedDate ? startOfDay(parsedDate) : null
  }, [value])

  const [open, setOpen] = useState(false)
  const [draftDate, setDraftDate] = useState(selectedDate ?? today)
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(selectedDate ?? today))

  useEffect(() => {
    if (!open) return undefined

    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false)
        onBlur?.()
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        onBlur?.()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onBlur])

  const canGoNext = !isSameMonth(visibleMonth, startOfMonth(today))

  function openPicker() {
    const nextDate = selectedDate ?? today
    setDraftDate(nextDate)
    setVisibleMonth(startOfMonth(nextDate))
    setOpen(true)
  }

  function applyDate() {
    onChange(toInputValue(draftDate))
    setOpen(false)
    onBlur?.()
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false)
            onBlur?.()
            return
          }
          openPicker()
        }}
        className={`flex h-14 w-full items-center justify-between rounded-2xl border px-4 text-right transition-all ${
          error
            ? 'border-red-500 bg-[var(--ads-surface-soft)] shadow-[0_0_0_1px_rgba(239,68,68,0.18)]'
            : 'border-[var(--ads-border-soft)] bg-[var(--ads-surface-soft)] hover:border-[var(--ads-dropdown-active-bg)]'
        }`}
      >
        <span className={`text-sm font-black ${selectedDate ? 'text-[var(--ads-text)]' : 'text-[var(--ads-muted)]'}`}>
          {selectedDate ? formatDisplayValue(selectedDate) : 'اختر تاريخ التسجيل'}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--ads-calendar-trigger-icon-border)] text-lg text-[var(--ads-text)] shadow-[0_12px_24px_-22px_rgba(15,23,42,0.7)] [background:var(--ads-calendar-trigger-icon-bg)]">
          <FaCalendarDays />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <MotionDiv
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 z-30 mt-3 w-full max-w-[22rem] overflow-hidden rounded-[1.8rem] border border-[var(--ads-border-soft)] p-4 shadow-[var(--ads-calendar-panel-shadow)] [background:var(--ads-calendar-panel-bg)]"
          >
            <div className="mb-4 rounded-2xl border border-[var(--ads-border-soft)] bg-[var(--ads-calendar-title-bg)] px-4 py-2 text-center">
              <span className="text-sm font-black uppercase tracking-[0.06em] text-[var(--ads-text)]">
                REGISTRATION DATE
              </span>
            </div>

            <div className="space-y-4 rounded-[1.6rem] border border-[var(--ads-border-soft)] p-4 [background:var(--ads-calendar-shell-bg)]">
              <div dir="ltr" className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleMonth((currentMonth) => addMonths(currentMonth, -1))}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] text-[var(--ads-text)] transition-all hover:-translate-x-0.5 hover:bg-[var(--ads-calendar-nav-hover)] [background:var(--ads-calendar-nav-bg)]"
                >
                  <FaChevronLeft />
                </button>

                <h4 className="text-xl font-black text-[var(--ads-calendar-month-text)]">{formatMonthLabel(visibleMonth)}</h4>

                <button
                  type="button"
                  disabled={!canGoNext}
                  onClick={() => setVisibleMonth((currentMonth) => addMonths(currentMonth, 1))}
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--ads-border-soft)] text-[var(--ads-text)] transition-all [background:var(--ads-calendar-nav-bg)] ${
                    canGoNext ? 'hover:translate-x-0.5 hover:bg-[var(--ads-calendar-nav-hover)]' : 'cursor-not-allowed opacity-40'
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>

              <CalendarMonth
                monthDate={visibleMonth}
                draftDate={draftDate}
                today={today}
                onSelectDate={(nextDate) => setDraftDate(startOfDay(nextDate))}
              />

              <div dir="ltr" className="flex justify-start">
                <button
                  type="button"
                  onClick={applyDate}
                  className="inline-flex h-12 items-center justify-center rounded-2xl px-6 text-base font-black text-[var(--ads-button-primary-text)] shadow-[var(--ads-calendar-apply-shadow)] [background:var(--ads-calendar-apply-bg)]"
                >
                  Apply
                </button>
              </div>
            </div>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default RegistrationDatePicker
