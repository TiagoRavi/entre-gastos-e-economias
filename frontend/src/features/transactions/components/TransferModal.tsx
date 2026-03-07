import { useState } from "react"
import api from "../api/client"

interface Props {
  isOpen: boolean
  onClose: () => void
  accounts: any[]
  onSuccess: () => void
}

export default function TransferModal({ isOpen, onClose, accounts, onSuccess }: Props) {

  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await api.post("/transfers", {
      from_account_id: Number(fromAccount),
      to_account_id: Number(toAccount),
      amount: Number(amount),
      date,
      description
    })

    onSuccess()
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Transfer</h2>

        <form onSubmit={handleSubmit}>

          <label>From Account</label>
          <select
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            required
          >
            <option value="">Select</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>

          <label>To Account</label>
          <select
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            required
          >
            <option value="">Select</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>

          <label>Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="modal-actions">
            <button type="submit">Transfer</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}