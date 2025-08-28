"use client"

import React, { useContext } from 'react'
import { FormContext } from '@/context/formContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GraduationCap, Hash, Calendar, Building } from 'lucide-react'
import StepValidation from './StepValidation'
import FieldError from './FieldError'

interface AcademicInfoStepProps {
  onValidationChange: (isValid: boolean) => void
}

export default function AcademicInfoStep({ onValidationChange }: AcademicInfoStepProps) {
  const { formData, setFormData } = useContext(FormContext)!
  const [isValid, setIsValid] = React.useState(false)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const requiredFields: (keyof typeof formData)[] = ['rollNo', 'year', 'branch']

  const years = ['1st', '2nd', '3rd']
  const branches = [
    'CE',
    'IT',
    'EXTC',
    'ME',
    'RAI',
    'EXCP',
    'AIDS',
    'CCE',
    'VLSI',
    'VLSI',
    'CSBS',
    'Other'
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Academic Information</h3>
        <p className="text-white">Tell us about your academic background</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="rollNo" className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-blue-600" />
                <span>Roll Number *</span>
              </Label>
              <Input
                id="rollNo"
                type="text"
                placeholder="Enter your roll number"
                value={formData.rollNo}
                onChange={(e) => handleInputChange('rollNo', e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
              <FieldError field="rollNo" value={formData.rollNo} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="year" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Current Year *</span>
              </Label>
              <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError field="year" value={formData.year} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label htmlFor="branch" className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Branch/Department *</span>
              </Label>
              <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError field="branch" value={formData.branch} />
            </div>
          </CardContent>
        </Card>
      </div>

      <StepValidation 
        step={2} 
        requiredFields={requiredFields} 
        onValidationChange={(isValid) => {
          setIsValid(isValid)
          onValidationChange(isValid)
        }} 
      />
    </div>
  )
}
