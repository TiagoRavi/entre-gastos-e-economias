import { useState } from "react"
import type { Period } from "../types/dashboard.types"

interface Props {
  value: Period
  scope: "monthly" | "accumulated"
  onScopeChange: (scope: "monthly" | "accumulated") => void
  onChange: (period: Period) => void
}

const months = [
  "JAN", "FEV", "MAR", "ABR",
  "MAI", "JUN", "JUL", "AGO",
  "SET", "OUT", "NOV", "DEZ"
]

export default function MonthPickerCard({
  value,
  scope,
  onScopeChange,
  onChange
}: Props) {
  const now = new Date()

  const initialYear =
    value?.month
      ? Number(value.month.split("-")[0])
      : value?.start_month
      ? Number(value.start_month.split("-")[0])
      : now.getFullYear()

  const [year, setYear] = useState(initialYear)
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState<string | null>(null)
  const [end, setEnd] = useState<string | null>(null)

  const mode = scope === "monthly" ? "month" : "range"

  const selectMonth = (index: number) => {
    const m = String(index + 1).padStart(2, "0")

    if (mode === "month") {
      onChange({
        month: `${year}-${m}`
      })

      setOpen(false)
      setStart(null)
      setEnd(null)
      return
    }

    if (!start) {
      setStart(m)
      return
    }

    let startMonth = start
    let endMonth = m

    if (Number(endMonth) < Number(startMonth)) {
      const temp = startMonth
      startMonth = endMonth
      endMonth = temp
    }

    setEnd(endMonth)

    onChange({
      start_month: `${year}-${startMonth}`,
      end_month: `${year}-${endMonth}`
    })

    setStart(null)
    setEnd(null)
    setOpen(false)
  }

  const currentMonth = value?.month?.split("-")[1]
  const currentStartMonth = value?.start_month?.split("-")[1]
  const currentEndMonth = value?.end_month?.split("-")[1]

  const label =
    value?.start_month && value?.end_month
      ? `${months[Number(value.start_month.split("-")[1]) - 1]} → ${months[Number(value.end_month.split("-")[1]) - 1]} / ${value.start_month.split("-")[0]}`
      : value?.month
      ? `${months[Number(value.month.split("-")[1]) - 1]} / ${value.month.split("-")[0]}`
      : `${months[now.getMonth()]} / ${year}`

  return (
    <div style={wrapper}>
      <button
        onClick={() => setOpen(!open)}
        style={triggerButton}
      >
        <span style={triggerLabel}>Período</span>
        <span style={triggerValue}>{label}</span>
        <span style={triggerIcon}>{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div style={dropdown}>
          <div style={tabsWrapper}>
            <button
              type="button"
              onClick={() => {
                onScopeChange("monthly")
                setStart(null)
                setEnd(null)
              }}
              style={mode === "month" ? activeTab : tab}
            >
              Mês
            </button>

            <button
              type="button"
              onClick={() => {
                onScopeChange("accumulated")
                setStart(null)
                setEnd(null)
              }}
              style={mode === "range" ? activeTab : tab}
            >
              Acumulado
            </button>
          </div>

          <div style={yearHeader}>
            <button type="button" onClick={() => setYear(year - 1)} style={navBtn}>
              ←
            </button>

            <button type="button" onClick={() => setYear(year + 1)} style={navBtn}>
              →
            </button>
          </div>

          <div style={helperText}>
            {mode === "month"
              ? "Selecione um mês"
              : start
              ? "Selecione o mês final"
              : "Selecione o mês inicial"}
          </div>

          <div style={monthsGrid}>
            {months.map((m, i) => {
              const month = String(i + 1).padStart(2, "0")

              const singleSelected =
                mode === "month" &&
                currentMonth === month &&
                value?.month?.startsWith(String(year))

              const rangeSelected =
                mode === "range" &&
                currentStartMonth &&
                currentEndMonth &&
                value?.start_month?.startsWith(String(year)) &&
                value?.end_month?.startsWith(String(year)) &&
                Number(month) >= Number(currentStartMonth) &&
                Number(month) <= Number(currentEndMonth)

              const tempSelected =
                mode === "range" &&
                start === month

              const selected = singleSelected || rangeSelected || tempSelected

              return (
                <button
                  type="button"
                  key={m}
                  onClick={() => selectMonth(i)}
                  style={{
                    ...monthButton,
                    ...(selected ? selectedMonthButton : {})
                  }}
                >
                  {m}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const wrapper = {
  position: "relative" as const
}

const triggerButton = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(255,255,255,0.82)",
  border: "1px solid rgba(15,23,42,0.08)",
  borderRadius: "14px",
  padding: "10px 14px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
  backdropFilter: "blur(10px)"
}

const triggerLabel = {
  fontSize: "12px",
  color: "#64748b",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.6px"
}

const triggerValue = {
  fontSize: "14px",
  color: "#0f172a",
  fontWeight: 700
}

const triggerIcon = {
  fontSize: "12px",
  color: "#64748b"
}

const dropdown = {
  position: "absolute" as const,
  top: "56px",
  right: 0,
  background: "rgba(255,255,255,0.95)",
  padding: "18px",
  borderRadius: "18px",
  border: "1px solid rgba(15,23,42,0.08)",
  width: "340px",
  boxShadow: "0 20px 50px rgba(15,23,42,0.14)",
  zIndex: 20,
  backdropFilter: "blur(16px)"
}

const tabsWrapper = {
  display: "flex",
  gap: "10px",
  marginBottom: "16px",
  background: "#f8fafc",
  padding: "4px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0"
}

const tab = {
  flex: 1,
  padding: "9px 12px",
  border: "none",
  background: "transparent",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 700,
  color: "#475569",
  fontSize: "13px"
}

const activeTab = {
  ...tab,
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#fff",
  boxShadow: "0 8px 18px rgba(37,99,235,0.25)"
}

const yearHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px"
}

const yearLabel = {
  fontSize: "16px",
  color: "#0f172a"
}

const helperText = {
  fontSize: "12px",
  color: "#64748b",
  marginBottom: "14px",
  fontWeight: 500
}

const navBtn = {
  width: "34px",
  height: "34px",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  background: "#f8fafc",
  cursor: "pointer",
  fontWeight: 700,
  color: "#0f172a"
}

const monthsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px"
}

const monthButton = {
  padding: "12px 8px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#0f172a",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "12px",
  transition: "all 0.2s ease"
}

const selectedMonthButton = {
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#fff",
  border: "1px solid rgba(37,99,235,0.35)",
  boxShadow: "0 10px 18px rgba(37,99,235,0.22)"
}