import { useEffect, useState } from "react"
import { api } from "../../api/client"

interface Transaction {
  id: number
  description: string
  amount: number
  category_id: number
  account_id: number
  created_at: string
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions")
      setTransactions(response.data)
    } catch (error) {
      console.error("Erro ao buscar transações", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    refresh: fetchTransactions,
  }
}