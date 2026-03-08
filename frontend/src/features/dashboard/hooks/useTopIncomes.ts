import { useCallback, useEffect, useState } from "react"
import { dashboardService } from "../services/dashboardService"
import type { Period, TopItem } from "../types/dashboard.types"

type Scope = "monthly" | "accumulated"

export function useTopIncomes(
  period: Period,
  scope: Scope = "monthly"
) {
  const [incomes, setIncomes] = useState<TopItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadIncomes = useCallback(async () => {
    try {
      setLoading(true)

      const data = await dashboardService.getTopIncomes(period)

      const items = Array.isArray(data?.[scope])
        ? data[scope]
        : []

      setIncomes(items)
    } catch (error) {
      console.error("Erro ao buscar maiores receitas:", error)
      setIncomes([])
    } finally {
      setLoading(false)
    }
  }, [period.month, period.start_month, period.end_month, scope])

  useEffect(() => {
    loadIncomes()
  }, [loadIncomes])

  return {
    incomes,
    loading,
    reload: loadIncomes
  }
}