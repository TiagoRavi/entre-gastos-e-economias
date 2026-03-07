import type { Cashflow, Category, PieData } from "../types/dashboard.types"

export const mapCashflow = (data: any[]): Cashflow[] => {
  return (data || []).map((item: any) => ({
    month: item.month,
    income: Number(item.income || 0),
    expense: Number(item.expense || 0),
  }))
}

export const mapPieData = (
  expenseData: Record<string, unknown>,
  categories: Category[]
): PieData[] => {
  return Object.entries(expenseData || {}).map(([categoryId, value]) => {
    const category = categories.find((c) => c.id === Number(categoryId))

    return {
      name: category?.name || "Categoria",
      value: Math.abs(Number(value || 0)),
    }
  })
}