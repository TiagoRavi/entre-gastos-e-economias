import { useEffect, useState } from "react"
import { api } from "../api/client"
import Card from "../components/Card"
import LineChartCard from "../components/LineChartCard"
import PieChartCard from "../components/PieChartCard"

interface Balance {
  income: number
  expenses: number
  balance: number
}

export default function Dashboard() {

  const [balance, setBalance] = useState<Balance | null>(null)
  const [lineData, setLineData] = useState<any[]>([])
  const [pieData, setPieData] = useState<any[]>([])

  useEffect(() => {

  const loadIndicators = async () => {

  try {

    const [balanceRes, monthlyRes, expenseRes] = await Promise.all([
      api.get("/indicators/balance"),
      api.get("/indicators/monthly-cashflow"),
      api.get("/indicators/expenses-by-category")
    ])

    setBalance(balanceRes.data)
    setLineData(monthlyRes.data)

    const pie = Object.entries(expenseRes.data).map(([name, value]) => ({
      name,
      value
    }))

    setPieData(pie)

  } catch (error) {
    console.error("Erro ao carregar indicadores", error)
  }

}

  loadIndicators()

}, [])

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  if (!balance) {
    return <div style={{ padding: "40px" }}>Carregando indicadores...</div>
  }

  return (
    <div>

      <h1 style={{ marginBottom: "25px" }}>
        Dashboard
      </h1>

      {/* Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >

        <Card
          title="Saldo"
          value={formatCurrency(balance.balance)}
        />

        <Card
          title="Receitas"
          value={formatCurrency(balance.income)}
        />

        <Card
          title="Despesas"
          value={formatCurrency(balance.expenses)}
        />

      </div>

      {/* Gráficos */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >

        <LineChartCard data={lineData} />

        <PieChartCard data={pieData} />

      </div>

    </div>
  )
}