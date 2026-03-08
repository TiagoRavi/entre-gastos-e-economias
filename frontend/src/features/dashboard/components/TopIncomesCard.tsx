import { useTopIncomes } from "../hooks/useTopIncomes"
import type { Period } from "../types/dashboard.types"

interface IncomeItem {
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

export default function TopIncomesCard({
  period,
  scope = "monthly"
}: Props) {
  const { incomes, loading } = useTopIncomes(period, scope)

  const safeIncomes: IncomeItem[] = Array.isArray(incomes) ? incomes : []

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  if (loading) {
    return (
      <div className="card">
        Carregando maiores receitas...
      </div>
    )
  }

  const total = safeIncomes.reduce(
    (acc, income) => acc + Number(income.amount ?? income.total ?? 0),
    0
  )

  return (
    <div className="card">
      <div style={header}>
        <h3 style={title}>
          {scope === "accumulated"
            ? "Maiores receitas acumuladas"
            : "Maiores receitas"}
        </h3>

        <span style={badge}>{safeIncomes.length}</span>
      </div>

      <div style={list}>
        {safeIncomes.length === 0 && (
          <div style={emptyState}>
            Nenhuma receita encontrada
          </div>
        )}

        {safeIncomes.map((income, index) => (
          <div key={income.id ?? index} style={row}>
            <div style={leftContent}>
              <span style={incomeDot} />

              <span style={incomeName}>
                {income.category_name ||
                  income.category ||
                  income.description ||
                  "Receita"}
              </span>
            </div>

            <strong style={amount}>
              {formatCurrency(Number(income.amount ?? income.total ?? 0))}
            </strong>
          </div>
        ))}
      </div>

      {safeIncomes.length > 0 && (
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
  background: "#ecfdf5",
  color: "#16a34a",
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

const incomeDot = {
  width: "8px",
  height: "8px",
  borderRadius: "999px",
  background: "#16a34a",
  boxShadow: "0 0 10px rgba(22,163,74,0.35)",
  flexShrink: 0
}

const incomeName = {
  color: "#334155",
  fontWeight: 600,
  fontSize: "14px"
}

const amount = {
  color: "#16a34a",
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
  color: "#16a34a"
}