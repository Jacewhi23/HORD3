import { Navigation } from "./components/Navigation"
import { TrendingListings } from "./components/TrendingListings"
import { RecommendedListings } from "./components/RecommendedListings"

export default function Featured() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-hord-gradient">Featured</h1>

        <div className="space-y-8">
          <TrendingListings />
          <RecommendedListings />
        </div>
      </main>
    </div>
  )
}

