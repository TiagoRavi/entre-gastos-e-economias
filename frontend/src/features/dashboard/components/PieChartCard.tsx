import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface ExpenseCategoryData {
  category?: string
  name?: string
  amount?: number | string
  value?: number | string
  total?: number | string
}

interface Props {
  data: ExpenseCategoryData[]
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899"
]

export default function ExpensesByCategoryChartCard({ data }: Props) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  const toNumber = (value: unknown) => {
    if (typeof value === "number") return value
    if (typeof value !== "string") return 0

    const cleaned = value
      .trim()
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".")

    const parsed = Number(cleaned)
    return Number.isNaN(parsed) ? 0 : parsed
  }

  const normalizedData = (data || []).map((item) => ({
    category: item.category || item.name || "Sem categoria",
    amount: toNumber(item.amount ?? item.value ?? item.total)
  }))

  const validData = normalizedData.filter((item) => item.amount > 0)

  const totalAmount = validData.reduce((acc, item) => acc + item.amount, 0)

  if (!validData.length) {
    return (
      <div style={emptyCardStyle}>
        Nenhuma despesa por categoria encontrada
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <h3 style={titleStyle}>Despesas por categoria</h3>
          <p style={subtitleStyle}>
            Distribuição dos gastos no período
          </p>
        </div>

        <div style={totalBadge}>
          {formatCurrency(totalAmount)}
        </div>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={validData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="46%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              labelLine={false}
              label={({ percent }) =>
                (percent ?? 0) > 0.04
                  ? `${((percent ?? 0) * 100).toFixed(0)}%`
                  : ""
              }
            >
              {validData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null

                const item = payload[0]
                const name = String(item.name ?? "")
                const value = Number(item.value ?? 0)
                const percent = totalAmount > 0
                  ? (value / totalAmount) * 100
                  : 0

                return (
                  <div style={customTooltip}>
                    <div style={tooltipTitle}>{name}</div>
                    <div style={tooltipValue}>{formatCurrency(value)}</div>
                    <div style={tooltipPercent}>
                      {percent.toFixed(1)}% do total
                    </div>
                  </div>
                )
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value) => value}
              wrapperStyle={{
                fontSize: "13px",
                paddingTop: "8px"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const cardStyle = {
  background: "rgba(255,255,255,0.9)",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid rgba(15,23,42,0.06)",
  boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
  backdropFilter: "blur(10px)"
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start" as const,
  gap: "16px",
  marginBottom: "16px"
}

const titleStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 700,
  color: "#0f172a"
}

const subtitleStyle = {
  margin: "6px 0 0 0",
  fontSize: "13px",
  color: "#64748b"
}

const totalBadge = {
  padding: "8px 12px",
  borderRadius: "12px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  fontSize: "13px",
  fontWeight: 700,
  color: "#0f172a",
  whiteSpace: "nowrap" as const
}

const customTooltip = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
  padding: "10px 12px"
}

const tooltipTitle = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: "4px"
}

const tooltipValue = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#ef4444",
  marginBottom: "2px"
}

const tooltipPercent = {
  fontSize: "12px",
  color: "#64748b",
  fontWeight: 600
}

const emptyCardStyle = {
  background: "rgba(255,255,255,0.9)",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid rgba(15,23,42,0.06)",
  boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
  height: 320,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748b",
  fontWeight: 500
}