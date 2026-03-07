import { useEffect, useState } from "react"
import { api } from "../api/client"

interface Expense {
  category: string
  amount: number
}

export const useTopExpenses = (month: string) => {

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async () => {
    try {

      const response = await api.get(
        `/indicators/top-expenses?month=${month}`
      )

      setExpenses(response.data)

    } catch (error) {
      console.error("Erro ao buscar maiores despesas", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [month])

  return {
    expenses,
    loading
  }
}