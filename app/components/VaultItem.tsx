import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatHCash } from "../utils/currency"

interface VaultItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  status: "processing" | "ready" | "listed"
}

interface VaultItemProps {
  item: VaultItem
  onList: (itemId: string) => void
  onWithdrawalRequest: (itemId: string) => void
}

export function VaultItem({ item, onList, onWithdrawalRequest }: VaultItemProps) {
  return (
    <Card className="w-[250px]">
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
          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{formatHCash(item.price)}</p>
                <p className={`text-xs ${item.status === "ready" ? "text-green-500" : "text-yellow-500"}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </p>
              </div>
              <Button size="sm" onClick={() => onList(item.id)} disabled={item.status !== "ready"}>
                {item.status === "listed" ? "Update" : "List"}
              </Button>
            </div>
            <Button size="sm" onClick={() => onWithdrawalRequest(item.id)} variant="outline" className="w-full">
              Request Item Withdrawal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

