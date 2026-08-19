import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { api } from "../api/client"
import "../styles/Register.css"

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    try {
      setLoading(true)

      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      })

      setSuccess("Conta criada com sucesso! Redirecionando...")

      setTimeout(() => {
        navigate("/login")
      }, 1200)
    } catch (error: unknown) {
      console.error(error)

      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail

        if (detail === "Email already registered") {
          setError("Este e-mail já está cadastrado.")
        } else if (typeof detail === "string") {
          setError(detail)
        } else {
          setError("Não foi possível criar sua conta.")
        }
      } else {
        setError("Ocorreu um erro inesperado.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="register-page">
      <section className="register-card">

        <div className="register-header">
          <span className="register-brand">
            Entre Gastos & Economias
          </span>

          <h1>Criar sua conta</h1>

          <p>
            Organize sua vida financeira de forma simples e inteligente.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>

          <div className="register-field">
            <label htmlFor="name">
              Nome
            </label>

            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="password">
              Senha
            </label>

            <input
              id="password"
              type="password"
              placeholder="Mínimo de 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirm-password">
              Confirmar senha
            </label>

            <input
              id="confirm-password"
              type="password"
              placeholder="Digite sua senha novamente"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <div className="register-message register-error">
              {error}
            </div>
          )}

          {success && (
            <div className="register-message register-success">
              {success}
            </div>
          )}

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar minha conta"}
          </button>

        </form>

        <div className="register-footer">
          <span>Já possui uma conta?</span>

          <Link to="/login">
            Entrar
          </Link>
        </div>

      </section>
    </main>
  )
}
