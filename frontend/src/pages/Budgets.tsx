import { useState } from "react"
import { useBudgets } from "../hooks/useBudgets"
import { useCategories } from "../hooks/useCategories"

export default function Budgets() {

  const { budgets, createBudget } = useBudgets()
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

  return (
    <div>

      <h1>Orçamentos</h1>

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

    </div>
  )
}