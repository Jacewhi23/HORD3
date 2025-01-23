"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { NotificationPreferences } from "../types/notification"
import type { UserRegistrationData } from "../types/auth"

interface RegisterFormProps {
  onSubmit: (userData: UserRegistrationData) => void
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    email: "",
    transaction_alerts: true,
    security_alerts: true,
    marketing_updates: false,
    system_notifications: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      email,
      password,
      name,
      phoneNumber,
      notificationPreferences: {
        ...notificationPreferences,
        email,
      },
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setNotificationPreferences((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-sm font-medium">Notification Preferences</h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="transaction_alerts" className="text-sm">
                Transaction Alerts
              </Label>
              <Switch
                id="transaction_alerts"
                checked={notificationPreferences.transaction_alerts}
                onCheckedChange={(checked) =>
                  setNotificationPreferences((prev) => ({
                    ...prev,
                    transaction_alerts: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="security_alerts" className="text-sm">
                Security Alerts
              </Label>
              <Switch
                id="security_alerts"
                checked={notificationPreferences.security_alerts}
                onCheckedChange={(checked) =>
                  setNotificationPreferences((prev) => ({
                    ...prev,
                    security_alerts: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="marketing_updates" className="text-sm">
                Marketing Updates
              </Label>
              <Switch
                id="marketing_updates"
                checked={notificationPreferences.marketing_updates}
                onCheckedChange={(checked) =>
                  setNotificationPreferences((prev) => ({
                    ...prev,
                    marketing_updates: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="system_notifications" className="text-sm">
                System Notifications
              </Label>
              <Switch
                id="system_notifications"
                checked={notificationPreferences.system_notifications}
                onCheckedChange={(checked) =>
                  setNotificationPreferences((prev) => ({
                    ...prev,
                    system_notifications: checked,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

