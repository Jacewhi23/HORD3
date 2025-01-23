"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navigation } from "../components/Navigation"
import { ShippingManager } from "../components/ShippingManager"
import { useRouter } from "next/navigation"
import { UserIcon, BanknoteIcon, MessageCircleQuestionIcon as QuestionMarkCircleIcon, TruckIcon } from "lucide-react"

const settingsOptions = [
  { name: "Account Personalization", icon: UserIcon },
  { name: "Manage Funds", icon: BanknoteIcon },
  { name: "Shipping Management", icon: TruckIcon },
  { name: "Help", icon: QuestionMarkCircleIcon },
]

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const router = useRouter()

  const handleOptionClick = (optionName: string) => {
    if (optionName === "Manage Funds") {
      router.push("/manage-funds")
    } else {
      setSelectedOption(optionName)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {settingsOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center text-center"
              onClick={() => handleOptionClick(option.name)}
            >
              <option.icon className="h-6 w-6 mb-2" />
              {option.name}
            </Button>
          ))}
        </div>

        {selectedOption === "Shipping Management" && <ShippingManager />}
      </div>
    </div>
  )
}

