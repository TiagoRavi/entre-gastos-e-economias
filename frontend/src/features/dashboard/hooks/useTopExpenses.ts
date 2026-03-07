import { useCallback, useEffect, useState } from "react"
import { dashboardService } from "../services/dashboardService"
import type { Period } from "../types/dashboard.types"

export function useTopExpenses(period: Period) {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true)
      const data = await dashboardService.getTopExpenses(period)
      setExpenses(data)
    } catch (error) {
      console.error("Erro ao carregar maiores despesas", error)
    } finally {
      setLoading(false)
    }
  }, [period.month, period.start_month, period.end_month])

  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  return {
    expenses,
    loading,
    reload: loadExpenses
  }
}