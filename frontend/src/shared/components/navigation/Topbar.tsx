import { Link } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useState } from "react"

function getInitials(name?: string) {
  if (!name) return "U"

  const parts = name.trim().split(" ").filter(Boolean)

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
      <div style={topbarGlow} />

      <div style={rightArea}>
        {!isAuthenticated && (
          <div style={authButtons}>
            <Link to="/login" style={linkReset}>
              <button style={secondaryButton}>
                Login
              </button>
            </Link>

            <Link to="/register" style={linkReset}>
              <button style={primaryButton}>
                Criar conta
              </button>
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div style={avatarContainer}>
            <button
              style={profileButton}
              onClick={() => setOpen(!open)}
            >
              <div style={avatar}>
                {getInitials(user?.name || user?.email)}
              </div>

              <div style={userInfo}>
                <span style={userName}>
                  {user?.name || "Usuário"}
                </span>
                <span style={userEmail}>
                  {user?.email}
                </span>
              </div>

              <span style={chevron}>
                {open ? "▴" : "▾"}
              </span>
            </button>

            {open && (
              <div style={dropdown}>
                <div style={dropdownHeader}>
                  <div style={dropdownAvatar}>
                    {getInitials(user?.name || user?.email)}
                  </div>

                  <div style={dropdownUserInfo}>
                    <strong style={dropdownName}>
                      {user?.name || "Usuário"}
                    </strong>
                    <span style={dropdownEmail}>
                      {user?.email}
                    </span>
                  </div>
                </div>

                <div style={divider} />

                <Link to="/profile" style={menuItemLink}>
                  <button style={menuItem}>
                    <span style={menuIcon}>👤</span>
                    Meu perfil
                  </button>
                </Link>

                <Link to="/settings" style={menuItemLink}>
                  <button style={menuItem}>
                    <span style={menuIcon}>⚙️</span>
                    Configurações
                  </button>
                </Link>

                <div style={divider} />

                <button onClick={logout} style={logoutItem}>
                  <span style={menuIcon}>🚪</span>
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
  left: "260px",
  right: 0,
  height: "72px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0 28px",
  background: "rgba(15, 23, 42, 0.88)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  color: "white",
  zIndex: 1000,
  backdropFilter: "blur(14px)",
  boxShadow: "0 8px 30px rgba(0,0,0,0.18)"
}

const topbarGlow = {
  position: "absolute" as const,
  top: "-70px",
  right: "40px",
  width: "180px",
  height: "180px",
  background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)",
  pointerEvents: "none" as const
}

const rightArea = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  position: "relative" as const,
  zIndex: 1
}

const authButtons = {
  display: "flex",
  gap: "12px"
}

const linkReset = {
  textDecoration: "none"
}

const primaryButton = {
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  border: "1px solid rgba(96,165,250,0.35)",
  color: "white",
  padding: "10px 16px",
  borderRadius: "12px",
  fontWeight: 700,
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(37,99,235,0.28)"
}

const secondaryButton = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "white",
  padding: "10px 16px",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
  backdropFilter: "blur(10px)"
}

const avatarContainer = {
  position: "relative" as const
}

const profileButton = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "8px 10px 8px 8px",
  cursor: "pointer",
  color: "white",
  minWidth: "220px",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.18)"
}

const avatar = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: "14px",
  boxShadow: "0 8px 18px rgba(59,130,246,0.28)",
  flexShrink: 0
}

const userInfo = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start",
  minWidth: 0,
  flex: 1
}

const userName = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#ffffff",
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis"
}

const userEmail = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.62)",
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "140px"
}

const chevron = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.6)"
}

const dropdown = {
  position: "absolute" as const,
  top: "62px",
  right: 0,
  background: "rgba(17, 24, 39, 0.98)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "18px",
  minWidth: "280px",
  maxWidth: "340px",
  boxShadow: "0 24px 50px rgba(0,0,0,0.35)",
  overflow: "hidden",
  zIndex: 100,
  backdropFilter: "blur(16px)"
}

const dropdownHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px"
}

const dropdownAvatar = {
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  color: "white",
  boxShadow: "0 8px 18px rgba(59,130,246,0.28)"
}

const dropdownUserInfo = {
  display: "flex",
  flexDirection: "column" as const,
  minWidth: 0
}

const dropdownName = {
  fontSize: "14px",
  color: "#fff",
  marginBottom: "2px"
}

const dropdownEmail = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.62)",
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis"
}

const divider = {
  height: "1px",
  background: "rgba(255,255,255,0.06)"
}

const menuItemLink = {
  textDecoration: "none"
}

const menuItem = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textAlign: "left" as const,
  padding: "12px 14px",
  border: "none",
  background: "transparent",
  color: "rgba(255,255,255,0.88)",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600
}

const menuIcon = {
  width: "20px",
  display: "inline-flex",
  justifyContent: "center"
}

const logoutItem = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textAlign: "left" as const,
  padding: "12px 14px",
  border: "none",
  background: "transparent",
  color: "#f87171",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 700
}