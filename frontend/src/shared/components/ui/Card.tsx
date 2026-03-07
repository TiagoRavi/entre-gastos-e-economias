import React from "react"

interface CardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  color?: string
}

export default function Card({
  title,
  value,
  subtitle,
  icon,
  color = "#111827"
}: CardProps) {

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: "200px",
        flex: 1,
        transition: "all 0.2s ease"
      }}
    >

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icon}

        <span
          style={{
            fontSize: "14px",
            color: "#6b7280"
          }}
        >
          {title}
        </span>
      </div>

      <span
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: color
        }}
      >
        {value}
      </span>

      {subtitle && (
        <span
          style={{
            fontSize: "12px",
            color: "#9ca3af"
          }}
        >
          {subtitle}
        </span>
      )}

    </div>
  )
}