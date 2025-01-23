"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for card sets
const cardSets = [
  "Brilliant Stars",
  "Fusion Strike",
  "Evolving Skies",
  "Chilling Reign",
  "Battle Styles",
  "Shining Fates",
  "Vivid Voltage",
]

interface MarketplaceFilters {
  searchTerm: string
  seller: string
  cardSet: string
}

interface MarketplaceFiltersProps {
  onFiltersChange: (filters: MarketplaceFilters) => void
}

export function MarketplaceFilters({ onFiltersChange }: MarketplaceFiltersProps) {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    searchTerm: "",
    seller: "",
    cardSet: "",
  })

  const handleFilterChange = (key: keyof MarketplaceFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      searchTerm: "",
      seller: "",
      cardSet: "",
    }
    setFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed left-4 top-20 z-30 rounded-full w-12 h-12">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
              className="pl-8"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="seller">
              <AccordionTrigger>Seller</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <Label htmlFor="seller">Seller name</Label>
                  <Input
                    id="seller"
                    placeholder="Enter seller name"
                    value={filters.seller}
                    onChange={(e) => handleFilterChange("seller", e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="set">
              <AccordionTrigger>Card Set</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <Label htmlFor="cardSet">Select set</Label>
                  <Select value={filters.cardSet} onValueChange={(value) => handleFilterChange("cardSet", value)}>
                    <SelectTrigger id="cardSet">
                      <SelectValue placeholder="Choose a set" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardSets.map((set) => (
                        <SelectItem key={set} value={set.toLowerCase()}>
                          {set}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button onClick={handleReset} variant="outline" className="w-full">
            <X className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

