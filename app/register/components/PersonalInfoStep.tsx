"use client"

import React, { useContext } from 'react'
import { FormContext } from '@/context/formContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { User, Mail, Phone } from 'lucide-react'
import StepValidation from './StepValidation'
import FieldError from './FieldError'

interface PersonalInfoStepProps {
  onValidationChange: (isValid: boolean) => void
}

export default function PersonalInfoStep({ onValidationChange }: PersonalInfoStepProps) {
  const { formData, setFormData } = useContext(FormContext)!
  const [isValid, setIsValid] = React.useState(false)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const requiredFields: (keyof typeof formData)[] = ['firstName', 'lastName', 'email', 'phone']

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
        <p className="text-gray-600">Please provide your basic personal details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="firstName" className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>First Name *</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <FieldError field="firstName" value={formData.firstName} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="lastName" className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Last Name *</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <FieldError field="lastName" value={formData.lastName} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email Address *</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <FieldError field="email" value={formData.email} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <FieldError field="phone" value={formData.phone} />
            </div>
          </CardContent>
        </Card>
      </div>

      <StepValidation 
        step={1} 
        requiredFields={requiredFields} 
        onValidationChange={(isValid) => {
          setIsValid(isValid)
          onValidationChange(isValid)
        }} 
      />
    </div>
  )
}
