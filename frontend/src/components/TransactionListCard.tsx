import { useTransactions } from "../hooks/useTransactions"

export default function TransactionListCard() {

  const { transactions, loading } = useTransactions()

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  if (loading) {
    return <div className="card">Carregando transações...</div>
  }

  const lastTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return (

    <div className="card">

      <h3 style={{ marginBottom: 16 }}>
        Últimas transações
      </h3>

      {lastTransactions.map((t) => (

        <div
          key={t.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #eee"
          }}
        >

          <span>{t.description || "Transação"}</span>

          <strong
            style={{
              color: t.type === "expense" ? "#ef4444" : "#22c55e"
            }}
          >
            {formatCurrency(Math.abs(t.amount))}
          </strong>

        </div>

      ))}

    </div>

  )
}