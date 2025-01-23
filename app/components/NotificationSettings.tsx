"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, ShieldAlert, Mail, Info } from "lucide-react"
import { updateNotificationPreferences, getNotificationPreferences } from "../actions/notifications"
import type { NotificationPreferences } from "../types/notification"
import { useToast } from "@/components/ui/use-toast"

interface NotificationSettingsProps {
  userEmail: string
}

export function NotificationSettings({ userEmail }: NotificationSettingsProps) {
  const { toast } = useToast()
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: userEmail,
    transaction_alerts: true,
    security_alerts: true,
    marketing_updates: false,
    system_notifications: true,
  })

  useEffect(() => {
    const loadPreferences = async () => {
      const result = await getNotificationPreferences(userEmail)
      if (result.success && result.data) {
        setPreferences(result.data)
      }
    }

    loadPreferences()
  }, [userEmail])

  const handleToggle = async (key: keyof NotificationPreferences) => {
    if (key === "email") return

    const newPreferences = {
      ...preferences,
      [key]: !preferences[key],
    }
    setPreferences(newPreferences)

    const result = await updateNotificationPreferences(newPreferences)
    if (result.success) {
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
      })
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      })
      // Revert the change
      setPreferences(preferences)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose how you want to be notified about different events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <Label htmlFor="transaction_alerts" className="font-medium">
                Transaction Alerts
              </Label>
              <p className="text-sm text-muted-foreground">Get notified about purchases, sales, and transfers</p>
            </div>
          </div>
          <Switch
            id="transaction_alerts"
            checked={preferences.transaction_alerts}
            onCheckedChange={() => handleToggle("transaction_alerts")}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-4">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <div>
              <Label htmlFor="security_alerts" className="font-medium">
                Security Alerts
              </Label>
              <p className="text-sm text-muted-foreground">Get notified about sign-ins and security updates</p>
            </div>
          </div>
          <Switch
            id="security_alerts"
            checked={preferences.security_alerts}
            onCheckedChange={() => handleToggle("security_alerts")}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <Label htmlFor="marketing_updates" className="font-medium">
                Marketing Updates
              </Label>
              <p className="text-sm text-muted-foreground">Receive news about products and feature updates</p>
            </div>
          </div>
          <Switch
            id="marketing_updates"
            checked={preferences.marketing_updates}
            onCheckedChange={() => handleToggle("marketing_updates")}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-4">
            <Info className="h-5 w-5 text-primary" />
            <div>
              <Label htmlFor="system_notifications" className="font-medium">
                System Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Get important system updates and announcements</p>
            </div>
          </div>
          <Switch
            id="system_notifications"
            checked={preferences.system_notifications}
            onCheckedChange={() => handleToggle("system_notifications")}
          />
        </div>
      </CardContent>
    </Card>
  )
}

