import { useEffect, useState, useCallback, useMemo } from "react"
import { api } from "../api/client"
import Card from "../components/Card"
import LineChartCard from "../components/LineChartCard"
import PieChartCard from "../components/PieChartCard"
import MonthPickerCard from "../components/MonthPickerCard"
import AccountsDashboardCard from "../components/AccountsDashboardCard"
import TopExpensesCard from "../components/TopExpensesCard"



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
  const [categories, setCategories] = useState<any[]>([])
  

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }, [])

  const loadIndicators = useCallback(async () => {

    try {

      setLoading(true)

      const [balanceRes, monthlyRes, expenseRes, categoriesRes] = await Promise.all([
        api.get("/indicators/balance", { params: period }),
        api.get("/indicators/monthly-cashflow", { params: period }),
        api.get("/indicators/expenses-by-category", { params: period }),
        api.get("/categories")
      ])

      setBalance(balanceRes.data)

      const monthly: Cashflow[] = (monthlyRes.data || []).map((item: any) => ({
        month: item.month,
        income: Number(item.income || 0),
        expense: Number(item.expense || 0)
      }))

      setLineData(monthly)

      const pie: PieData[] = Object.entries(expenseRes.data || {}).map(
        ([categoryId, value]) => {

          const category = categoriesRes.data.find(
            (c: any) => c.id === Number(categoryId)
          )

          return {
            name: category?.name || "Categoria",
            value: Math.abs(Number(value || 0))
          }
        }
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
          title="Receitas"
          value={currencyFormatter.format(balance?.income ?? 0)}
        />

        <Card
          title="Despesas"
          value={currencyFormatter.format(balance?.expenses ?? 0)}
        />

        <Card
          title="Resultado"
          value={currencyFormatter.format(balance?.balance ?? 0)}
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
        <AccountsDashboardCard />

        <LineChartCard data={lineData} />

        <PieChartCard data={pieData} />
        <TopExpensesCard month={period.month || ""} />

      </div>

    </div>
  )
}