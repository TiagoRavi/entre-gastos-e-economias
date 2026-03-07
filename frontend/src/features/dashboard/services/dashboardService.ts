import { api } from "../../../api/client"
import type { Period } from "../types/dashboard.types"

export const dashboardService = {
  async getBalance(params: Period) {
    const response = await api.get("/indicators/balance", { params })
    return response.data
  },

  async getMonthlyCashflow(params: Period) {
    const response = await api.get("/indicators/monthly-cashflow", { params })
    return response.data
  },

  async getExpensesByCategory(params: Period) {
    const response = await api.get("/indicators/expenses-by-category", { params })
    return response.data
  },

  async getCategories() {
    const response = await api.get("/categories")
    return response.data
  },
}