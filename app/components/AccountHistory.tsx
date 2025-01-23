import { useEffect, useState } from "react"
import type { Transaction } from "../types/transaction"
import { fetchAccountHistory } from "../actions"
import { formatHCash } from "../utils/currency"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AccountHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const loadTransactions = async () => {
      // In a real app, you'd get the actual user ID
      const userId = "currentUser"
      const history = await fetchAccountHistory(userId)
      setTransactions(history)
    }

    loadTransactions()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="text-right">
                  {transaction.type === "purchase" || transaction.type === "withdrawal" ? "- " : "+ "}
                  {formatHCash(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

