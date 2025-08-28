"use client";
import FormProvider from "@/context/formContext";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <FormProvider>{children}</FormProvider>;
}
