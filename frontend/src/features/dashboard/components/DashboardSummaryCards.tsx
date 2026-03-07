import Card from "../../../shared/components/ui/Card"
import type { Balance } from "../types/dashboard.types"

interface DashboardSummaryCardsProps {
  balance: Balance | null
  currencyFormatter: Intl.NumberFormat
}

export default function DashboardSummaryCards({
  balance,
  currencyFormatter,
}: DashboardSummaryCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "40px",
      }}
    >
      <Card
        title="Receitas"
        value={currencyFormatter.format(balance?.income ?? 0)}
      />

      <Card
        title="Despesas"
        value={currencyFormatter.format(balance?.expenses ?? 0)}
      />

      <Card
        title="Resultado"
        value={currencyFormatter.format(balance?.balance ?? 0)}
      />
    </div>
  )
}