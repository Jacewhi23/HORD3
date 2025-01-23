"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { VerificationData } from "../types/auth"

interface VerificationFormProps {
  email: string
  onSubmit: (verificationData: VerificationData) => void
  onResend: () => void
}

export function VerificationForm({ email, onSubmit, onResend }: VerificationFormProps) {
  const [code, setCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, code })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify Your Account</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We've sent a verification code to your phone number. Please enter it below.
          </p>
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Enter 6-digit code"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full">
            Verify
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onResend}>
            Resend Code
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

