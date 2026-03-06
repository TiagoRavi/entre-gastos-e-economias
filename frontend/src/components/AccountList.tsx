interface Account {
  id: number
  name: string
  type: string
  initial_balance: number
}

interface Props {
  accounts: Account[]
  deleteAccount: (id: number) => void
}

export default function AccountList({
  accounts,
  deleteAccount
}: Props) {

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  const accountTypeLabel: Record<string, string> = {
    bank: "Banco",
    cash: "Dinheiro",
    credit_card: "Cartão de Crédito",
    savings: "Poupança"
  }

  const totalBalance = accounts.reduce(
    (acc, account) => acc + account.initial_balance,
    0
  )

  return (

    <div className="card">

      <h3 style={{ marginBottom: 20 }}>
        Contas
      </h3>

      {accounts.map((account) => (

        <div
          key={account.id}
          className="account-row"
        >

          <div>

            <div className="account-name">
              {account.name}
            </div>

            <div className="account-type">
              {accountTypeLabel[account.type]}
            </div>

          </div>

          <div className="account-actions">

            <span className="balance">
              {formatCurrency(account.initial_balance)}
            </span>

            <button
              className="delete-btn"
              onClick={() => deleteAccount(account.id)}
            >
              Excluir
            </button>

          </div>

        </div>

      ))}

      <div className="total-row">

        <span>Total</span>

        <strong>
          {formatCurrency(totalBalance)}
        </strong>

      </div>

    </div>

  )
}