import { useMemo, useState } from "react"

type Message = {
  id: string
  role: "user" | "assistant"
  text: string
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8006"

function getAuthToken() {
  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("access_token") ||
    sessionStorage.getItem("accessToken") ||
    sessionStorage.getItem("token") ||
    sessionStorage.getItem("authToken") ||
    ""
  )
}

export default function FinanceAssistantButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Olá! Sou seu assistente financeiro. Posso te ajudar com gastos, economia e metas."
    }
  ])

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading])

  async function handleSend() {
    const question = input.trim()
    if (!question) return

    const token = getAuthToken()

    if (!token) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Usuário não autenticado. Faça login novamente."
        }
      ])
      return
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: question
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/v1/assistant/finance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          message: question
        })
      })

      const data = await response.json()
      console.log("assistant response:", data)

      const reply =
        data?.reply ||
        data?.message ||
        data?.output ||
        data?.debug?.text ||
        data?.debug?.error ||
        data?.debug?.response_text ||
        "Recebi a resposta, mas veio vazia."

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: reply
        }
      ])
    } catch (error) {
      console.error("Erro completo:", error)

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            error instanceof Error
              ? error.message
              : "Erro ao conectar com o assistente."
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={floatingButton}
        title="Assistente financeiro"
      >
        💬
      </button>

      {open && (
        <div style={panel}>
          <div style={header}>
            <div>
              <strong>Assistente Financeiro</strong>
              <div style={subtitle}>n8n + OpenAI</div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={closeButton}
            >
              ✕
            </button>
          </div>

          <div style={messagesBox}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...bubble,
                  ...(msg.role === "user" ? user : assistant)
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && <div style={{ ...bubble, ...assistant }}>Pensando...</div>}
          </div>

          <div style={inputArea}>
            <input
              type="text"
              placeholder="Pergunte sobre finanças..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              style={send}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const floatingButton: React.CSSProperties = {
  position: "fixed",
  right: "24px",
  bottom: "24px",
  width: "64px",
  height: "64px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  fontSize: "24px",
  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
  color: "#fff",
  zIndex: 9999
}

const panel: React.CSSProperties = {
  position: "fixed",
  right: "24px",
  bottom: "100px",
  width: "360px",
  height: "520px",
  background: "#fff",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  overflow: "hidden",
  zIndex: 9999
}

const header: React.CSSProperties = {
  padding: "16px",
  background: "#0f172a",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const subtitle: React.CSSProperties = {
  fontSize: "12px",
  opacity: 0.7
}

const closeButton: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: "18px"
}

const messagesBox: React.CSSProperties = {
  flex: 1,
  padding: "16px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  background: "#f8fafc"
}

const bubble: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "12px",
  maxWidth: "80%"
}

const user: React.CSSProperties = {
  alignSelf: "flex-end",
  background: "#2563eb",
  color: "#fff"
}

const assistant: React.CSSProperties = {
  alignSelf: "flex-start",
  background: "#e2e8f0",
  color: "#111827"
}

const inputArea: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  padding: "12px",
  borderTop: "1px solid #e5e7eb"
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  outline: "none"
}

const send: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#111827",
  color: "#fff",
  cursor: "pointer"
}