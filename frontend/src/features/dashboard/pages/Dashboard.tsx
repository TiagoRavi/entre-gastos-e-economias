import LineChartCard from "../components/LineChartCard"
import PieChartCard from "../components/PieChartCard"
import AccountsDashboardCard from "../components/AccountsDashboardCard"
import DashboardSummaryCards from "../components/DashboardSummaryCards"
import MonthPickerCard from "../components/MonthPickerCard"
import TopExpensesCard from "../components/TopExpensesCard"
import TopIncomesCard from "../components/TopIncomesCard"
import { useDashboard } from "../hooks/useDashboard"

export default function Dashboard() {
  const {
    period,
    setPeriod,
    scope,
    setScope,
    balance,
    accumulatedBalance,
    lineData,
    pieData,
    loading,
    currencyFormatter,
  } = useDashboard()

  if (loading) {
    return <div style={{ padding: "40px" }}>Carregando dashboard...</div>
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Dashboard</h1>

        <MonthPickerCard
          value={period}
          scope={scope}
          onScopeChange={setScope}
          onChange={setPeriod}
        />
      </div>

      <DashboardSummaryCards
        balance={balance}
        currencyFormatter={currencyFormatter}
      />

      {scope === "accumulated" && accumulatedBalance && (
        <div style={{ marginBottom: "30px", opacity: 0.8 }}>
          <strong>Saldo acumulado:</strong>{" "}
          {currencyFormatter.format(accumulatedBalance.balance)}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "20px",
        }}
      >
        <AccountsDashboardCard />
        <LineChartCard data={lineData} />
        <PieChartCard data={pieData} />
        <TopExpensesCard period={period} scope={scope} />
        <TopIncomesCard period={period} scope={scope} />
      </div>
    </div>
  )
}