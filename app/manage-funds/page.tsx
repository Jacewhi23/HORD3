"use client"

import { useState } from "react"
import { Navigation } from "../components/Navigation"
import { PaymentProcessor } from "../components/PaymentProcessor"
import { AccountHistory } from "../components/AccountHistory"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CoinsIcon as CoinIcon } from "lucide-react"
import { formatHCash } from "../utils/currency"

export default function ManageFunds() {
  const [accountBalance, setAccountBalance] = useState(1000.0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-hord-gradient">Manage Funds</h1>

        <Card gradient="true" className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CoinIcon className="w-6 h-6" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{formatHCash(accountBalance)}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PaymentProcessor accountBalance={accountBalance} setAccountBalance={setAccountBalance} />
          <AccountHistory />
        </div>
      </div>
    </div>
  )
}

