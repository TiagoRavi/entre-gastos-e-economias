import { useEffect, useState } from "react"
import { api } from "../api/client"
import AccountForm from "../components/AccountForm"
import AccountList from "../components/AccountList"

export interface Account {
  id: number
  name: string
  type: string
  initial_balance: number
}

export default function Accounts() {

  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {

    try {

      const response = await api.get("/accounts/")

      setAccounts(response.data)

    } catch (error) {

      console.error("Erro ao carregar contas", error)

    }

  }

  const createAccount = async (data: {
    name: string
    type: string
    initial_balance: number
  }) => {

    try {

      await api.post("/accounts/", data)

      await loadAccounts()

    } catch (error) {

      console.error("Erro ao criar conta", error)

    }

  }

  const deleteAccount = async (id: number) => {

    try {

      await api.delete(`/accounts/${id}`)

      await loadAccounts()

    } catch (error) {

      console.error("Erro ao deletar conta", error)

    }

  }

  const totalBalance = accounts.reduce(
    (acc, account) => acc + Number(account.initial_balance || 0),
    0
  )

      return (

    <div className="accounts-page">

      <h1 className="page-title">
        Contas
      </h1>

      <div className="accounts-top-grid">

        <AccountList
          accounts={accounts}
          deleteAccount={deleteAccount}
          totalBalance={totalBalance}
        />

        <div className="card">
          <h3>Movimentação</h3>
        </div>

      </div>

      <div style={{ marginTop: 20 }}>
        <AccountForm createAccount={createAccount} />
      </div>

    </div>

  )

}