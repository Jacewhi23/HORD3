export type NotificationType = "transaction" | "security" | "marketing" | "system"

export interface NotificationPreferences {
  email: string
  transaction_alerts: boolean
  security_alerts: boolean
  marketing_updates: boolean
  system_notifications: boolean
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  recipientEmail: string
}

