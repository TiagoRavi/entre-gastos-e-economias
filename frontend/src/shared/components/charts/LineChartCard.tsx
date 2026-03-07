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

  // fallback quando não houver dados
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        Nenhum dado disponível
      </div>
    )
  }

  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >

      <h3 style={{ marginBottom: "20px" }}>
        Receita vs Despesa
      </h3>

      <div style={{ width: "100%", height: 280 }}>

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >

            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => formatMonth(label)}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              name="Receitas"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              name="Despesas"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}