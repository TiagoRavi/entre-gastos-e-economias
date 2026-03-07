import { useEffect, useState } from "react"
import { api } from "../../../api/client"

interface IncomeItem {
  id?: number
  category?: string
  description?: string
  amount: number | string
}

export function useTopIncomes(month: string) {
  const [incomes, setIncomes] = useState<IncomeItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopIncomes() {
      try {
        setLoading(true)

        const response = await api.get("/indicators/top-incomes", {
          params: { month }
        })

        setIncomes(response.data ?? [])
      } catch (error) {
        console.error("Erro ao buscar maiores receitas:", error)
        setIncomes([])
      } finally {
        setLoading(false)
      }
    }

    if (month) {
      fetchTopIncomes()
    }
  }, [month])

  return { incomes, loading }
}