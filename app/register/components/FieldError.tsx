"use client"

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { validateField } from './StepValidation'
import { FormData } from '@/context/formContext'

interface FieldErrorProps {
  field: keyof FormData
  value: string
  showError?: boolean
}

export default function FieldError({ field, value, showError = true }: FieldErrorProps) {
  if (!showError) return null

  const errors = validateField(field, value)
  
  if (errors.length === 0) return null

  return (
    <div className="mt-1 space-y-1">
      {errors.map((error, index) => (
        <div key={index} className="flex items-center space-x-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ))}
    </div>
  )
}
