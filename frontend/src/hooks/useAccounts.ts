import { useEffect, useState } from "react"
import { api } from "../api/client"

interface Account {
  id: number
  name: string
  type: string
  initial_balance: number
  balance: number
}

export const useAccounts = () => {

  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAccounts = async () => {

    try {

      const response = await api.get("/accounts/")

      setAccounts(response.data)

    } catch (error) {

      console.error("Erro ao buscar contas", error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  return {
    accounts,
    loading,
    refresh: fetchAccounts,
  }

}