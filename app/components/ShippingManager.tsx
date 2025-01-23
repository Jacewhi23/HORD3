"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Truck, Mail } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ShippingManager = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    recipient_name: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    service_type: "standard",
    package_weight: "",
    tracking_email: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const validateForm = () => {
    if (!formData.recipient_name || formData.recipient_name.length < 2) {
      setError("Name must be at least 2 characters")
      return false
    }
    if (!formData.street_address || formData.street_address.length < 5) {
      setError("Please enter a valid street address")
      return false
    }
    if (!formData.city || formData.city.length < 2) {
      setError("Please enter a valid city")
      return false
    }
    if (!formData.state || formData.state.length !== 2) {
      setError("Please enter a valid state abbreviation")
      return false
    }
    if (!/^\d{5}(-\d{4})?$/.test(formData.zip_code)) {
      setError("Please enter a valid ZIP code")
      return false
    }
    if (!/^\d*\.?\d*$/.test(formData.package_weight)) {
      setError("Please enter a valid weight")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.tracking_email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
    setSuccess("")
  }

  const handleServiceTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service_type: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      // Here you would integrate with your chosen shipping service API
      // Example: await createShipment(formData);
      console.log("Shipping request:", formData)

      setSuccess("Shipping label has been generated and sent to your email.")
    } catch (err) {
      setError("Failed to create shipping request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-6 h-6" />
          Shipping Management
        </CardTitle>
        <CardDescription>Create shipping labels and track packages for marketplace items</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipient Name</label>
              <Input
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tracking Email</label>
              <Input
                name="tracking_email"
                type="email"
                value={formData.tracking_email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Street Address</label>
              <Input
                name="street_address"
                value={formData.street_address}
                onChange={handleInputChange}
                placeholder="123 Main St"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="CA"
                  maxLength={2}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">ZIP Code</label>
              <Input
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                placeholder="12345"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Package Weight (lbs)</label>
              <Input
                name="package_weight"
                type="number"
                step="0.1"
                value={formData.package_weight}
                onChange={handleInputChange}
                placeholder="0.0"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Shipping Service</label>
              <Select value={formData.service_type} onValueChange={handleServiceTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Standard (5-7 days)
                    </div>
                  </SelectItem>
                  <SelectItem value="express">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Express (2-3 days)
                    </div>
                  </SelectItem>
                  <SelectItem value="priority">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Priority (1-2 days)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Shipping Label..." : "Create Shipping Label"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ShippingManager

export { ShippingManager }

