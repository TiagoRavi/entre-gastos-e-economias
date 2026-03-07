import { useAccounts } from "../shared/hooks/useAccounts"

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

      <h3 style={{ marginBottom: 16 }}>
        Contas
      </h3>

      {accounts.map(account => (

        <div
          key={account.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #eee"
          }}
        >

          <span>{account.name}</span>

          <strong>
            {formatCurrency(account.balance)}
          </strong>

        </div>

      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 12,
          fontWeight: 600
        }}
      >

        <span>Total</span>

        <span>{formatCurrency(total)}</span>

      </div>

    </div>

  )
}