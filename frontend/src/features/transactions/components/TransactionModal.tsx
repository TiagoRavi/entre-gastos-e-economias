import { useState } from "react"

type TransactionData = {
  account: string
  category: string
  type: string
  amount: number
  description: string
  date: string
}

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (data: TransactionData) => void
}

export default function TransactionModal({ open, onClose, onSubmit }: Props) {

  const today = new Date().toISOString().slice(0, 10)

  const [account, setAccount] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(today)

  if (!open) return null

  const resetForm = () => {
    setAccount("")
    setCategory("")
    setType("expense")
    setAmount("")
    setDescription("")
    setDate(today)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!account) {
      alert("Selecione uma conta")
      return
    }

    if (!amount || Number(amount) <= 0) {
      alert("Informe um valor válido")
      return
    }

    onSubmit({
      account,
      category,
      type,
      amount: parseFloat(amount),
      description,
      date
    })

    resetForm()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="modal-header">
          <h2>Nova Transação</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="modal-grid">

            {/* CONTA */}
            <div className="form-group">
              <label>Conta</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                required
                autoFocus
              >
                <option value="">Selecione</option>
                <option value="nubank">Nubank</option>
              </select>
            </div>

            {/* CATEGORIA */}
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Sem categoria</option>
                <option value="aluguel">Aluguel</option>
              </select>
            </div>

            {/* TIPO */}
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>

            {/* DATA */}
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* VALOR */}
            <div className="form-group">
              <label>Valor</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            {/* DESCRIÇÃO */}
            <div className="form-group full">
              <label>Descrição</label>
              <input
                placeholder="Descrição da transação"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="modal-actions">

            <button
              type="button"
              className="button-secondary"
              onClick={() => {
                resetForm()
                onClose()
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="button-primary"
            >
              Adicionar Transação
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}