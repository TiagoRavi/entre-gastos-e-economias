export interface Balance {
  income: number
  expenses: number
  balance: number
}

export interface Cashflow {
  month: string
  income: number
  expense: number
}

export interface PieData {
  name: string
  value: number
}

export interface Period {
  month?: string
  start_month?: string
  end_month?: string
}

export interface Category {
  id: number
  name: string
}