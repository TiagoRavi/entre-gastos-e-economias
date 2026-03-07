import { useCallback, useEffect, useState } from "react"
import { dashboardService } from "../services/dashboardService"
import type { Period } from "../types/dashboard.types"

interface IncomeItem {
  id?: number
  category?: string
  description?: string
  amount: number | string
}

export function useTopIncomes(period: Period) {
  const [incomes, setIncomes] = useState<IncomeItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadIncomes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await dashboardService.getTopIncomes(period)
      setIncomes(data ?? [])
    } catch (error) {
      console.error("Erro ao buscar maiores receitas:", error)
      setIncomes([])
    } finally {
      setLoading(false)
    }
  }, [period.month, period.start_month, period.end_month])

  useEffect(() => {
    loadIncomes()
  }, [loadIncomes])

  return {
    incomes,
    loading,
    reload: loadIncomes
  }
}