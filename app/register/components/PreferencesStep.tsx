"use client"

import React, { useContext } from 'react'
import { FormContext } from '@/context/formContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Target, HelpCircle, MessageSquare, Star } from 'lucide-react'
import StepValidation from './StepValidation'
import FieldError from './FieldError'

interface PreferencesStepProps {
  onValidationChange: (isValid: boolean) => void
}

export default function PreferencesStep({ onValidationChange }: PreferencesStepProps) {
  const { formData, setFormData } = useContext(FormContext)!
  const [isValid, setIsValid] = React.useState(false)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const requiredFields: (keyof typeof formData)[] = ['preference1', 'whyYou']

  const preferenceOptions = [
    'Tech Team Member',
    'Creative Team Member',
    'Operations Team Member',
    'Research Team Member',
    'Symposium Team Member',
    'FY Rep'
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Preferences & Motivation</h3>
        <p className="text-white">Help us understand your interests and goals</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <Label className="flex items-center space-x-2 text-base font-medium">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Area of Interest Preferences *</span>
              </Label>
              <p className="text-sm text-gray-600 mb-4">
                Select your top 3 areas of interest (in order of preference)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preference1" className="text-sm font-medium">
                    1st Preference *
                  </Label>
                  <Select value={formData.preference1} onValueChange={(value) => handleInputChange('preference1', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferenceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError field="preference1" value={formData.preference1} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preference2" className="text-sm font-medium">
                    2nd Preference
                  </Label>
                  <Select value={formData.preference2} onValueChange={(value) => handleInputChange('preference2', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferenceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError field="preference2" value={formData.preference2} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preference3" className="text-sm font-medium">
                    3rd Preference
                  </Label>
                  <Select value={formData.preference3} onValueChange={(value) => handleInputChange('preference3', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferenceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError field="preference3" value={formData.preference3} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="whyYou" className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-blue-600" />
                <span>Why do you want to join SMLRA? *</span>
              </Label>
              <Textarea
                id="whyYou"
                placeholder="Tell us about your motivation for joining SMLRA and what you hope to achieve..."
                value={formData.whyYou}
                onChange={(e) => handleInputChange('whyYou', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                required
              />
              <FieldError field="whyYou" value={formData.whyYou} />
              <p className="text-xs text-gray-500">
                Share your goals, expectations, and how you think SMLRA can help you grow
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="questions" className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Questions or Additional Information</span>
              </Label>
              <Textarea
                id="questions"
                placeholder="Do you have any questions about SMLRA or would you like to share additional information?"
                value={formData.questions}
                onChange={(e) => handleInputChange('questions', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
              />
              <FieldError field="questions" value={formData.questions} />
              <p className="text-xs text-gray-500">
                Optional: Ask questions or provide any additional context you think would be helpful
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <StepValidation 
        step={4} 
        requiredFields={requiredFields} 
        onValidationChange={(isValid) => {
          setIsValid(isValid)
          onValidationChange(isValid)
        }} 
      />
      
    </div>
  )
}
