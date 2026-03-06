import { useEffect, useState } from "react"
import { api } from "../api/client"

interface Account {
  id: number
  name: string
  initial_balance: number
}

export default function AccountsDashboardCard() {

  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {

    try {

      const res = await api.get("/accounts/")

      setAccounts(res.data)

    } catch (error) {

      console.error("Erro ao carregar contas", error)

    }

  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  const total = accounts.reduce(
    (acc, account) => acc + Number(account.initial_balance || 0),
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
            {formatCurrency(account.initial_balance)}
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