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
      <div className="flex justify-between items-start py-2">
        <span className="font-medium text-blue-600">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        <div className="text-right max-w-xs">
          {value ? (
            isUrl ? (
              <a 
                href={value} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-words"
              >
                {value}
              </a>
            ) : (
              <span className="text-white break-words">{value}</span>
            )
          ) : (
            <span className="text-red-500 text-sm">Not provided</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Review Your Information</h3>
        <p className="text-gray-600">Please review all the information before submitting your registration</p>
      </div>

      {/* Completion Status */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span>Registration Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Completion</span>
              <span className="text-lg font-bold text-blue-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center space-x-2">
              {completionPercentage === 100 ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className="text-sm text-gray-600">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <User className="w-5 h-5 text-blue-600" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {renderField('First Name', formData.firstName, true)}
          {renderField('Last Name', formData.lastName, true)}
          {renderField('Email', formData.email, true)}
          {renderField('Phone Number', formData.phone, true)}
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>Academic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {renderField('Roll Number', formData.rollNo, true)}
          {renderField('Current Year', formData.year, true)}
          {renderField('Branch/Department', formData.branch, true)}
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Professional Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {renderField('Resume/CV Link', formData.resume, true)}
          {renderField('LinkedIn Profile', formData.linkedin)}
          {renderField('GitHub Profile', formData.github)}
          {renderField('About You', formData.about, true)}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Preferences & Motivation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {renderField('1st Preference', formData.preference1, true)}
          {renderField('2nd Preference', formData.preference2)}
          {renderField('3rd Preference', formData.preference3)}
          {renderField('Why Join SMLRA', formData.whyYou, true)}
          {renderField('Questions/Additional Info', formData.questions)}
        </CardContent>
      </Card>

    </div>
  )
}
