"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getUserNotifications, markNotificationAsRead } from "../actions/notifications"
import type { Notification } from "../types/notification"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NotificationBellProps {
  userEmail: string
}

export function NotificationBell({ userEmail }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const loadNotifications = async () => {
      const result = await getUserNotifications(userEmail)
      if (result.success && result.data) {
        setNotifications(result.data)
      }
    }

    loadNotifications()
    // Set up polling for new notifications
    const interval = setInterval(loadNotifications, 30000)
    return () => clearInterval(interval)
  }, [userEmail])

  const handleNotificationClick = async (notificationId: string) => {
    await markNotificationAsRead(userEmail, notificationId)
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Stay updated with your latest activities</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? "bg-background" : "bg-muted"
                  } cursor-pointer transition-colors hover:bg-accent`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

