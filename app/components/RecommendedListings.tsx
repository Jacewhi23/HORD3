import { MarketplaceItem } from "./MarketplaceItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for recommended listings
const recommendedListings = [
  {
    id: "r1",
    name: "Vintage Camera",
    description: "1950s Leica M3 in working condition",
    price: 2000,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "RetroTech",
  },
  {
    id: "r2",
    name: "Art Deco Lamp",
    description: "Original 1920s Art Deco table lamp",
    price: 1500,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "VintageDecor",
  },
  {
    id: "r3",
    name: "Rare Coin Collection",
    description: "Set of 10 rare coins from the 19th century",
    price: 3500,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "CoinCollector",
  },
  {
    id: "r4",
    name: "Antique Pocket Watch",
    description: "18k gold pocket watch from the early 1900s",
    price: 2800,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "TimelessTreasures",
  },
]

export function RecommendedListings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">You Might Like</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {recommendedListings.map((item) => (
            <MarketplaceItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

