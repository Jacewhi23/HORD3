export interface UserRegistrationData {
  email: string
  password: string
  name: string
  phoneNumber: string
  notificationPreferences: NotificationPreferences
}

export interface VerificationData {
  email: string
  code: string
}

