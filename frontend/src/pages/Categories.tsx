import { useEffect, useState } from "react"
import { api } from "../api/client"

interface Category {
  id: number
  name: string
  type: "income" | "expense"
}

export default function Categories() {

  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")
  const [type, setType] = useState<"income" | "expense">("income")

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const response = await api.get("/categories/")
    setCategories(response.data)
  }

  const createCategory = async () => {

    if (!name) return

    await api.post("/categories/", {
      name,
      type
    })

    setName("")
    loadCategories()
  }

  const deleteCategory = async (id: number) => {
    await api.delete(`/categories/${id}`)
    loadCategories()
  }

  const formatType = (type: string) => {
    return type === "income" ? "Receita" : "Despesa"
  }

  const typeColor = (type: string) => {
    return type === "income" ? "#16a34a" : "#dc2626"
  }

  return (
    <div>

      <h1 style={{ marginBottom: "20px" }}>
        Categorias
      </h1>

      {/* FORM */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "30px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >

        <input
          placeholder="Nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
        >
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>

        <button
          onClick={createCategory}
          style={{
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "6px 14px",
            cursor: "pointer"
          }}
        >
          Criar
        </button>

      </div>

      {/* LISTA */}

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}
      >

        {categories.map((category) => (

          <div
            key={category.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom: "1px solid #eee"
            }}
          >

            <span style={{ fontWeight: 500 }}>
              {category.name}
            </span>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

              <span
                style={{
                  background: `${typeColor(category.type)}15`,
                  color: typeColor(category.type),
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px"
                }}
              >
                {formatType(category.type)}
              </span>

              <button
                onClick={() => deleteCategory(category.id)}
                style={{
                  background: "transparent",
                  border: "none",
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