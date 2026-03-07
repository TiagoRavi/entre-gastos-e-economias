import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "../pages/Landing"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"

import Dashboard from "../features/dashboard/pages/Dashboard"

import Accounts from "../features/accounts/pages/Accounts"
import Categories from "../features/categories/pages/Categories"
import Transactions from "../features/transactions/pages/Transactions"

import Budgets from "../features/budgets/pages/Budgets"

import ProtectedRoute from "../routes/ProtectedRoute"
import DashboardLayout from "../layouts/DashboardLayout"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
          <Route path="/budgets" element={<Budgets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}