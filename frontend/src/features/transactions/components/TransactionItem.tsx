import React, { useState } from "react"

interface TransactionItemProps {
  id: number
  date?: string
  description?: string
  amount: number
  type: "income" | "expense"
  category?: string

  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
  onConciliar?: (id: number) => void
}

export default function TransactionItem({
  id,
  date,
  description,
  amount,
  type,
  category,
  onDelete,
  onEdit,
  onConciliar
}: TransactionItemProps) {

  const [menuOpen, setMenuOpen] = useState(false)

  const color = type === "income" ? "#16a34a" : "#dc2626"

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  const formatDate = (d?: string) => {
    if (!d) return ""
    return new Date(d).toLocaleDateString("pt-BR")
  }

  const menuItem: React.CSSProperties = {
    padding: "10px 12px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px"
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 120px",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #e5e7eb",
        gap: "10px"
      }}
    >

      {/* Data */}
      <span style={{ color: "#6b7280", fontSize: "14px" }}>
        {formatDate(date)}
      </span>

      {/* Descrição */}
      <div style={{ display: "flex", flexDirection: "column" }}>

        <span style={{ fontWeight: 500 }}>
          {description || "Sem descrição"}
        </span>

        {category && (
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280"
            }}
          >
            {category}
          </span>
        )}

      </div>

      {/* Valor + Menu */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent:"flex-end" }}>

        <span
          style={{
            fontWeight: "bold",
            color
          }}
        >
          {type === "expense" ? "-" : "+"} {formatCurrency(amount)}
        </span>

        {(onDelete || onEdit || onConciliar) && (

          <div style={{ position: "relative" }}>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                padding: "4px 8px"
              }}
            >
              ⋮
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "28px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  width: "150px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 10
                }}
              >

                {onEdit && (
                  <button
                    onClick={() => {
                      onEdit(id)
                      setMenuOpen(false)
                    }}
                    style={menuItem}
                  >
                    ✏️ Editar
                  </button>
                )}

                {onConciliar && (
                  <button
                    onClick={() => {
                      onConciliar(id)
                      setMenuOpen(false)
                    }}
                    style={menuItem}
                  >
                    🔗 Conciliar
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={() => {
                      onDelete(id)
                      setMenuOpen(false)
                    }}
                    style={{ ...menuItem, color: "#ef4444" }}
                  >
                    🗑 Excluir
                  </button>
                )}

              </div>
            )}

          </div>

        )}

      </div>

    </div>
  )
}