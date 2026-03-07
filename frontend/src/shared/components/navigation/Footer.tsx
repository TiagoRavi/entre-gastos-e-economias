export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContent}>
        <div style={leftSide}>
          <span style={brand}>Finance</span>
          <span style={divider}>•</span>
          <span style={text}>Controle financeiro inteligente</span>
        </div>

        <div style={rightSide}>
          <span style={text}>© 2026 Finance</span>
        </div>
      </div>
    </footer>
  )
}

const footerStyle = {
  marginTop: "32px",
  padding: "18px 24px",
  borderTop: "1px solid rgba(15, 23, 42, 0.08)",
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(10px)"
}

const footerContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap" as const,
  gap: "12px"
}

const leftSide = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap" as const
}

const rightSide = {
  display: "flex",
  alignItems: "center"
}

const brand = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#0f172a"
}

const divider = {
  color: "#94a3b8"
}

const text = {
  fontSize: "13px",
  color: "#64748b",
  fontWeight: 500
}