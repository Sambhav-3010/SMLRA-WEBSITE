"use client"

import React, { useContext } from 'react'
import { FormContext } from '@/context/formContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Linkedin, Github, User } from 'lucide-react'
import StepValidation from './StepValidation'
import FieldError from './FieldError'

interface ProfessionalInfoStepProps {
  onValidationChange: (isValid: boolean) => void
}

export default function ProfessionalInfoStep({ onValidationChange }: ProfessionalInfoStepProps) {
  const { formData, setFormData } = useContext(FormContext)!
  const [isValid, setIsValid] = React.useState(false)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const requiredFields: (keyof typeof formData)[] = ['resume', 'about']

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Professional Information</h3>
        <p className="text-white">Share your professional profile and experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="resume" className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Resume/CV Link *</span>
              </Label>
              <div className="space-y-2">
                <Input
                  id="resume"
                  type="url"
                  placeholder="https://drive.google.com/file/d/your-file-id/view"
                  value={formData.resume}
                  onChange={(e) => handleInputChange('resume', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {formData.resume && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <FileText className="w-4 h-4" />
                    <span>✓ Resume link added</span>
                  </div>
                )}
              </div>
              <FieldError field="resume" value={formData.resume} />
              <div className="space-y-2">
                <p className="text-xs text-gray-500">
                  Please upload your resume to Google Drive and share the link. 
                  Make sure the link is set to "Anyone with the link can view".
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700 font-medium mb-1">How to get Google Drive link:</p>
                  <ol className="text-xs text-blue-600 space-y-1 list-decimal list-inside">
                    <li>Upload your resume to Google Drive</li>
                    <li>Right-click on the file → "Share" → "Copy link"</li>
                    <li>Make sure it's set to "Anyone with the link can view"</li>
                    <li>Paste the link above</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="linkedin" className="flex items-center space-x-2">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span>LinkedIn Profile</span>
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <FieldError field="linkedin" value={formData.linkedin} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="github" className="flex items-center space-x-2">
                <Github className="w-4 h-4 text-blue-600" />
                <span>GitHub Profile</span>
              </Label>
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <FieldError field="github" value={formData.github} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="about" className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>About You *</span>
              </Label>
              <Textarea
                id="about"
                placeholder="Tell us about yourself, your interests, skills, and what motivates you..."
                value={formData.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                required
              />
              <FieldError field="about" value={formData.about} />
              <p className="text-xs text-gray-500">
                Share your background, interests, and what you hope to gain from joining SMLRA
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <StepValidation 
        step={3} 
        requiredFields={requiredFields} 
        onValidationChange={(isValid) => {
          setIsValid(isValid)
          onValidationChange(isValid)
        }} 
      />
      
    </div>
  )
}