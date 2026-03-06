import { useEffect, useState } from "react"
import { api } from "../api/client"

type Budget = {
  id: number
  category_id: number
  category_name: string
  monthly_limit: number
  created_at: string
}

type BudgetSummary = {
  category_id: number
  category_name: string
  monthly_limit: number
  spent: number
  remaining: number
  percentage: number
}

export function useBudgets() {

  const [budgets, setBudgets] = useState<Budget[]>([])
  const [summary, setSummary] = useState<BudgetSummary[]>([])

  const loadBudgets = async () => {

    const res = await api.get("/budgets/")
    setBudgets(res.data)

  }

  const loadSummary = async () => {

    const res = await api.get("/budgets/summary")
    setSummary(res.data)

  }

  const createBudget = async (
    category_id: number,
    monthly_limit: number,
    month: number,
    year: number
  ) => {

    await api.post("/budgets/", {
      category_id,
      monthly_limit,
      month,
      year
    })

    await loadBudgets()
    await loadSummary()
  }

  const deleteBudget = async (id: number) => {

    await api.delete(`/budgets/${id}`)

    await loadBudgets()
    await loadSummary()
  }

  useEffect(() => {

    loadBudgets()
    loadSummary()

  }, [])

  return {
    budgets,
    summary,
    createBudget,
    deleteBudget
  }
}