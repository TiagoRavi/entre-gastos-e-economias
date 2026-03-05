import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Accounts from "./pages/Accounts"
import Categories from "./pages/Categories"
import Transactions from "./pages/Transactions"

import ProtectedRoute from "./routes/ProtectedRoute"
import DashboardLayout from "./layouts/DashboardLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/accounts" element={<Accounts />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/transactions" element={<Transactions />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App