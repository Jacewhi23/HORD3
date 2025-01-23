import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatHCash } from "../utils/currency"

interface PurchaseModalProps {
  item: {
    id: string
    name: string
    price: number
    imageUrl: string
  }
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function PurchaseModal({ item, isOpen, onClose, onConfirm }: PurchaseModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const fee = item.price * 0.02
  const total = item.price + fee

  const handleConfirm = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(false)
    onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
          <DialogDescription>Please review the details of your purchase below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <img
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">Item Price: {formatHCash(item.price)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Item Price:</span>
              <span>{formatHCash(item.price)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>HCash Fee (2%):</span>
              <span>{formatHCash(fee)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{formatHCash(total)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Confirm Purchase"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

