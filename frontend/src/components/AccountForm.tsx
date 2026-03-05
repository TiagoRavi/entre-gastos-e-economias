import { useState } from "react"
import { api } from "../api/client"

interface Props {
  onCreated?: () => void
}

export default function AccountForm({ onCreated }: Props) {

  const [name, setName] = useState("")
  const [balance, setBalance] = useState("")

  const createAccount = async () => {

    if (!name) return

    await api.post("/accounts/", {
      name,
      balance: Number(balance)
    })

    setName("")
    setBalance("")

    onCreated?.()
  }

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: "20px"
      }}
    >

      <h3 style={{ marginBottom: "10px" }}>
        Nova Conta
      </h3>

      <div style={{ display: "flex", gap: "10px" }}>

        <input
          placeholder="Nome da conta"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Saldo inicial"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />

        <button onClick={createAccount}>
          Criar
        </button>

      </div>

    </div>
  )
}