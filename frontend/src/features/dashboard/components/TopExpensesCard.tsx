import { useTopExpenses } from "../hooks/useTopExpenses"
import type { Period } from "../types/dashboard.types"

interface ExpenseItem {
  id?: number
  amount?: number
  total?: number
  category?: string
  category_name?: string
  description?: string
}

interface Props {
  period: Period
  scope?: "monthly" | "accumulated"
}

export default function TopExpensesCard({
  period,
  scope = "monthly"
}: Props) {
  const { expenses, loading } = useTopExpenses(period, scope)

  const safeExpenses: ExpenseItem[] = Array.isArray(expenses) ? expenses : []

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  if (loading) {
    return <div className="card">Carregando maiores despesas...</div>
  }

  const total = safeExpenses.reduce(
    (acc, expense) => acc + Number(expense.amount ?? expense.total ?? 0),
    0
  )

  return (
    <div className="card">
      <div style={header}>
        <h3 style={title}>
          {scope === "accumulated" ? "Maiores despesas acumuladas" : "Maiores despesas"}
        </h3>
        <span style={badge}>{safeExpenses.length}</span>
      </div>

      <div style={list}>
        {safeExpenses.length === 0 && (
          <div style={emptyState}>Nenhuma despesa encontrada</div>
        )}

        {safeExpenses.map((expense, index) => (
          <div key={expense.id ?? index} style={row}>
            <div style={leftContent}>
              <span style={expenseName}>
                {expense.category_name || expense.category || expense.description || "Despesa"}
              </span>
            </div>

            <strong style={amount}>
              {formatCurrency(Number(expense.amount ?? expense.total ?? 0))}
            </strong>
          </div>
        ))}
      </div>

      {safeExpenses.length > 0 && (
        <div style={footer}>
          <span style={footerLabel}>Total listado</span>
          <span style={footerValue}>{formatCurrency(total)}</span>
        </div>
      )}
    </div>
  )
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px"
}

const title = {
  fontSize: "16px",
  fontWeight: 700,
  color: "#0f172a",
  margin: 0
}

const badge = {
  fontSize: "12px",
  padding: "4px 8px",
  borderRadius: "999px",
  background: "#fef2f2",
  color: "#dc2626",
  fontWeight: 700
}

const list = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px"
}

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #f1f5f9"
}

const leftContent = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0
}

const expenseName = {
  color: "#334155",
  fontWeight: 600,
  fontSize: "14px"
}

const amount = {
  color: "#ef4444",
  fontWeight: 700,
  fontSize: "14px"
}

const emptyState = {
  padding: "8px 0",
  color: "#94a3b8",
  fontSize: "14px"
}

const footer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "14px",
  paddingTop: "12px",
  borderTop: "1px solid #e2e8f0"
}

const footerLabel = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#64748b"
}

const footerValue = {
  fontSize: "14px",
  fontWeight: 800,
  color: "#dc2626"
}