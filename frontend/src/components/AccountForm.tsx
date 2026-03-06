import { useState } from "react"

interface Props {
  createAccount: (data: {
    name: string
    type: string
    initial_balance: number
  }) => void
}

export default function AccountForm({ createAccount }: Props) {

  const [name, setName] = useState("")
  const [type, setType] = useState("bank")
  const [initialBalance, setInitialBalance] = useState(0)

  const handleSubmit = () => {

    if (!name.trim()) return

    createAccount({
      name,
      type,
      initial_balance: initialBalance
    })

    setName("")
    setInitialBalance(0)
  }

  return (

    <div className="card">

      <h3>Adicionar conta</h3>

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

      <button onClick={handleSubmit}>
        Criar conta
      </button>

    </div>

  )
}