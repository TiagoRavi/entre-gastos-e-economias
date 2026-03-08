import Card from "../../../shared/components/ui/Card"
import type { SummaryData } from "../types/dashboard.types"

interface DashboardSummaryCardsProps {
  balance: SummaryData | null
  currencyFormatter: Intl.NumberFormat
}

export default function DashboardSummaryCards({
  balance,
  currencyFormatter,
}: DashboardSummaryCardsProps) {
  const income = balance?.income ?? 0
  const expense = balance?.expense ?? 0
  const result = balance?.result ?? 0

  return (
    <div style={gridStyle}>
      <Card
        title="Receitas"
        value={currencyFormatter.format(income)}
        subtitle="Entradas no período"
        accent="green"
        icon="📈"
      />

      <Card
        title="Despesas"
        value={currencyFormatter.format(expense)}
        subtitle="Saídas no período"
        accent="red"
        icon="📉"
      />

      <Card
        title="Resultado"
        value={currencyFormatter.format(result)}
        subtitle={result >= 0 ? "Saldo positivo" : "Saldo negativo"}
        accent={result >= 0 ? "blue" : "red"}
        icon={result >= 0 ? "💰" : "⚠️"}
      />
    </div>
  )
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
}