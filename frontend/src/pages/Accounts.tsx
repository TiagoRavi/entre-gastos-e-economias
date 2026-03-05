import { useEffect, useState } from "react"
import { api } from "../api/client"

interface Account {
  id: number
  name: string
  type: string
  initial_balance: number
}

export default function Accounts() {

  const [accounts, setAccounts] = useState<Account[]>([])
  const [name, setName] = useState("")
  const [type, setType] = useState("bank")
  const [initialBalance, setInitialBalance] = useState(0)

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    const response = await api.get("/accounts/")
    setAccounts(response.data)
  }

  const createAccount = async () => {

    if (!name) return

    await api.post("/accounts/", {
      name,
      type,
      initial_balance: initialBalance
    })

    setName("")
    setInitialBalance(0)

    loadAccounts()
  }

  const deleteAccount = async (id: number) => {

    await api.delete(`/accounts/${id}`)

    loadAccounts()
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  const accountTypeLabel: Record<string, string> = {
    bank: "Banco",
    cash: "Dinheiro",
    credit_card: "Cartão de Crédito",
    savings: "Poupança"
  }

  return (
    <div>

      <h1 style={{ marginBottom: "20px" }}>
        Contas
      </h1>

      {/* FORM */}

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px"
        }}
      >

        <input
          placeholder="Nome da conta"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="bank">Banco</option>
          <option value="cash">Dinheiro</option>
          <option value="credit_card">Cartão</option>
          <option value="savings">Poupança</option>
        </select>

        <input
          type="number"
          placeholder="Saldo inicial"
          value={initialBalance}
          onChange={(e) => setInitialBalance(Number(e.target.value))}
        />

        <button onClick={createAccount}>
          Criar
        </button>

      </div>

      {/* LISTA */}

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >

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

            <div>

              <div style={{ fontWeight: 500 }}>
                {account.name}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280"
                }}
              >
                {accountTypeLabel[account.type]}
              </div>

            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >

              <span style={{ fontWeight: "bold" }}>
                {formatCurrency(account.initial_balance)}
              </span>

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

    </div>
  )
}