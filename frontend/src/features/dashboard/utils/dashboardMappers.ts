import type {
  Cashflow,
  Category,
  PieData,
  ScopedResponse,
  PieCategoryData,
} from "../types/dashboard.types"

export const mapCashflow = (
  data: ScopedResponse<Cashflow[]> | Cashflow[] | undefined,
  scope: "monthly" | "accumulated" = "monthly"
): Cashflow[] => {
  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.[scope])
      ? data[scope]
      : []

  return items.map((item) => ({
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

export const mapCategoryPieData = (
  data: ScopedResponse<PieCategoryData> | PieCategoryData | undefined,
  scope: "monthly" | "accumulated" = "monthly"
): PieData[] => {
  const source =
    data && "monthly" in data
      ? data[scope]
      : data

  const items = Array.isArray(source?.items) ? source.items : []

  return items.map((item) => ({
    name: item.category_name,
    value: Number(item.total || 0),
  }))
}