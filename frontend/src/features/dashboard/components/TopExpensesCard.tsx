import { useTopExpenses } from "../../../shared/hooks/useTopExpenses"

interface Props {
  month: string
}

export default function TopExpensesCard({ month }: Props) {

  const { expenses, loading } = useTopExpenses(month)

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  if (loading) {
    return (
      <div className="card">
        Carregando maiores despesas...
      </div>
    )
  }

  return (

    <div className="card">

      <h3 style={{ marginBottom: 16 }}>
        Maiores despesas
      </h3>

      {expenses.length === 0 && (
        <span>Nenhuma despesa encontrada</span>
      )}

      {expenses.map((expense, index) => (

        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #eee"
          }}
        >

          <span>{expense.category}</span>

          <strong style={{ color: "#ef4444" }}>
            {formatCurrency(expense.amount)}
          </strong>

        </div>

      ))}

    </div>

  )
}