import type { Notification, NotificationPreferences, NotificationType } from "../types/notification"

// In a real app, this would interact with your email service provider (e.g., SendGrid, AWS SES)
export async function sendEmail(to: string, subject: string, content: string) {
  console.log(`Sending email to ${to}:`, { subject, content })
  // Implement actual email sending logic here
  return true
}

// In a real app, this would be stored in a database
const notificationPreferences = new Map<string, NotificationPreferences>()
const notifications = new Map<string, Notification[]>()

export const NotificationService = {
  // Save user notification preferences
  async savePreferences(preferences: NotificationPreferences): Promise<void> {
    notificationPreferences.set(preferences.email, preferences)
    console.log(`Saved preferences for ${preferences.email}:`, preferences)
  },

  // Get user notification preferences
  async getPreferences(email: string): Promise<NotificationPreferences | null> {
    return notificationPreferences.get(email) || null
  },

  // Send a notification
  async sendNotification(
    recipientEmail: string,
    type: NotificationType,
    title: string,
    message: string,
  ): Promise<void> {
    const preferences = await this.getPreferences(recipientEmail)
    if (!preferences) {
      throw new Error("User preferences not found")
    }

    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      recipientEmail,
    }

    // Store the notification
    const userNotifications = notifications.get(recipientEmail) || []
    userNotifications.push(notification)
    notifications.set(recipientEmail, userNotifications)

    // Check if user wants email notifications for this type
    const shouldSendEmail =
      preferences[`${type}_alerts`] || preferences[`${type}_notifications`] || preferences[`${type}_updates`]

    if (shouldSendEmail) {
      await sendEmail(recipientEmail, title, message)
    }
  },

  // Get user's notifications
  async getNotifications(email: string): Promise<Notification[]> {
    return notifications.get(email) || []
  },

  // Mark notification as read
  async markAsRead(email: string, notificationId: string): Promise<void> {
    const userNotifications = notifications.get(email) || []
    const notification = userNotifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
      notifications.set(email, userNotifications)
    }
  },
}

