import type { TopItem } from "../types/dashboard.types"

export type DashboardTopItem = TopItem & {
  type?: string
  kind?: string
  is_transfer?: boolean
  transfer_id?: string | number | null
}

function normalizeLabel(item: DashboardTopItem) {
  return String(
    item.category_name ??
      item.category ??
      item.description ??
      ""
  )
    .trim()
    .toLowerCase()
}

export function isValidTopItem(item: DashboardTopItem) {
  const label = normalizeLabel(item)

  const invalidLabels = new Set([
    "",
    "sem categoria",
    "transfer",
    "transferência",
    "transferencia",
    "transferência entre contas",
    "transferencia entre contas"
  ])

  const possibleType = String(item.type ?? item.kind ?? "").toLowerCase()
  const isTransferFlag = Boolean(item.is_transfer)
  const hasTransferId = item.transfer_id != null

  if (invalidLabels.has(label)) return false
  if (label.includes("transfer")) return false
  if (possibleType === "transfer") return false
  if (isTransferFlag) return false
  if (hasTransferId) return false

  return true
}