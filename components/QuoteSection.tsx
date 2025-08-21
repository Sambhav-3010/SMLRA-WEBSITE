"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function QuoteSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-4 -right-4 text-blue-400/20">
            <Quote className="h-16 w-16" />
          </div>
          <div className="absolute -top-4 -left-4 text-blue-400/20">
            <Quote className="h-16 w-16 scale-x-[-1]" />
          </div>

          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-200 leading-relaxed italic">
            "Where{" "}
            <span className="text-gradient font-semibold">dedication</span>{" "}
            <span className="">meets</span>{" "}
            <span className="text-gradient font-semibold">research...</span>"
          </blockquote>

          <div className="mt-8 text-slate-400">
            <p className="text-lg font-mono">— Somaiya Machine Learning Research Association</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
