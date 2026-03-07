import { useEffect, useState } from "react"
import { api } from "../../api/client"

interface Category {
  id: number
  name: string
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories")
      setCategories(response.data)
    } catch (error) {
      console.error("Erro ao buscar categorias", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    refresh: fetchCategories,
  }
}