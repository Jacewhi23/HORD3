"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreditCard, Wallet, CoinsIcon as CoinIcon } from "lucide-react"
import { formatHCash, usdToHCash, hCashToUSD } from "../utils/currency"
import { recordTransaction } from "../actions"

interface PaymentProcessorProps {
  accountBalance: number
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ accountBalance, setAccountBalance }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [depositData, setDepositData] = useState({
    amount: "",
    card_number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    bank_name: "",
    account_number: "",
    routing_number: "",
    account_type: "checking",
  })

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDepositData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
    setSuccess("")
  }

  const handleWithdrawalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWithdrawalData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
    setSuccess("")
  }

  const validateDeposit = () => {
    if (!depositData.amount || Number.parseFloat(depositData.amount) <= 0) {
      setError("Please enter a valid amount")
      return false
    }
    if (!depositData.card_number || depositData.card_number.length < 15) {
      setError("Please enter a valid card number")
      return false
    }
    if (!depositData.expiry || !/^\d{2}\/\d{2}$/.test(depositData.expiry)) {
      setError("Please enter a valid expiry date (MM/YY)")
      return false
    }
    if (!depositData.cvv || !/^\d{3,4}$/.test(depositData.cvv)) {
      setError("Please enter a valid CVV")
      return false
    }
    return true
  }

  const validateWithdrawal = () => {
    if (!withdrawalData.amount || Number.parseFloat(withdrawalData.amount) <= 0) {
      setError("Please enter a valid amount")
      return false
    }
    if (Number.parseFloat(withdrawalData.amount) > accountBalance) {
      setError("Insufficient funds")
      return false
    }
    if (!withdrawalData.account_number || withdrawalData.account_number.length < 8) {
      setError("Please enter a valid account number")
      return false
    }
    if (!withdrawalData.routing_number || withdrawalData.routing_number.length !== 9) {
      setError("Please enter a valid routing number")
      return false
    }
    return true
  }

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateDeposit()) {
      return
    }

    setIsProcessing(true)
    try {
      const depositAmount = Number.parseFloat(depositData.amount)
      const hCashAmount = usdToHCash(depositAmount)
      setAccountBalance((prevBalance) => prevBalance + hCashAmount)

      // Record the deposit transaction
      await recordTransaction("deposit", hCashAmount, `Deposit of ${formatHCash(hCashAmount)}`)

      setSuccess(`Deposit of ${formatHCash(hCashAmount)} processed successfully`)
    } catch (err) {
      setError("Failed to process deposit. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateWithdrawal()) {
      return
    }

    setIsProcessing(true)
    try {
      const withdrawalAmount = Number.parseFloat(withdrawalData.amount)
      setAccountBalance((prevBalance) => prevBalance - withdrawalAmount)
      const usdAmount = hCashToUSD(withdrawalAmount)

      // Record the withdrawal transaction
      await recordTransaction("withdrawal", withdrawalAmount, `Withdrawal of ${formatHCash(withdrawalAmount)}`)

      setSuccess(
        `Withdrawal request of ${formatHCash(withdrawalAmount)} (${usdAmount.toFixed(2)} USD) submitted successfully`,
      )
    } catch (err) {
      setError("Failed to process withdrawal. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CoinIcon className="w-6 h-6" />
          Deposit or Withdraw HCash
        </CardTitle>
        <CardDescription>Manage deposits and withdrawals for your marketplace account</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="deposit" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Deposit HCash
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Withdraw HCash
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit">
            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (USD)</label>
                <div className="relative">
                  <CoinIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="amount"
                    type="number"
                    step="0.01"
                    value={depositData.amount}
                    onChange={handleDepositChange}
                    className="pl-9"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Card Number</label>
                <Input
                  name="card_number"
                  value={depositData.card_number}
                  onChange={handleDepositChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input
                    name="expiry"
                    value={depositData.expiry}
                    onChange={handleDepositChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">CVV</label>
                  <Input
                    name="cvv"
                    value={depositData.cvv}
                    onChange={handleDepositChange}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Name on Card</label>
                <Input
                  name="name"
                  value={depositData.name}
                  onChange={handleDepositChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Deposit HCash"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="withdraw">
            <form onSubmit={handleWithdrawal} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (HCash)</label>
                <div className="relative">
                  <CoinIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="amount"
                    type="number"
                    step="0.01"
                    value={withdrawalData.amount}
                    onChange={handleWithdrawalChange}
                    className="pl-9"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bank Name</label>
                <Input
                  name="bank_name"
                  value={withdrawalData.bank_name}
                  onChange={handleWithdrawalChange}
                  placeholder="Enter your bank name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Type</label>
                <Select
                  value={withdrawalData.account_type}
                  onValueChange={(value) => setWithdrawalData((prev) => ({ ...prev, account_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Number</label>
                <Input
                  name="account_number"
                  value={withdrawalData.account_number}
                  onChange={handleWithdrawalChange}
                  placeholder="Enter your account number"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Routing Number</label>
                <Input
                  name="routing_number"
                  value={withdrawalData.routing_number}
                  onChange={handleWithdrawalChange}
                  placeholder="Enter your routing number"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Withdraw HCash"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { PaymentProcessor }

