import { useEffect, useState } from "react"
import { api } from "../../../api/client"

interface TopExpense {
  category: string
  amount: number
}

export const useTopExpenses = (month: string) => {
  const [expenses, setExpenses] = useState<TopExpense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopExpenses = async () => {
      try {
        setLoading(true)

        const response = await api.get("/indicators/top-expenses", {
          params: { month },
        })

        setExpenses(response.data || [])
      } catch (error) {
        console.error("Erro ao carregar maiores despesas", error)
        setExpenses([])
      } finally {
        setLoading(false)
      }
    }

    if (month) {
      fetchTopExpenses()
    } else {
      setExpenses([])
      setLoading(false)
    }
  }, [month])

  return {
    expenses,
    loading,
  }
}