"use client"

import React from 'react'
import { FormContext } from '@/context/formContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Download, Share2 } from 'lucide-react'
import { useContext } from 'react'

export default function SuccessStep() {
  const { formData } = useContext(FormContext)!

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Registration Successful!</h2>
        <p className="text-lg text-white">
          Welcome to SMLRA! Your application has been submitted successfully.
        </p>
      </div>

      <div className="text-center">
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Return to Homepage
        </Button>
      </div>
    </div>
  )
}
