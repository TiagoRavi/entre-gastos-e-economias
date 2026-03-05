import { useEffect, useState } from "react"
import { api } from "../api/client"

type Account = {
  id: number
  name: string
}

type Category = {
  id: number
  name: string
}

type TransactionStatus = "pending" | "confirmed"

type Transaction = {
  id: number
  account_id: number
  category_id: number | null
  type: "income" | "expense"
  amount: number
  description: string | null
  date: string
  status: TransactionStatus
  category?: Category
}

export default function Transactions() {

  const today = new Date().toISOString().slice(0, 10)

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [accountId, setAccountId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(today)

  const [openModal, setOpenModal] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadTransactions()
  }, [page, limit])

  const toggleMenu = (id: number) => {
    setOpenMenuId(prev => prev === id ? null : id)
  }

  const loadData = async () => {

    try {

      const [accountsRes, categoriesRes] = await Promise.all([
        api.get("/accounts/"),
        api.get("/categories/")
      ])

      setAccounts(accountsRes.data)
      setCategories(categoriesRes.data)

      await loadTransactions()

    } catch (error) {
      console.error("Erro ao carregar dados", error)
    }

  }

  const loadTransactions = async () => {

    try {

      const res = await api.get("/transactions/", {
        params: { page, limit }
      })

      setTransactions(res.data.items || [])
      setTotalPages(res.data.pages || 1)

    } catch (error) {
      console.error("Erro ao carregar transações", error)
    }

  }

  const resetForm = () => {
    setAccountId("")
    setCategoryId("")
    setType("expense")
    setAmount("")
    setDescription("")
    setDate(today)
  }

  const getCategoryName = (categoryId: number | null) => {

    if (!categoryId) return "Sem categoria"

    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : "Sem categoria"

  }

  const createTransaction = async () => {

    if (!accountId || !amount) return

    try {

      let value = Number(amount)

      value = type === "expense"
        ? -Math.abs(value)
        : Math.abs(value)

      await api.post("/transactions/", {
        account_id: Number(accountId),
        category_id: categoryId ? Number(categoryId) : null,
        type,
        amount: value,
        description,
        status: "pending",
        date
      })

      resetForm()
      await loadTransactions()
      setOpenModal(false)

    } catch (error) {
      console.error("Erro ao criar transação", error)
    }

  }

  const deleteTransaction = async (id: number) => {

    if (!confirm("Deseja excluir esta transação?")) return

    try {

      await api.delete(`/transactions/${id}`)
      await loadTransactions()

    } catch (error) {
      console.error("Erro ao excluir transação", error)
    }

  }

  const confirmTransaction = async (id: number) => {

    try {

      await api.patch(`/transactions/${id}/confirm`)
      await loadTransactions()

    } catch (error) {
      console.error("Erro ao confirmar transação", error)
    }

  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  const menuItem: React.CSSProperties = {
    padding: "10px 12px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px"
  }

  const getStatusBadge = (status: TransactionStatus) => {

    if (status === "confirmed") {
      return (
        <span style={{
          background: "#dcfce7",
          color: "#166534",
          padding: "4px 8px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 500
        }}>
          Confirmado
        </span>
      )
    }

    return (
      <span style={{
        background: "#fef9c3",
        color: "#92400e",
        padding: "4px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 500
      }}>
        Pendente
      </span>
    )
  }

  return (

    <div onClick={() => setOpenMenuId(null)}>

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1>Transações</h1>

        <button
          className="button-primary"
          onClick={(e) => {
            e.stopPropagation()
            setOpenModal(true)
          }}
        >
          + Nova Transação
        </button>
      </div>

      {/* TABELA */}

      <div className="card-hover">

        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          <thead style={{ background: "#f9fafb" }}>
            <tr>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Data</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Descrição</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Categoria</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Receita</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Despesa</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px 16px" }}>Ações</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((t) => {

              const dateFormatted = new Date(t.date).toLocaleDateString("pt-BR")

              const displayAmount =
                t.type === "expense"
                  ? formatCurrency(Math.abs(t.amount))
                  : formatCurrency(t.amount)

              return (

                <tr key={t.id} className="table-row">

                  <td style={{ padding: "12px 16px" }}>{dateFormatted}</td>

                  <td style={{ padding: "12px 16px" }}>
                    {t.description || "Sem descrição"}
                  </td>

                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>
                    {t.category?.name || getCategoryName(t.category_id)}
                  </td>

                  <td style={{ padding: "12px 16px", color: "#16a34a", fontWeight: 600 }}>
                    {t.type === "income" ? displayAmount : ""}
                  </td>

                  <td style={{ padding: "12px 16px", color: "#dc2626", fontWeight: 600 }}>
                    {t.type === "expense" ? displayAmount : ""}
                  </td>

                  <td style={{ padding: "12px 16px" }}>
                    {getStatusBadge(t.status)}
                  </td>

                  <td style={{ padding: "12px 16px", position: "relative" }}>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMenu(t.id)
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "18px",
                        padding: "4px 8px"
                      }}
                    >
                      ⋮
                    </button>

                    {openMenuId === t.id && (

                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "28px",
                          background: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          width: "160px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          display: "flex",
                          flexDirection: "column",
                          zIndex: 50
                        }}
                      >

                        {t.status === "pending" && (
                          <button
                            onClick={async () => {
                              await confirmTransaction(t.id)
                              setOpenMenuId(null)
                            }}
                            style={menuItem}
                          >
                            ✔ Conciliar
                          </button>
                        )}

                        <button
                          onClick={() => {
                            alert("Editar em breve")
                            setOpenMenuId(null)
                          }}
                          style={menuItem}
                        >
                          ✏️ Editar
                        </button>

                        <button
                          onClick={async () => {
                            await deleteTransaction(t.id)
                            setOpenMenuId(null)
                          }}
                          style={{ ...menuItem, color: "#ef4444" }}
                        >
                          🗑 Excluir
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

      {/* PAGINAÇÃO */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px"
        }}
      >

        <div>

          <label style={{ marginRight: 8 }}>Itens por página:</label>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value))
              setPage(1)
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

          <button
            className="button-secondary"
            disabled={page <= 1}
            onClick={() => setPage(prev => prev - 1)}
          >
            ← Anterior
          </button>

          <span>
            Página {page} de {totalPages}
          </span>

          <button
            className="button-secondary"
            disabled={page >= totalPages}
            onClick={() => setPage(prev => prev + 1)}
          >
            Próxima →
          </button>

        </div>

      </div>

      {/* MODAL */}

      {openModal && (

        <div className="modal-overlay" onClick={() => setOpenModal(false)}>

          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">
              <h2>Nova Transação</h2>

              <button
                className="modal-close"
                onClick={() => setOpenModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-grid">

              <div className="form-group">
                <label>Conta</label>

                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                >
                  <option value="">Selecione</option>

                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Categoria</label>

                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Sem categoria</option>

                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tipo</label>

                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "income" | "expense")
                  }
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>

              <div className="form-group">
                <label>Data</label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Valor</label>

                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

            </div>

            <div className="form-group">
              <label>Descrição</label>

              <input
                placeholder="Descrição da transação"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px"
              }}
            >

              <button
                className="button-secondary"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </button>

              <button
                className="button-primary"
                onClick={createTransaction}
              >
                Adicionar Transação
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}