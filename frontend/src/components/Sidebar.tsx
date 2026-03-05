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

      <div style={logoStyle}>
        💰 Finance
      </div>

      <nav style={{ flex: 1 }}>

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

                  <span style={iconStyle}>
                    {item.icon}
                  </span>

                  {item.label}

                </Link>

              </li>
            )
          })}

        </ul>

      </nav>

      <div style={footerStyle}>
        Finance v1.0
      </div>

    </aside>
  )
}

const sidebarStyle = {
  width: "240px",
  background: "#0f172a",
  color: "white",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column" as const,
  borderRight: "1px solid #1f2937"
}

const logoStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "30px"
}

const menuList = {
  listStyle: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column" as const,
  gap: "6px"
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#cbd5f5",
  fontSize: "14px",
  transition: "all 0.15s ease"
}

const activeLink = {
  background: "#1e293b",
  color: "white",
  fontWeight: 600
}

const iconStyle = {
  fontSize: "16px"
}

const footerStyle = {
  fontSize: "12px",
  opacity: 0.5
}