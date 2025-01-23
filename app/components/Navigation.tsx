"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Package2Icon, ShoppingBagIcon, VaultIcon, SettingsIcon, MenuIcon, BanknoteIcon, UserIcon } from "lucide-react"
import { NotificationBell } from "./NotificationBell"
import { SignInModal } from "./SignInModal"
import { CreateAccountModal } from "./CreateAccountModal"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false)

  const navItems = [
    { name: "Featured", href: "/", icon: Package2Icon },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBagIcon },
    { name: "My Vault", href: "/vault", icon: VaultIcon },
    { name: "Manage Funds", href: "/manage-funds", icon: BanknoteIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ]

  return (
    <nav className="bg-white border-b shadow-sm pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-hord-gradient flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-22%20at%205.10.20%E2%80%AFPM-RxCO5nf8oaCAam1ahoJeS8v6AijbwJ.png"
                    alt="HORD"
                    width={32}
                    height={32}
                    className="w-6 h-6"
                  />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-hord-gradient">HORD</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NotificationBell userEmail="user@example.com" />
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <item.icon className="inline-block w-5 h-5 mr-1" />
                  {item.name}
                </Link>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => setIsSignInModalOpen(true)}>Sign In</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsCreateAccountModalOpen(true)}>Create Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Main menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => {
                setIsMenuOpen(false)
                setIsSignInModalOpen(true)
              }}
            >
              <UserIcon className="inline-block w-5 h-5 mr-2" />
              Sign In
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => {
                setIsMenuOpen(false)
                setIsCreateAccountModalOpen(true)
              }}
            >
              <UserIcon className="inline-block w-5 h-5 mr-2" />
              Create Account
            </Button>
          </div>
        </div>
      )}

      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
      <CreateAccountModal isOpen={isCreateAccountModalOpen} onClose={() => setIsCreateAccountModalOpen(false)} />
    </nav>
  )
}

