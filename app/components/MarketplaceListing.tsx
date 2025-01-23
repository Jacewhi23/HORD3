import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatHCash } from "../utils/currency"

interface Item {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

interface MarketplaceListingProps {
  item: Item
  onPurchase: (itemId: string) => void
}

export function MarketplaceListing({ item, onPurchase }: MarketplaceListingProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover mb-4"
        />
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        <p className="text-lg font-bold">{formatHCash(item.price)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onPurchase(item.id)} className="w-full">
          Purchase
        </Button>
      </CardFooter>
    </Card>
  )
}

