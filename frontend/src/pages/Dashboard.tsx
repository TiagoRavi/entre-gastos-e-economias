import { useEffect, useState, useCallback, useMemo } from "react"
import { api } from "../api/client"
import Card from "../components/Card"
import LineChartCard from "../components/LineChartCard"
import PieChartCard from "../components/PieChartCard"
import MonthPickerCard from "../components/MonthPickerCard"

interface Balance {
  income: number
  expenses: number
  balance: number
}

interface Cashflow {
  month: string
  income: number
  expense: number
}

interface PieData {
  name: string
  value: number
}

interface Period {
  month?: string
  start_month?: string
  end_month?: string
}

export default function Dashboard() {

  // PERÍODO (mês ou intervalo)
  const [period, setPeriod] = useState<Period>({
    month: new Date().toISOString().slice(0, 7)
  })

  const [balance, setBalance] = useState<Balance | null>(null)
  const [lineData, setLineData] = useState<Cashflow[]>([])
  const [pieData, setPieData] = useState<PieData[]>([])
  const [loading, setLoading] = useState(true)

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }, [])

  const loadIndicators = useCallback(async () => {

    try {

      setLoading(true)

      const [balanceRes, monthlyRes, expenseRes] = await Promise.all([
        api.get("/indicators/balance", { params: period }),
        api.get("/indicators/monthly-cashflow", { params: period }),
        api.get("/indicators/expenses-by-category", { params: period })
      ])

      setBalance(balanceRes.data)

      const monthly: Cashflow[] = (monthlyRes.data || []).map((item: any) => ({
        month: item.month,
        income: Number(item.income || 0),
        expense: Number(item.expense || 0)
      }))

      setLineData(monthly)

      const pie: PieData[] = Object.entries(expenseRes.data || {}).map(
        ([name, value]) => ({
          name,
          value: Math.abs(Number(value || 0))
        })
      )

      setPieData(pie)

    } catch (error) {

      console.error("Erro ao carregar indicadores", error)

    } finally {

      setLoading(false)

    }

  }, [period])

  useEffect(() => {
    loadIndicators()
  }, [loadIndicators])

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        Carregando dashboard...
      </div>
    )
  }

  return (
    <div>

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <h1>Dashboard</h1>

        <MonthPickerCard
          value={period}
          onChange={setPeriod}
        />

      </div>

      {/* CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <Card
          title="Saldo"
          value={currencyFormatter.format(balance?.balance ?? 0)}
        />

        <Card
          title="Receitas"
          value={currencyFormatter.format(balance?.income ?? 0)}
        />

        <Card
          title="Despesas"
          value={currencyFormatter.format(balance?.expenses ?? 0)}
        />

      </div>

      {/* GRÁFICOS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "20px"
        }}
      >

        <LineChartCard data={lineData} />

        <PieChartCard data={pieData} />

      </div>

    </div>
  )
}