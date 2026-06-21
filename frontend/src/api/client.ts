import axios from "axios"

// 🔥 Base URL centralizada
const API_URL = "http://localhost:8006/api/v1"

// 🔥 Instância do axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// 🔐 Interceptor de REQUEST (envia token)
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token")

    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 🔥 Interceptor de RESPONSE (tratamento global de erro)
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // 🔐 Token inválido/expirado
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("access_token")
      localStorage.removeItem("accessToken")

      window.location.href = "/login"
    }

    // 🔥 LOG DETALHADO (CRÍTICO PARA DEBUG)
    console.error("❌ API ERROR:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    })

    return Promise.reject(error)
  }
)