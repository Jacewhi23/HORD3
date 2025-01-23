"use client"

import { useState, useEffect } from "react"
import { VaultItem } from "../components/VaultItem"
import { fetchVaultItems, listVaultItem } from "../actions"
import { Navigation } from "../components/Navigation"
import { useToast } from "@/components/ui/use-toast"

export default function Vault() {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    async function loadVaultItems() {
      const vaultItems = await fetchVaultItems()
      setItems(vaultItems)
    }
    loadVaultItems()
  }, [])

  const handleListItem = async (itemId: string) => {
    const result = await listVaultItem(itemId)
    setMessage(result.message)
    // In a real app, you'd want to update the items list here
  }

  const handleWithdrawalRequest = (itemId: string) => {
    // In a real app, you'd send this request to your backend
    console.log(`Withdrawal requested for item ${itemId}`)
    toast({
      title: "Withdrawal Request Submitted",
      description: "The team has been notified of your withdrawal request.",
      duration: 5000,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Vault</h1>

        {message && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
            <p>{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <VaultItem
              key={item.id}
              item={item}
              onList={handleListItem}
              onWithdrawalRequest={handleWithdrawalRequest}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

