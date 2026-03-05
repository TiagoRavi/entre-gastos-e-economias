import { useEffect, useState } from "react"
import { api } from "../api/client"

export default function Transactions() {

  const [transactions, setTransactions] = useState<any[]>([])
  const [accounts, setAccounts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  const [accountId, setAccountId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [type, setType] = useState("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    loadTransactions()
    loadAccounts()
    loadCategories()
  }, [])

  const loadTransactions = async () => {
    const res = await api.get("/transactions/")
    setTransactions(res.data)
  }

  const loadAccounts = async () => {
    const res = await api.get("/accounts/")
    setAccounts(res.data)
  }

  const loadCategories = async () => {
    const res = await api.get("/categories/")
    setCategories(res.data)
  }

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Sem categoria"
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : "Sem categoria"
  }

  const createTransaction = async () => {

    if (!accountId || !amount) return

    await api.post("/transactions/", {
      account_id: Number(accountId),
      category_id: categoryId ? Number(categoryId) : null,
      type,
      amount: Number(amount),
      description,
      date: new Date().toISOString().slice(0,10)
    })

    setAccountId("")
    setCategoryId("")
    setType("expense")
    setAmount("")
    setDescription("")

    loadTransactions()
  }

  const deleteTransaction = async (id:number) => {
    await api.delete(`/transactions/${id}`)
    loadTransactions()
  }

  const formatCurrency = (value:number) =>
    value.toLocaleString("pt-BR", {
      style:"currency",
      currency:"BRL"
    })

  return (
    <div>

      <h1 style={{marginBottom:"20px"}}>
        Transações
      </h1>

      {/* FORM */}

      <div
        style={{
          background:"white",
          padding:"20px",
          borderRadius:"12px",
          boxShadow:"0 2px 8px rgba(0,0,0,0.05)",
          marginBottom:"30px",
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
          gap:"10px"
        }}
      >

        <select value={accountId} onChange={(e)=>setAccountId(e.target.value)}>
          <option value="">Conta</option>
          {accounts.map(acc=>(
            <option key={acc.id} value={acc.id}>{acc.name}</option>
          ))}
        </select>

        <select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
          <option value="">Categoria</option>
          {categories.map(cat=>(
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e)=>{
            setType(e.target.value)
            setCategoryId("")
          }}
        >
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />

        <input
          placeholder="Descrição"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button
          onClick={createTransaction}
          style={{
            background:"#4f46e5",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Adicionar
        </button>

      </div>

      {/* TABELA */}

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflow: "hidden"
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead style={{ background: "#f9fafb" }}>
            <tr>

              <th style={{ padding: "12px 16px", textAlign: "left" }}>Data</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Descrição</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Categoria</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Receita</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Despesa</th>
              <th style={{ padding: "12px 16px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px 16px" }}></th>

            </tr>
          </thead>

          <tbody>

            {transactions
              .sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((t) => {

              const date = t.date
                ? new Date(t.date).toLocaleDateString("pt-BR")
                : "-"

              return (

                <tr
                  key={t.id}
                  style={{
                    borderTop: "1px solid #eee",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e)=> e.currentTarget.style.background="#f9fafb"}
                  onMouseLeave={(e)=> e.currentTarget.style.background="white"}
                >

                  <td style={{ padding: "12px 16px" }}>
                    {date}
                  </td>

                  <td style={{ padding: "12px 16px" }}>
                    {t.description || "Sem descrição"}
                  </td>

                  <td style={{ padding: "12px 16px", color:"#6b7280" }}>
                    {t.category?.name || getCategoryName(t.category_id)}
                  </td>

                  <td style={{ padding: "12px 16px", color: "#16a34a" }}>
                    {t.type === "income" ? formatCurrency(t.amount) : ""}
                  </td>

                  <td style={{ padding: "12px 16px", color: "#dc2626" }}>
                    {t.type === "expense" ? formatCurrency(t.amount) : ""}
                  </td>

                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        background: "#dcfce7",
                        color: "#166534",
                        padding: "3px 8px",
                        borderRadius: "6px"
                      }}
                    >
                      Confirmado
                    </span>
                  </td>

                  <td style={{ padding: "12px 16px" }}>

                    <button
                      onClick={() => deleteTransaction(t.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer"
                      }}
                    >
                      Excluir
                    </button>

                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}