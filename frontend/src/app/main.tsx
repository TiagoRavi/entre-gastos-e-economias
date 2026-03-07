import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import { AuthProvider } from "../context/AuthContext"

/* GLOBAL STYLES */
import "../styles/base.css"
import "../styles/transitions.css"
import "../styles/modal.css"
import "../styles/buttons.css"
import "../styles/forms.css"
import "../styles/table.css"
import "../styles/cards.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)