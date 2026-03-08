import { useCallback, useEffect, useState } from "react"
import { dashboardService } from "../services/dashboardService"
import type { Period, TopItem } from "../types/dashboard.types"
import { isValidTopItem, type DashboardTopItem } from "../utils/topItemsFilter"

type Scope = "monthly" | "accumulated"

export function useTopExpenses(
  period: Period,
  scope: Scope = "monthly"
) {
  const [expenses, setExpenses] = useState<TopItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true)

      const data = await dashboardService.getTopExpenses(period)
      const rawItems: DashboardTopItem[] = Array.isArray(data?.[scope]) ? data[scope] : []
      const filteredItems = rawItems.filter(isValidTopItem)

      setExpenses(filteredItems)
    } catch (error) {
      console.error("Erro ao carregar maiores despesas", error)
      setExpenses([])
    } finally {
      setLoading(false)
    }
  }, [period.month, period.start_month, period.end_month, scope])

  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  return {
    expenses,
    loading,
    reload: loadExpenses
  }
}