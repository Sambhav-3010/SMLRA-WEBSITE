"use client";

import React, { useContext } from "react";
import { FormContext, type FormData } from "@/context/formContext";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define all possible validation errors
export const VALIDATION_ERRORS: Record<
  keyof FormData,
  Record<string, string>
> = {
  firstName: {
    required: "First name is required",
    minLength: "First name must be at least 2 characters",
    maxLength: "First name must be less than 50 characters",
    pattern: "First name can only contain letters and spaces",
  },
  lastName: {
    required: "Last name is required",
    minLength: "Last name must be at least 2 characters",
    maxLength: "Last name must be less than 50 characters",
    pattern: "Last name can only contain letters and spaces",
  },
  email: {
    required: "Email address is required",
    pattern: "Please enter a valid @somaiya.edu email address",
    maxLength: "Email address must be less than 100 characters",
  },
  phone: {
    required: "Phone number is required",
    pattern: "Please enter a valid phone number",
    minLength: "Phone number must be at least 10 digits",
    maxLength: "Phone number must be less than 15 digits",
  },
  rollNo: {
    required: "Roll number is required",
    pattern: "Roll number can only contain letters, numbers, and hyphens",
    minLength: "Roll number must be at least 3 characters",
    maxLength: "Roll number must be less than 20 characters",
  },
  year: {
    required: "Please select your current year",
    invalid: "Please select a valid year",
  },
  branch: {
    required: "Please select your branch/department",
    invalid: "Please select a valid branch",
  },
  resume: {
    required: "Resume/CV link is required",
    pattern: "Please enter a valid Google Drive link",
    maxLength: "Resume link must be less than 500 characters",
  },
  linkedin: {
    pattern: "Please enter a valid LinkedIn profile URL",
    maxLength: "LinkedIn URL must be less than 200 characters",
  },
  github: {
    pattern: "Please enter a valid GitHub profile URL",
    maxLength: "GitHub URL must be less than 200 characters",
  },
  about: {
    required: "Please tell us about yourself",
    minLength: "About section must be at least 50 characters",
    maxLength: "About section must be less than 500 characters",
  },
  preference1: {
    required: "Please select your 1st preference",
    invalid: "Please select a valid preference",
  },
  preference2: {
    invalid: "Please select a valid preference",
  },
  preference3: {
    invalid: "Please select a valid preference",
  },
  whyYou: {
    required: "Please tell us why you want to join SMLRA",
    minLength: "Response must be at least 30 characters",
    maxLength: "Response must be less than 300 characters",
  },
  questions: {
    maxLength: "Questions must be less than 200 characters",
  },
};

// Validation rules for each field
export const VALIDATION_RULES: Record<
  keyof FormData,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  }
> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
  },
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@somaiya\.edu$/,
    maxLength: 100,
  },
  phone: {
    required: true,
    pattern: /^[\d\s\-\+\(\)]+$/,
    minLength: 10,
    maxLength: 15,
  },
  rollNo: {
    required: true,
    pattern: /^[a-zA-Z0-9\-]+$/,
    minLength: 3,
    maxLength: 20,
  },
  year: {
    required: true,
  },
  branch: {
    required: true,
  },
  // /^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]{21,}\/?$/
  resume: {
    required: true,
    pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
    maxLength: 500,
  },
  linkedin: {
    pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/,
    maxLength: 200,
  },
  github: {
    pattern: /^https?:\/\/(www\.)?github\.com\/[\w\-]+\/?$/,
    maxLength: 200,
  },
  about: {
    required: true,
    minLength: 50,
    maxLength: 500,
  },
  preference1: {
    required: true,
  },
  preference2: {
    required: false,
  },
  preference3: {
    required: false,
  },
  whyYou: {
    required: true,
    minLength: 30,
    maxLength: 300,
  },
  questions: {
    maxLength: 200,
  },
};

// Function to validate a single field
export const validateField = (
  field: keyof FormData,
  value: string
): string[] => {
  const rules = VALIDATION_RULES[field];
  const errors: string[] = [];

  if (!rules) return errors;

  // Required field validation
  if (rules.required && (!value || value.trim() === "")) {
    errors.push(VALIDATION_ERRORS[field]?.required || `${field} is required`);
    return errors; // If required field is empty, don't check other validations
  }

  if (value && value.trim() !== "") {
    // Min length validation
    if (rules.minLength && value.trim().length < rules.minLength) {
      errors.push(
        VALIDATION_ERRORS[field]?.minLength ||
          `${field} must be at least ${rules.minLength} characters`
      );
    }

    // Max length validation
    if (rules.maxLength && value.trim().length > rules.maxLength) {
      errors.push(
        VALIDATION_ERRORS[field]?.maxLength ||
          `${field} must be less than ${rules.maxLength} characters`
      );
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value.trim())) {
      errors.push(
        VALIDATION_ERRORS[field]?.pattern || `${field} format is invalid`
      );
    }
  }

  return errors;
};

// Function to get all errors for a step
export const getStepErrors = (
  requiredFields: (keyof FormData)[],
  formData: FormData
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};

  requiredFields.forEach((field) => {
    const fieldErrors = validateField(field, formData[field] || "");
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });

  return errors;
};

interface StepValidationProps {
  step: number;
  requiredFields: (keyof FormData)[];
  onValidationChange: (isValid: boolean) => void;
}

export default function StepValidation({
  step,
  requiredFields,
  onValidationChange,
}: StepValidationProps) {
  const { formData } = useContext(FormContext)!;

  const validateStep = () => {
    const stepErrors = getStepErrors(requiredFields, formData);
    const isValid = Object.keys(stepErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  React.useEffect(() => {
    validateStep();
  }, [formData, requiredFields]);

  const stepErrors = getStepErrors(requiredFields, formData);
  const hasErrors = Object.keys(stepErrors).length > 0;

  if (!hasErrors) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          All required fields for this step are completed!
        </AlertDescription>
      </Alert>
    );
  }
}
