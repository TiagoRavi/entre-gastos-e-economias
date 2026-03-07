import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import { AuthProvider } from "../context/AuthContext"

/* GLOBAL STYLES */
import "../shared/styles/base.css"
import "../shared/styles/transitions.css"
import "../shared/styles/modal.css"
import "../shared/styles/buttons.css"
import "../shared/styles/forms.css"
import "../shared/styles/table.css"
import "../shared/styles/cards.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)