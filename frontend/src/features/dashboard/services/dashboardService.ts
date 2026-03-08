import { api } from "../../../api/client"
import type { Period } from "../types/dashboard.types"

const buildPeriodParams = (period: Period) => {
  if (period.start_month && period.end_month) {
    return {
      start_month: period.start_month,
      end_month: period.end_month
    }
  }

  if (period.month) {
    return { month: period.month }
  }

  return {}
}

export const dashboardService = {
  async getBalance(period: Period) {
    const response = await api.get("/indicators/balance", {
      params: buildPeriodParams(period)
    })
    return response.data
  },

  async getMonthlyCashflow(period: Period) {
    const response = await api.get("/indicators/monthly-cashflow", {
      params: buildPeriodParams(period)
    })
    return response.data
  },

  async getExpensesByCategory(period: Period) {
    const response = await api.get("/indicators/expenses-by-category", {
      params: buildPeriodParams(period)
    })
    return response.data
  },

  async getIncomeByCategory(period: Period) {
    const response = await api.get("/indicators/income-by-category", {
      params: buildPeriodParams(period)
    })
    return response.data
  },

  async getTopExpenses(period: Period) {
    const response = await api.get("/indicators/top-expenses", {
      params: buildPeriodParams(period)
    })
    return response.data
  },

  async getTopIncomes(period: Period) {
    const response = await api.get("/indicators/top-incomes", {
      params: buildPeriodParams(period)
    })
    return response.data
  },

  async getCategories() {
    const response = await api.get("/categories")
    return response.data
  },
}