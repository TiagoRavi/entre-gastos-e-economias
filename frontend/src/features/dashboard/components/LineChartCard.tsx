import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts"

interface ChartData {
  month: string
  income: number
  expense: number
}

interface Props {
  data: ChartData[]
}

const months = [
  "JAN","FEV","MAR","ABR",
  "MAI","JUN","JUL","AGO",
  "SET","OUT","NOV","DEZ"
]

export default function LineChartCard({ data }: Props) {

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  const formatMonth = (value: string) => {
    const m = Number(value.split("-")[1]) - 1
    return months[m] || value
  }

  if (!data || data.length === 0) {
    return (
      <div style={emptyCard}>
        Nenhum dado disponível
      </div>
    )
  }

  return (
    <div style={cardStyle}>

      <div style={header}>
        <div>
          <h3 style={title}>Receita vs Despesa</h3>
          <span style={subtitle}>
            Comparação mensal de entradas e saídas
          </span>
        </div>
      </div>

      <div style={{ width: "100%", height: 280 }}>

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              labelFormatter={(label) => formatMonth(String(label))}
              contentStyle={tooltipStyle}
            />

            <Legend
              wrapperStyle={{
                fontSize: "13px",
                marginTop: "10px"
              }}
            />

            <Line
              type="monotone"
              dataKey="income"
              name="Receitas"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              name="Despesas"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

const cardStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
  border: "1px solid rgba(15,23,42,0.06)"
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px"
}

const title = {
  fontSize: "16px",
  fontWeight: 700,
  margin: 0,
  color: "#0f172a"
}

const subtitle = {
  fontSize: "13px",
  color: "#64748b"
}

const tooltipStyle = {
  borderRadius: "10px",
  border: "none",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  fontSize: "13px"
}

const emptyCard = {
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
  height: 320,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748b",
  fontWeight: 500
}