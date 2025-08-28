"use client"

import React, { useContext, useEffect } from 'react'
import { FormContext, FormData } from '@/context/formContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, AlertCircle, FileText, User, GraduationCap, Target, Star } from 'lucide-react'

interface ReviewStepProps {
  onValidationChange: (isValid: boolean) => void
}

export default function ReviewStep({ onValidationChange }: ReviewStepProps) {
  const { formData } = useContext(FormContext)!

  const requiredFields: (keyof FormData)[] = [
    'firstName', 'lastName', 'email', 'rollNo', 'year', 'branch', 
    'phone', 'resume', 'about', 'preference1', 'whyYou'
  ]

  // Validate the review step and notify parent
  useEffect(() => {
    const isValid = requiredFields.every(field => 
      formData[field] && formData[field].trim() !== ''
    )
    onValidationChange(isValid)
  }, [formData, requiredFields, onValidationChange])

  const isFieldComplete = (field: keyof FormData) => {
    return formData[field] && formData[field].trim() !== ''
  }

  const getCompletionPercentage = () => {
    const completedFields = requiredFields.filter(field => isFieldComplete(field))
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  const completionPercentage = getCompletionPercentage()

  const renderField = (label: string, value: string, required: boolean = false) => {
    const isUrl = value && (value.startsWith('http://') || value.startsWith('https://'))
    
    return (
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 py-3 sm:py-2 min-w-0">
        <span className="font-medium text-blue-600 text-sm sm:text-base flex-shrink-0 sm:w-1/3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        <div className="sm:text-right w-full sm:w-2/3 min-w-0 overflow-hidden">
          {value ? (
            isUrl ? (
              <a 
                href={value} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all text-sm sm:text-base inline-block w-full"
                style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
              >
                {value}
              </a>
            ) : (
              <span 
                className="text-gray-800 text-sm sm:text-base leading-relaxed inline-block w-full"
                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
              >
                {value}
              </span>
            )
          ) : (
            <span className="text-red-500 text-xs sm:text-sm font-medium">Not provided</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
            Review Your Information
          </h3>
          <p className="text-sm sm:text-base text-gray-600 px-2 sm:px-0">
            Please review all the information before submitting your registration
          </p>
        </div>

        {/* Completion Status */}
        <Card className="border-2 shadow-sm">
          <CardHeader className="pb-3 px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span>Registration Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Completion</span>
                <span className="text-lg sm:text-xl font-bold text-blue-600">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center space-x-2">
                {completionPercentage === 100 ? (
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {completionPercentage === 100 
                    ? 'All required fields are completed!' 
                    : `${requiredFields.length - requiredFields.filter(isFieldComplete).length} required fields remaining`
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="shadow-sm">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-1">
            {renderField('First Name', formData.firstName, true)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('Last Name', formData.lastName, true)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('Email', formData.email, true)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('Phone Number', formData.phone, true)}
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="shadow-sm">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span>Academic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-1">
            {renderField('Roll Number', formData.rollNo, true)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('Current Year', formData.year, true)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('Branch/Department', formData.branch, true)}
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span>Professional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-1 overflow-hidden">
            {renderField('Resume/CV Link', formData.resume, true)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('LinkedIn Profile', formData.linkedin)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('GitHub Profile', formData.github)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            <div className="border-t pt-3 sm:border-none sm:pt-0">
              {renderField('About You', formData.about, true)}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span>Preferences & Motivation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-1 overflow-hidden">
            {renderField('1st Preference', formData.preference1, true)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('2nd Preference', formData.preference2)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            {renderField('3rd Preference', formData.preference3)}
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            <div className="border-t pt-3 sm:border-none sm:pt-0">
              {renderField('Why Join SMLRA', formData.whyYou, true)}
            </div>
            <div className="hidden sm:block">
              <Separator className="my-2" />
            </div>
            <div className="border-t pt-3 sm:border-none sm:pt-0">
              {renderField('Questions/Additional Info', formData.questions)}
            </div>
          </CardContent>
        </Card>

        {/* Bottom spacing for mobile */}
        <div className="h-4 sm:h-6"></div>
      </div>
    </div>
  )
}