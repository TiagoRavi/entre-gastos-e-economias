import { Link } from "react-router-dom"
import Topbar from "../shared/components/navigation/Topbar"

export default function Landing() {
  return (
    <div>

      <Topbar />

      {/* HERO */}

      <section
        style={{
          padding: "120px 20px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px"
          }}
        >
          Controle total das suas finanças
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            marginBottom: "40px"
          }}
        >
          Gerencie contas, categorize transações e acompanhe sua saúde financeira
          em um único lugar.
        </p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>

          <Link to="/register">
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Começar agora
            </button>
          </Link>

          <Link to="/login">
            <button
              style={{
                background: "#e5e7eb",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Já tenho conta
            </button>
          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px"
        }}
      >

        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Recursos principais
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px"
          }}
        >

          <Feature
            title="Controle de contas"
            text="Gerencie múltiplas contas bancárias em um só lugar."
          />

          <Feature
            title="Transações organizadas"
            text="Registre receitas e despesas facilmente."
          />

          <Feature
            title="Categorias"
            text="Organize seus gastos por categoria."
          />

          <Feature
            title="Relatórios"
            text="Visualize gráficos e acompanhe seu saldo."
          />

        </div>

      </section>

    </div>
  )
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        padding: "25px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        textAlign: "center"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <p style={{ color: "#6b7280" }}>{text}</p>
    </div>
  )
}