import { useEffect, useState } from "react"
import { api } from "../api/client"

interface Account {
  id: number
  name: string
  balance: number
}

export default function AccountList() {

  const [accounts, setAccounts] = useState<Account[]>([])

  const loadAccounts = async () => {

    const response = await api.get("/accounts/")
    setAccounts(response.data)
  }

  useEffect(() => {
    loadAccounts()
  }, [])

  const deleteAccount = async (id: number) => {

    await api.delete(`/accounts/${id}`)
    loadAccounts()
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >

      <h3 style={{ marginBottom: "10px" }}>
        Contas
      </h3>

      {accounts.map((account) => (

        <div
          key={account.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #eee"
          }}
        >

          <span>{account.name}</span>

          <div style={{ display: "flex", gap: "10px" }}>

            <span>{formatCurrency(account.balance)}</span>

            <button
              onClick={() => deleteAccount(account.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "#ef4444",
                cursor: "pointer"
              }}
            >
              Excluir
            </button>

          </div>

        </div>

      ))}

    </div>
  )
}