import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

function getInitials(name?: string) {
  if (!name) return "U"

  const parts = name.split(" ")

  if (parts.length === 1) {
    return parts[0][0].toUpperCase()
  }

  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function Topbar() {

  const { user, logout, isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header style={topbarStyle}>

      <div style={rightArea}>

        {!isAuthenticated && (
          <div style={authButtons}>

            <Link to="/login">
              <button style={secondaryButton}>
                Login
              </button>
            </Link>

            <Link to="/register">
              <button style={primaryButton}>
                Criar conta
              </button>
            </Link>

          </div>
        )}

        {isAuthenticated && (
          <div style={avatarContainer}>

            <div
              style={avatar}
              onClick={() => setOpen(!open)}
            >
              {getInitials(user?.name || user?.email)}
            </div>

            {open && (
              <div style={dropdown}>

                <div style={dropdownUser}>
                  <strong>{user?.name || "Usuário"}</strong>
                  <span>{user?.email}</span>
                </div>

                <div style={divider} />

                <button
                  onClick={logout}
                  style={logoutItem}
                >
                  Sair
                </button>

              </div>
            )}

          </div>
        )}

      </div>

    </header>
  )
}

const topbarStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0 24px",
  background: "#0f172a",
  borderBottom: "1px solid #1f2937",
  color: "white",
  zIndex: 1000
}

const rightArea = {
  display: "flex",
  alignItems: "center"
}

const authButtons = {
  display: "flex",
  gap: "10px"
}

const primaryButton = {
  background: "#2563eb",
  border: "none",
  color: "white",
  padding: "8px 14px",
  borderRadius: "8px",
  fontWeight: 600,
  cursor: "pointer"
}

const secondaryButton = {
  background: "transparent",
  border: "1px solid #374151",
  color: "white",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer"
}

const avatarContainer = {
  position: "relative" as const
}

const avatar = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "#2563eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  cursor: "pointer"
}

const dropdown = {
  position: "absolute" as const,
  top: "52px",
  right: 0,
  background: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "10px",
  minWidth: "240px",
  maxWidth: "320px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  overflow: "hidden",
  zIndex: 100
}

const dropdownUser = {
  padding: "12px",
  display: "flex",
  flexDirection: "column" as const,
  fontSize: "13px"
}

const divider = {
  height: "1px",
  background: "#1f2937"
}

const logoutItem = {
  width: "100%",
  textAlign: "left" as const,
  padding: "10px 12px",
  border: "none",
  background: "transparent",
  color: "#ef4444",
  cursor: "pointer"
}