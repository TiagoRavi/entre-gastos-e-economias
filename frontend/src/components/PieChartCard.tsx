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
  "#14b8a6",
  "#8b5cf6",
  "#06b6d4"
]

export default function PieChartCard({ data }: Props) {

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  // ordena categorias por valor
  const sortedData = [...data].sort((a, b) => b.value - a.value)

  // caso não existam dados
  if (!sortedData || sortedData.length === 0) {
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
        Nenhuma despesa registrada
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
        Despesas por categoria
      </h3>

      <div style={{ width: "100%", height: 280 }}>

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={sortedData}
              dataKey="value"
              nameKey="name"
              outerRadius={95}
              innerRadius={60}
              paddingAngle={3}
              label={({ percent }) =>
                percent > 0.05
                  ? `${(percent * 100).toFixed(0)}%`
                  : ""
              }
            >

              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ marginTop: 10 }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}