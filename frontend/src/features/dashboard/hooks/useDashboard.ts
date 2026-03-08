import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { dashboardService } from "../services/dashboardService"
import { mapCashflow, mapCategoryPieData } from "../utils/dashboardMappers"
import type {
  Cashflow,
  Period,
  PieData,
  SummaryData,
} from "../types/dashboard.types"

const getCurrentMonth = () => new Date().toISOString().slice(0, 7)

type Scope = "monthly" | "accumulated"

export const useDashboard = () => {
  const [period, setPeriodState] = useState<Period>({
    month: getCurrentMonth()
  })

  const [scope, setScope] = useState<Scope>("monthly")
  const [balance, setBalance] = useState<SummaryData | null>(null)
  const [accumulatedBalance, setAccumulatedBalance] = useState<SummaryData | null>(null)
  const [lineData, setLineData] = useState<Cashflow[]>([])
  const [pieData, setPieData] = useState<PieData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const isFirstLoad = useRef(true)

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
      if (isFirstLoad.current) {
        setLoading(true)
      } else {
        setRefreshing(true)
      }

      const [
        balanceData,
        cashflowData,
        expensesData,
      ] = await Promise.all([
        dashboardService.getBalance(period),
        dashboardService.getMonthlyCashflow(period),
        dashboardService.getExpensesByCategory(period),
      ])

      setBalance(balanceData?.[scope] ?? null)
      setAccumulatedBalance(balanceData?.accumulated ?? null)
      setLineData(mapCashflow(cashflowData, scope))
      setPieData(mapCategoryPieData(expensesData, scope))
    } catch (error) {
      console.error("Erro ao carregar indicadores", error)
    } finally {
      if (isFirstLoad.current) {
        setLoading(false)
        isFirstLoad.current = false
      } else {
        setRefreshing(false)
      }
    }
  }, [period, scope])

  useEffect(() => {
    loadIndicators()
  }, [loadIndicators])

  return {
    period,
    setPeriod,
    scope,
    setScope,
    balance,
    accumulatedBalance,
    lineData,
    pieData,
    loading,
    refreshing,
    currencyFormatter,
    reload: loadIndicators
  }
}