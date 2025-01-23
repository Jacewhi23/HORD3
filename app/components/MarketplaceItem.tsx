import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatHCash } from "../utils/currency"
import { PurchaseModal } from "./PurchaseModal"
import { useToast } from "@/components/ui/use-toast"
import { Heart } from "lucide-react"

interface MarketplaceItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  seller: string
}

interface MarketplaceItemProps {
  item: MarketplaceItem
}

export function MarketplaceItem({ item }: MarketplaceItemProps) {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const { toast } = useToast()

  const handleBuyNow = () => {
    setIsPurchaseModalOpen(true)
  }

  const handlePurchaseConfirm = () => {
    setIsPurchaseModalOpen(false)
    toast({
      title: "Purchase Successful",
      description: `You have successfully purchased ${item.name}`,
    })
  }

  return (
    <>
      <Card className="w-[250px] relative group">
        <button className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4" />
        </button>
        <div className="relative w-full h-[250px]">
          <Image
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 min-h-[40px]">{item.name}</h3>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground line-clamp-1">Seller: {item.seller}</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{formatHCash(item.price)}</p>
              <Button size="sm" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <PurchaseModal
        item={item}
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onConfirm={handlePurchaseConfirm}
      />
    </>
  )
}

