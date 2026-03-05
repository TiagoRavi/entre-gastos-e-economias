import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface CategoryExpense {
  name: string
  value: number
}

interface Props {
  data: CategoryExpense[]
}

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#14b8a6"
]

export default function PieChartCard({ data }: Props) {

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  const renderLabel = ({ percent }: any) =>
    `${(percent * 100).toFixed(0)}%`

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        height: "300px"
      }}
    >

      <h3 style={{ marginBottom: "10px" }}>
        Despesas por categoria
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={renderLabel}
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
          />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  )
}