import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api/client"
import "../styles/auth.css"

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await api.post("/auth/register", {
        name,
        email,
        password,
      })

      alert("Usuário criado com sucesso!")

      navigate("/login")

    } catch (error) {
      console.error(error)
      alert("Erro ao criar usuário")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Crie sua conta</h1>
        <p>Preencha os dados para continuar</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </button>

        </form>

        <p className="auth-footer">
          Já tem conta? <span onClick={() => navigate("/login")}>Entrar</span>
        </p>

      </div>

    </div>
  )
}