// This is a mock SMS service. In a real application, you would integrate with an actual SMS provider.
export const SMSService = {
  sendVerificationCode: async (phoneNumber: string, code: string) => {
    console.log(`Sending verification code ${code} to ${phoneNumber}`)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return true
  },
}

