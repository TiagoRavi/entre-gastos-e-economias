import React from "react"

interface TransactionItemProps {
  id: number
  description?: string
  amount: number
  type: "income" | "expense"
  category?: string
  onDelete?: (id: number) => void
}

export default function TransactionItem({
  id,
  description,
  amount,
  type,
  category,
  onDelete
}: TransactionItemProps) {

  const color = type === "income" ? "#16a34a" : "#dc2626"

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #e5e7eb",
        transition: "background 0.2s",
      }}
    >

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

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        <span
          style={{
            fontWeight: "bold",
            color
          }}
        >
          {type === "expense" ? "-" : "+"} {formatCurrency(amount)}
        </span>

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#ef4444",
              fontWeight: 500
            }}
          >
            Excluir
          </button>
        )}

      </div>

    </div>
  )
}