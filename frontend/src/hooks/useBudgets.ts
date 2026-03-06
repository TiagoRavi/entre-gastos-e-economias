import { useEffect, useState } from "react"
import { api } from "../api/client"

type Budget = {
  category_id: number
  category_name: string
  monthly_limit: number
  spent: number
  remaining: number
  percentage: number
}

export function useBudgets() {

  const [budgets, setBudgets] = useState<Budget[]>([])

  const loadBudgets = async () => {

    const res = await api.get("/budgets/summary")
    setBudgets(res.data)

  }

  const createBudget = async (
    category_id: number,
    monthly_limit: number,
    month: number,
    year: number
  ) => {

    api.post("/budgets/", {
      category_id,
      monthly_limit,
      month,
      year
    })

    await loadBudgets()
  }

  const deleteBudget = async (id: number) => {

    await api.delete(`/budgets/${id}`)
    await loadBudgets()
  }

  useEffect(() => {
    loadBudgets()
  }, [])

  return {
    budgets,
    createBudget,
    deleteBudget
  }
}