import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import "../../../styles/auth.css"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await login(email, password)

      navigate("/dashboard")

    } catch (error) {
      alert("Login inválido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Bem-vindo!</h1>
        <p>Faça login para acessar</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <span className="icon">📧</span>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">
            <span className="icon">🔒</span>

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

        <p className="auth-footer">
          Não tem conta?{" "}
          <span onClick={() => navigate("/register")}>
            Cadastre-se
          </span>
        </p>

      </div>

    </div>
  )
}