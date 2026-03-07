import { useState } from "react"
import { useBudgets } from "../hooks/useBudgets"
import { useCategories } from "../../categories/hooks/useCategories"

export default function Budgets() {

  const { budgets, summary, createBudget, deleteBudget } = useBudgets()
  const { categories } = useCategories()

  const today = new Date()

  const [categoryId, setCategoryId] = useState("")
  const [limit, setLimit] = useState("")
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [year, setYear] = useState(today.getFullYear())

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!categoryId || !limit) return

    await createBudget(
      Number(categoryId),
      Number(limit),
      month,
      year
    )

    setCategoryId("")
    setLimit("")
  }

  // 🔹 converter Decimal (string) → number
  const totalBudget = summary.reduce(
    (acc, s) => acc + Number(s.monthly_limit),
    0
  )

  const totalSpent = summary.reduce(
    (acc, s) => acc + Number(s.spent),
    0
  )

  const totalRemaining = totalBudget - totalSpent

  return (
    <div>

      <h1>Orçamentos</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Selecione categoria</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}

        </select>

        <input
          type="number"
          placeholder="Limite mensal"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        />

        <input
          type="number"
          min="2020"
          max="2100"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />

        <button type="submit">
          Criar orçamento
        </button>

      </form>


      {/* CARDS RESUMO */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>

        <div>
          <strong>Total Orçado</strong>
          <div>R$ {totalBudget.toFixed(2)}</div>
        </div>

        <div>
          <strong>Total Gasto</strong>
          <div>R$ {totalSpent.toFixed(2)}</div>
        </div>

        <div>
          <strong>Restante</strong>
          <div>R$ {totalRemaining.toFixed(2)}</div>
        </div>

      </div>


      {/* LISTA DE ORÇAMENTOS */}
      <h2>Orçamentos criados</h2>

      <table>

        <thead>
          <tr>
            <th>Categoria</th>
            <th>Limite</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {budgets.map((b) => (

            <tr key={b.id}>

              <td>{b.category_name}</td>

              <td>
                R$ {Number(b.monthly_limit).toFixed(2)}
              </td>

              <td>
                <button onClick={() => deleteBudget(b.id)}>
                  Remover
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* STATUS DO ORÇAMENTO */}
      <h2>Status do orçamento</h2>

      <div style={{ display: "grid", gap: 20 }}>

        {summary.map((s) => {

          const percent = Number(s.percentage)

          let color = "#22c55e"

          if (percent > 90) color = "#ef4444"
          else if (percent > 70) color = "#f59e0b"

          return (

            <div
              key={s.category_id}
              style={{
                border: "1px solid #ddd",
                padding: 16,
                borderRadius: 8
              }}
            >

              <strong>{s.category_name}</strong>

              <div>
                {Number(s.spent).toFixed(2)} / {Number(s.monthly_limit).toFixed(2)}
              </div>

              <div>
                Restante: R$ {Number(s.remaining).toFixed(2)}
              </div>

              <progress
                value={percent}
                max={100}
                style={{
                  width: "100%",
                  accentColor: color
                }}
              />

              <div>
                {percent.toFixed(0)}%
              </div>

            </div>

          )

        })}

      </div>

    </div>
  )
}