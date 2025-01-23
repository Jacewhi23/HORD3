"use client"

import { useState, useEffect } from "react"
import { MarketplaceItem } from "../components/MarketplaceItem"
import { MarketplaceFilters } from "../components/MarketplaceFilters"
import { fetchMarketplaceListings } from "../actions"
import { Navigation } from "../components/Navigation"

interface MarketplaceFilters {
  searchTerm: string
  seller: string
  cardSet: string
}

export default function Marketplace() {
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState<MarketplaceFilters>({
    searchTerm: "",
    seller: "",
    cardSet: "",
  })

  useEffect(() => {
    async function loadListings() {
      const listings = await fetchMarketplaceListings()
      setItems(listings)
    }
    loadListings()
  }, [])

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !filters.searchTerm ||
      item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(filters.searchTerm.toLowerCase())

    const matchesSeller = !filters.seller || item.seller.toLowerCase().includes(filters.seller.toLowerCase())

    const matchesSet = !filters.cardSet || item.cardSet?.toLowerCase() === filters.cardSet.toLowerCase()

    return matchesSearch && matchesSeller && matchesSet
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
        <MarketplaceFilters onFiltersChange={setFilters} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {filteredItems.map((item) => (
            <MarketplaceItem key={item.id} item={item} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No items found matching your filters.</div>
        )}
      </div>
    </div>
  )
}

