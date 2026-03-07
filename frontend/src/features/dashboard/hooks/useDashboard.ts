import { useCallback, useEffect, useMemo, useState } from "react"
import { dashboardService } from "../services/dashboardService"
import { mapCashflow, mapPieData } from "../utils/dashboardMappers"
import type {
  Balance,
  Cashflow,
  Period,
  PieData,
} from "../types/dashboard.types"

export const useDashboard = () => {

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

      const [
        balanceData,
        monthlyData,
        expensesData,
        categoriesData
      ] = await Promise.all([
        dashboardService.getBalance(period),
        dashboardService.getMonthlyCashflow(period),
        dashboardService.getExpensesByCategory(period),
        dashboardService.getCategories()
      ])

      setBalance(balanceData)
      setLineData(mapCashflow(monthlyData))
      setPieData(mapPieData(expensesData, categoriesData))

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