import { MarketplaceItem } from "./MarketplaceItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for trending listings
const trendingListings = [
  {
    id: "t1",
    name: "Vintage Rolex Watch",
    description: "Rare 1960s Rolex Submariner in excellent condition",
    price: 15000,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "VintageTimepieces",
  },
  {
    id: "t2",
    name: "First Edition Book",
    description: "Signed first edition of a classic novel",
    price: 5000,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "RareBooks",
  },
  {
    id: "t3",
    name: "Antique Vase",
    description: "Ming Dynasty vase, authenticated and in perfect condition",
    price: 25000,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "AntiqueTreasures",
  },
  {
    id: "t4",
    name: "Vintage Camera",
    description: "1950s Leica M3 in working condition",
    price: 2000,
    imageUrl: "/placeholder.svg?height=200&width=300",
    seller: "RetroTech",
  },
]

export function TrendingListings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Trending</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {trendingListings.map((item) => (
            <MarketplaceItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

