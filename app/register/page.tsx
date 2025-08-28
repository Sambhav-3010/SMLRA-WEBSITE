"use client"
import React, { useCallback, useEffect, useState } from 'react'
import PersonalInfoStep from './components/PersonalInfoStep'
import AcademicInfoStep from './components/AcademicInfoStep'
import ProfessionalInfoStep from './components/ProfessionalInfoStep'
import PreferencesStep from './components/PreferencesStep'
import ReviewStep from './components/ReviewStep'
import SuccessStep from './components/SuccessStep'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { useContext } from "react";
import { FormContext , FormData } from '@/context/formContext'

const steps = [
  { id: 1, title: 'Personal Info', component: PersonalInfoStep },
  { id: 2, title: 'Academic Info', component: AcademicInfoStep },
  { id: 3, title: 'Professional Info', component: ProfessionalInfoStep },
  { id: 4, title: 'Preferences', component: PreferencesStep },
  { id: 5, title: 'Review & Submit', component: ReviewStep },
  { id: 6, title: 'Success', component: SuccessStep },
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [stepValidation, setStepValidation] = useState<{ [key: number]: boolean }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  // Fixed: Use correct destructuring from context
  const { formData } = useContext(FormContext)!

  // Initialize validation map once
  useEffect(() => {
    const initialValidation: { [key: number]: boolean } = {}
    for (let i = 1; i <= 5; i++) {
      initialValidation[i] = false
    }
    setStepValidation(initialValidation)
  }, [])

  // Stable updater for validation state (identity won't change)
  const handleStepValidation = useCallback((step: number, isValid: boolean) => {
    setStepValidation(prev => {
      // Avoid updating state unnecessarily
      if (prev[step] === isValid) return prev
      return {
        ...prev,
        [step]: isValid,
      }
    })
  }, [])

  // Stable callback for the *current* step that children can call
  // This callback will change identity only when currentStep changes
  const handleCurrentStepValidation = useCallback(
    (isValid: boolean) => {
      handleStepValidation(currentStep, isValid)
    },
    [currentStep, handleStepValidation]
  )

  const nextStep = () => {
    // only move forward if current step is valid
    if (currentStep < steps.length && stepValidation[currentStep]) {
      setCurrentStep(prev => prev + 1)
      setCompletedSteps(prev => (prev.includes(currentStep) ? prev : [...prev, currentStep]))
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null); // Clear previous errors
    
    try {
      console.log('Submitting form data:', formData);
      
      // Fixed: Use correct API endpoint
      const response = await fetch('/api/formSubmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('API Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Submission failed')
      }

      setIsSubmitted(true)
      setCurrentStep(6) // Go to success step
      
    } catch (error: any) {
      console.error('Submission error:', error)
      setSubmitError(error.message || 'An error occurred during submission')
    } finally {
      setIsSubmitting(false)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => (prev > 1 ? prev - 1 : prev))
  }

  const goToStep = (step: number) => {
    // allow going to success, first step, or to any step that is unlocked (previous completed)
    if (step === 6 || completedSteps.includes(step - 1) || step === 1) {
      setCurrentStep(step)
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0 grid-bg opacity-5"></div>
        {/* Floating Elements - Responsive sizes */}
        <div className="absolute top-10 md:top-20 left-4 md:left-10 w-16 md:w-32 h-16 md:h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-20 md:w-40 h-20 md:h-40 bg-cyan-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-96 h-48 md:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 md:top-40 right-1/4 w-24 md:w-48 h-24 md:h-48 bg-pink-500/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 md:bottom-40 left-1/4 w-28 md:w-56 h-28 md:h-56 bg-blue-500/8 rounded-full blur-2xl"></div>
      </div>

      <div className="min-h-screen py-6 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header - Responsive text sizes */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mt-8 md:mt-20 mb-2">Join SMLRA</h1>
            <p className="text-base md:text-lg text-gray-600">Complete your registration in a few simple steps</p>
          </div>

          {/* Progress Steps - Mobile friendly */}
          <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto">
            <div className="flex items-center space-x-2 md:space-x-4 px-4 md:px-0 min-w-max">
              {steps.slice(0, -1).map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex items-center justify-center w-8 md:w-10 h-8 md:h-10 rounded-full border-2 transition-all duration-200 text-xs md:text-base ${currentStep === step.id
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : completedSteps.includes(step.id)
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-500'
                      }`}
                    aria-label={`Go to step ${step.id}`}
                    suppressHydrationWarning={true}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-3 md:w-5 h-3 md:h-5" />
                    ) : (
                      step.id
                    )}
                  </button>
                  {index < steps.length - 2 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 transition-all duration-200 ${completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Labels - Responsive layout */}
          <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto">
            <div className="flex space-x-4 md:space-x-16 px-4 md:px-0 min-w-max">
              {steps.slice(0, -1).map((step) => (
                <div
                  key={step.id}
                  className={`text-xs md:text-sm font-medium transition-colors duration-200 text-center whitespace-nowrap ${currentStep === step.id
                    ? 'text-blue-600'
                    : completedSteps.includes(step.id)
                      ? 'text-green-600'
                      : 'text-gray-500'
                    }`}
                >
                  {/* Show abbreviated titles on mobile */}
                  <span className="md:hidden">
                    {step.title.split(' ')[0]}
                  </span>
                  <span className="hidden md:inline">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Container - Responsive padding and margins */}
          <Card className="shadow-xl mx-2 md:mx-0">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="text-xl md:text-2xl text-center px-2">
                <span className="block md:hidden">
                  Step {currentStep}
                </span>
                <span className="hidden md:block">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </span>
                <div className="block md:hidden text-base font-normal text-gray-600 mt-1">
                  {steps[currentStep - 1].title}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              {/* Error Display */}
              {submitError && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{submitError}</p>
                </div>
              )}

              {/* Pass the stable callback (avoid inline arrow here) */}
              <CurrentStepComponent onValidationChange={handleCurrentStepValidation} />

              {/* Navigation Buttons - Responsive layout */}
              {currentStep !== 6 && (
                <div className="flex flex-col sm:flex-row justify-between mt-6 md:mt-8 pt-4 md:pt-6 border-t space-y-3 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center justify-center space-x-2 w-full sm:w-auto order-2 sm:order-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex items-center justify-center w-full sm:w-auto order-1 sm:order-2">
                    {currentStep < 5 ? (
                      <Button
                        onClick={nextStep}
                        disabled={!stepValidation[currentStep]}
                        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 w-full sm:w-auto"
                        onClick={handleSubmit}
                        disabled={!stepValidation[currentStep] || isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}