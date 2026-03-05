import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>
        Finance
      </h2>

      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >

          <li>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/accounts" style={linkStyle}>
              Contas
            </Link>
          </li>

          <li>
            <Link to="/transactions" style={linkStyle}>
              Transações
            </Link>
          </li>

          <li>
            <Link to="/categories" style={linkStyle}>
              Categorias
            </Link>
          </li>

          <li>
            <Link to="/budgets" style={linkStyle}>
              Orçamentos
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  )
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px"
}