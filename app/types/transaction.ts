export type TransactionType = "purchase" | "sale" | "deposit" | "withdrawal"

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  date: string
  fromUserId?: string
  toUserId?: string
  itemId?: string
}

