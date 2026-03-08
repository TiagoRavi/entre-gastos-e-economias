import { useCallback, useEffect, useMemo, useState } from "react"
import { dashboardService } from "../services/dashboardService"
import { mapCashflow, mapCategoryPieData } from "../utils/dashboardMappers"
import type {
  Cashflow,
  Period,
  PieData,
  SummaryData,
} from "../types/dashboard.types"

const getCurrentMonth = () => new Date().toISOString().slice(0, 7)

export const useDashboard = () => {
  const [period, setPeriodState] = useState<Period>({
    month: getCurrentMonth()
  })

  const [balance, setBalance] = useState<SummaryData | null>(null)
  const [lineData, setLineData] = useState<Cashflow[]>([])
  const [pieData, setPieData] = useState<PieData[]>([])
  const [loading, setLoading] = useState(true)

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }, [])

  const setPeriod = useCallback((nextPeriod: Period) => {
    setPeriodState(nextPeriod)
  }, [])

  const loadIndicators = useCallback(async () => {
    try {
      setLoading(true)

      const [
        balanceData,
        monthlyData,
        expensesData
      ] = await Promise.all([
        dashboardService.getBalance(period),
        dashboardService.getMonthlyCashflow(period),
        dashboardService.getExpensesByCategory(period),
      ])

      setBalance(balanceData?.monthly ?? null)
      setLineData(mapCashflow(monthlyData, "monthly"))
      setPieData(mapCategoryPieData(expensesData, "monthly"))
    } catch (error) {
      console.error("Erro ao carregar indicadores", error)
    } finally {
      setLoading(false)
    }
  }, [period])

  useEffect(() => {
    loadIndicators()
  }, [loadIndicators])

  return {
    period,
    setPeriod,
    balance,
    lineData,
    pieData,
    loading,
    currencyFormatter,
    reload: loadIndicators
  }
}