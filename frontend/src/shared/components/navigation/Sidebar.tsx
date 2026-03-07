import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation()

  const menu = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Contas", path: "/accounts", icon: "🏦" },
    { label: "Transações", path: "/transactions", icon: "💸" },
    { label: "Categorias", path: "/categories", icon: "🏷️" },
    { label: "Orçamentos", path: "/budgets", icon: "🎯" }
  ]

  return (
    <aside style={sidebarStyle}>
      <div style={topGlow} />

      <div style={logoWrapper}>
        <div style={logoBadge}>💰</div>
        <div>
          <div style={logoTitle}>Finance</div>
          <div style={logoSubtitle}>Painel financeiro</div>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <div style={sectionTitle}>MENU</div>

        <ul style={menuList}>
          {menu.map((item) => {
            const active = location.pathname === item.path

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    ...linkStyle,
                    ...(active ? activeLink : {})
                  }}
                >
                  {active && <span style={activeIndicator} />}

                  <span
                    style={{
                      ...iconWrapper,
                      ...(active ? activeIconWrapper : {})
                    }}
                  >
                    <span style={iconStyle}>{item.icon}</span>
                  </span>

                  <span style={labelStyle}>{item.label}</span>

                  {active && <span style={activeDot} />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div style={footerCard}>
        <div style={footerTitle}>Finance v1.0</div>
        <div style={footerText}>Gestão inteligente e moderna</div>
      </div>
    </aside>
  )
}

const sidebarStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "260px",
  height: "100vh",
  background: "linear-gradient(180deg, #0f172a 0%, #111827 50%, #0b1120 100%)",
  color: "white",
  padding: "24px 18px",
  display: "flex",
  flexDirection: "column" as const,
  borderRight: "1px solid rgba(255,255,255,0.08)",
  overflowY: "auto" as const,
  zIndex: 999,
  boxShadow: "8px 0 30px rgba(0,0,0,0.35)",
  backdropFilter: "blur(12px)"
}

const topGlow = {
  position: "absolute" as const,
  top: "-80px",
  left: "-40px",
  width: "180px",
  height: "180px",
  background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)",
  pointerEvents: "none" as const
}

const logoWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  marginBottom: "32px",
  padding: "14px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)"
}

const logoBadge = {
  width: "46px",
  height: "46px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
  boxShadow: "0 10px 20px rgba(59,130,246,0.25)"
}

const logoTitle = {
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "0.3px"
}

const logoSubtitle = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.6)",
  marginTop: "2px"
}

const sectionTitle = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "1.4px",
  color: "rgba(255,255,255,0.45)",
  marginBottom: "12px",
  paddingLeft: "8px"
}

const menuList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column" as const,
  gap: "8px"
}

const linkStyle = {
  position: "relative" as const,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 14px",
  borderRadius: "14px",
  textDecoration: "none",
  color: "rgba(226,232,240,0.82)",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  background: "transparent",
  border: "1px solid transparent"
}

const activeLink = {
  background: "linear-gradient(135deg, rgba(30,41,59,0.95), rgba(30,41,59,0.7))",
  color: "#ffffff",
  border: "1px solid rgba(96,165,250,0.22)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
  fontWeight: 700
}

const activeIndicator = {
  position: "absolute" as const,
  left: "-2px",
  top: "10px",
  bottom: "10px",
  width: "4px",
  borderRadius: "999px",
  background: "linear-gradient(180deg, #60a5fa, #8b5cf6)"
}

const iconWrapper = {
  width: "34px",
  height: "34px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.05)",
  flexShrink: 0
}

const activeIconWrapper = {
  background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.22))",
  border: "1px solid rgba(96,165,250,0.22)",
  boxShadow: "0 4px 12px rgba(59,130,246,0.15)"
}

const iconStyle = {
  fontSize: "16px"
}

const labelStyle = {
  flex: 1,
  fontWeight: 600
}


const activeDot = {
  width: "8px",
  height: "8px",
  borderRadius: "999px",
  background: "#60a5fa",
  boxShadow: "0 0 10px rgba(96,165,250,0.8)"
}

const footerCard = {
  marginTop: "20px",
  padding: "14px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)"
}

const footerTitle = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#fff",
  marginBottom: "4px"
}

const footerText = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.55)"
}