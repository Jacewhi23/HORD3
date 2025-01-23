"use server"

import { NotificationService } from "../services/notification-service"
import { type NotificationPreferences, Notification } from "../types/notification"
import { revalidatePath } from "next/cache"

export async function updateNotificationPreferences(preferences: NotificationPreferences) {
  try {
    await NotificationService.savePreferences(preferences)
    revalidatePath("/settings")
    return { success: true, message: "Notification preferences updated successfully" }
  } catch (error) {
    return { success: false, message: "Failed to update notification preferences" }
  }
}

export async function getNotificationPreferences(email: string) {
  try {
    const preferences = await NotificationService.getPreferences(email)
    return { success: true, data: preferences }
  } catch (error) {
    return { success: false, message: "Failed to fetch notification preferences" }
  }
}

export async function getUserNotifications(email: string) {
  try {
    const notifications = await NotificationService.getNotifications(email)
    return { success: true, data: notifications }
  } catch (error) {
    return { success: false, message: "Failed to fetch notifications" }
  }
}

export async function markNotificationAsRead(email: string, notificationId: string) {
  try {
    await NotificationService.markAsRead(email, notificationId)
    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    return { success: false, message: "Failed to mark notification as read" }
  }
}

export async function sendSystemNotification(email: string, title: string, message: string) {
  try {
    await NotificationService.sendNotification(email, "system", title, message)
    return { success: true }
  } catch (error) {
    return { success: false, message: "Failed to send notification" }
  }
}

