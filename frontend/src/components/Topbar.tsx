import { Link } from "react-router-dom"

export default function Topbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      background: "#111",
      color: "white"
    }}>
      <h2>Finance Control</h2>

      <div>
        <Link to="/login">
          <button style={{marginRight:"10px"}}>
            Login
          </button>
        </Link>

        <Link to="/register">
          <button>
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}