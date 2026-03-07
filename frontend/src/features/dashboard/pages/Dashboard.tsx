import LineChartCard from "../../../shared/components/charts/LineChartCard"
import PieChartCard from "../../../shared/components/charts/PieChartCard"
import AccountsDashboardCard from "../components/AccountsDashboardCard"
import DashboardSummaryCards from "../components/DashboardSummaryCards"
import MonthPickerCard from "../components/MonthPickerCard"
import TopExpensesCard from "../components/TopExpensesCard"
import { useDashboard } from "../hooks/useDashboard"

export default function Dashboard() {
  const {
    period,
    setPeriod,
    balance,
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
          onChange={setPeriod}
        />
      </div>

      <DashboardSummaryCards
        balance={balance}
        currencyFormatter={currencyFormatter}
      />

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
        <TopExpensesCard month={period.month || ""} />
      </div>
    </div>
  )
}