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
  { id: 1, title: 'Personal Info', shortTitle: 'Personal', component: PersonalInfoStep },
  { id: 2, title: 'Academic Info', shortTitle: 'Academic', component: AcademicInfoStep },
  { id: 3, title: 'Professional Info', shortTitle: 'Professional', component: ProfessionalInfoStep },
  { id: 4, title: 'Preferences', shortTitle: 'Preferences', component: PreferencesStep },
  { id: 5, title: 'Review & Submit', shortTitle: 'Review', component: ReviewStep },
  { id: 6, title: 'Success', shortTitle: 'Success', component: SuccessStep },
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
      {/* Background Effects - Enhanced responsiveness */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0 grid-bg opacity-5"></div>
        {/* Floating Elements - Better responsive positioning */}
        <div className="absolute top-4 sm:top-10 lg:top-20 left-2 sm:left-4 lg:left-10 w-12 sm:w-16 lg:w-32 h-12 sm:h-16 lg:h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 sm:bottom-10 lg:bottom-20 right-2 sm:right-4 lg:right-10 w-16 sm:w-20 lg:w-40 h-16 sm:h-20 lg:h-40 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 lg:w-96 h-32 sm:h-48 lg:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-10 sm:top-20 lg:top-40 right-1/4 w-16 sm:w-24 lg:w-48 h-16 sm:h-24 lg:h-48 bg-pink-500/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 lg:bottom-40 left-1/4 w-20 sm:w-28 lg:w-56 h-20 sm:h-28 lg:h-56 bg-blue-500/8 rounded-full blur-2xl"></div>
      </div>

      <div className="min-h-screen py-4 sm:py-6 lg:py-12 px-2 sm:px-4 pt-20 sm:pt-4">
        <div className="max-w-5xl mx-auto">
          {/* Mobile: Ultra-minimal header */}
          <div className="sm:hidden text-center mb-4 mt-4">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <h1 className="text-base font-bold text-white">Join SMLRA</h1>
            </div>
            <div className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full">
              {steps[currentStep - 1].title}
            </div>
          </div>

          {/* Desktop/Tablet: Full header with progress */}
          <div className="hidden sm:block">
            {/* Header */}
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mt-8 lg:mt-20 mb-2 px-2">
                Join SMLRA
              </h1>
              <p className="text-base lg:text-lg xl:text-xl text-gray-600 px-4">
                Complete your registration in a few simple steps
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-6 lg:mb-8">
              <div className="w-full max-w-4xl px-4">
                <div className="flex items-center justify-center space-x-2 lg:space-x-4 overflow-x-auto pb-2">
                  {steps.slice(0, -1).map((step, index) => (
                    <div key={step.id} className="flex items-center flex-shrink-0">
                      <button
                        onClick={() => goToStep(step.id)}
                        className={`flex items-center justify-center w-8 lg:w-10 h-8 lg:h-10 rounded-full border-2 transition-all duration-200 text-sm lg:text-base font-medium ${
                          currentStep === step.id
                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg scale-110'
                            : completedSteps.includes(step.id)
                              ? 'border-green-500 bg-green-500 text-white shadow-md'
                              : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                        }`}
                        aria-label={`Go to step ${step.id}: ${step.title}`}
                        suppressHydrationWarning={true}
                      >
                        {completedSteps.includes(step.id) ? (
                          <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5" />
                        ) : (
                          step.id
                        )}
                      </button>
                      {index < steps.length - 2 && (
                        <div
                          className={`w-8 lg:w-16 h-0.5 mx-2 transition-all duration-200 ${
                            completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Labels */}
            <div className="flex justify-center mb-6 lg:mb-8">
              <div className="w-full max-w-4xl px-4">
                <div className="flex items-center justify-center space-x-4 lg:space-x-16">
                  {steps.slice(0, -1).map((step) => (
                    <div
                      key={step.id}
                      className={`text-sm lg:text-base font-medium transition-colors duration-200 text-center flex-shrink-0 ${
                        currentStep === step.id
                          ? 'text-blue-600 font-semibold'
                          : completedSteps.includes(step.id)
                            ? 'text-green-600'
                            : 'text-gray-500'
                      }`}
                    >
                      <span className="md:hidden">
                        {step.shortTitle}
                      </span>
                      <span className="hidden md:block">
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Container - Clean mobile design */}
          <Card className="shadow-xl mx-1 sm:mx-2 lg:mx-0 border-0 sm:border overflow-hidden">
            {/* Mobile: No header, just content */}
            <div className="sm:hidden">
              {/* No CardHeader on mobile to avoid duplication */}
            </div>
            
            {/* Desktop/Tablet: Show header */}
            <CardHeader className="hidden sm:block pb-4 lg:pb-6 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="text-xl lg:text-2xl xl:text-3xl text-center px-4">
                {/* Tablet: Step number + title */}
                <span className="lg:hidden">
                  Step {currentStep}: {steps[currentStep - 1].shortTitle || steps[currentStep - 1].title}
                </span>
                {/* Desktop: Full title */}
                <span className="hidden lg:block">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 xl:p-8">
              {/* Error Display - Enhanced responsive styling */}
              {submitError && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm sm:text-base">{submitError}</p>
                </div>
              )}

              {/* Step Content - Responsive container */}
              <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
                <CurrentStepComponent onValidationChange={handleCurrentStepValidation} />
              </div>

              {/* Navigation Buttons - Enhanced responsive layout */}
              {currentStep !== 6 && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  {/* Mobile: Stacked buttons */}
                  <div className="flex flex-col space-y-3 sm:hidden">
                    <div className="order-1">
                      {currentStep < 5 ? (
                        <Button
                          onClick={nextStep}
                          disabled={!stepValidation[currentStep]}
                          className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <span>Next Step</span>
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          className="w-full h-12 text-base bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition-all duration-200"
                          onClick={handleSubmit}
                          disabled={!stepValidation[currentStep] || isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            'Submit Registration'
                          )}
                        </Button>
                      )}
                    </div>
                    <div className="order-2">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="w-full h-11 text-base border-2 hover:bg-gray-50 transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        <span>Previous</span>
                      </Button>
                    </div>
                  </div>

                  {/* Tablet and Desktop: Side by side buttons */}
                  <div className="hidden sm:flex justify-between items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2 h-11 lg:h-12 px-6 lg:px-8 text-sm lg:text-base border-2 hover:bg-gray-50 transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 lg:w-5 h-4 lg:h-5" />
                      <span>Previous</span>
                    </Button>

                    <div className="flex-1 flex justify-center lg:justify-end">
                      {currentStep < 5 ? (
                        <Button
                          onClick={nextStep}
                          disabled={!stepValidation[currentStep]}
                          className="flex items-center space-x-2 h-11 lg:h-12 px-6 lg:px-8 text-sm lg:text-base bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <span>Next Step</span>
                          <ChevronRight className="w-4 lg:w-5 h-4 lg:h-5" />
                        </Button>
                      ) : (
                        <Button
                          className="h-11 lg:h-12 px-6 lg:px-8 text-sm lg:text-base bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition-all duration-200"
                          onClick={handleSubmit}
                          disabled={!stepValidation[currentStep] || isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            'Submit Registration'
                          )}
                        </Button>
                      )}
                    </div>
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