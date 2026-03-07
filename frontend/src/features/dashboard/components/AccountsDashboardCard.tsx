import { useAccounts } from "../../accounts/hooks/useAccounts"

export default function AccountsDashboardCard() {

  const { accounts, loading } = useAccounts()

  const formatCurrency = (value?: number) =>
    (value ?? 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  if (loading) {
    return (
      <div className="card">
        Carregando contas...
      </div>
    )
  }

  const total = accounts.reduce(
    (acc, account) => acc + Number(account.balance),
    0
  )

  return (
    <div className="card">

      <div style={header}>
        <h3 style={title}>Contas</h3>
        <span style={badge}>{accounts.length}</span>
      </div>

      <div style={list}>

        {accounts.length === 0 && (
          <span style={empty}>
            Nenhuma conta cadastrada
          </span>
        )}

        {accounts.map(account => (

          <div
            key={account.id}
            style={row}
          >

            <span style={accountName}>
              {account.name}
            </span>

            <strong style={balance}>
              {formatCurrency(account.balance)}
            </strong>

          </div>

        ))}

      </div>

      <div style={totalBox}>

        <span>Total</span>

        <span style={totalValue}>
          {formatCurrency(total)}
        </span>

      </div>

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
  fontWeight: 700
}

const badge = {
  fontSize: "12px",
  padding: "4px 8px",
  borderRadius: "6px",
  background: "#eef2ff",
  color: "#4f46e5",
  fontWeight: 600
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

const accountName = {
  color: "#334155",
  fontWeight: 500
}

const balance = {
  color: "#0f172a",
  fontWeight: 600
}

const totalBox = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "14px",
  paddingTop: "12px",
  borderTop: "1px solid #e2e8f0",
  fontWeight: 700
}

const totalValue = {
  color: "#0f172a"
}

const empty = {
  color: "#94a3b8",
  fontSize: "14px"
}