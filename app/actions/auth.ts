"use server"

import { revalidatePath } from "next/cache"
import type { UserRegistrationData, VerificationData } from "../types/auth"
import { NotificationService } from "../services/notification-service"
import { SMSService } from "../services/sms-service"

// This would typically be stored in a database
const pendingRegistrations = new Map<string, UserRegistrationData>()

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function registerUser(userData: UserRegistrationData) {
  console.log(`Registering user: ${userData.email}`)

  // Generate and send verification code
  const verificationCode = generateVerificationCode()
  await SMSService.sendVerificationCode(userData.phoneNumber, verificationCode)

  // Store user data temporarily
  pendingRegistrations.set(userData.email, { ...userData, verificationCode })

  revalidatePath("/")
  return { success: true, message: "Verification code sent. Please check your phone." }
}

export async function verifyUser(verificationData: VerificationData) {
  console.log(`Verifying user: ${verificationData.email}`)

  const userData = pendingRegistrations.get(verificationData.email)

  if (!userData || userData.verificationCode !== verificationData.code) {
    return { success: false, message: "Invalid verification code." }
  }

  // Here you would typically save the user to your database
  console.log("User verified successfully:", userData)

  // Save notification preferences
  await NotificationService.savePreferences(userData.notificationPreferences)

  // Clear pending registration
  pendingRegistrations.delete(verificationData.email)

  revalidatePath("/")
  return { success: true, message: "Account verified successfully. You can now log in." }
}

export async function resendVerificationCode(email: string) {
  const userData = pendingRegistrations.get(email)

  if (!userData) {
    return { success: false, message: "No pending registration found." }
  }

  const newVerificationCode = generateVerificationCode()
  await SMSService.sendVerificationCode(userData.phoneNumber, newVerificationCode)

  // Update stored data with new verification code
  pendingRegistrations.set(email, { ...userData, verificationCode: newVerificationCode })

  return { success: true, message: "New verification code sent. Please check your phone." }
}

