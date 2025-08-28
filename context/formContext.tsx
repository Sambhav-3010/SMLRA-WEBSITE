"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { useContext } from "react";
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  rollNo: string;
  year: '1st' | '2nd' | '3rd' | '';
  branch: string;
  phone: string;
  resume: string;
  linkedin: string;
  github: string;
  about: string;
  preference1: string;
  preference2: string;
  preference3: string;
  whyYou: string;
  questions: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    rollNo: "",
    year: "",
    branch: "",
    phone: "",
    resume: "",
    linkedin: "",
    github: "",
    about: "",
    preference1: "",
    preference2: "",
    preference3: "",
    whyYou: "",
    questions: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export default FormProvider;