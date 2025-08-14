"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function QuoteSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-cyan-900/10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 text-blue-400/20">
            <Quote className="h-16 w-16" />
          </div>

          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-200 leading-relaxed italic">
            "The best AI models aren't built to impress — they're built to{" "}
            <span className="text-gradient font-semibold">learn</span>,{" "}
            <span className="text-gradient font-semibold">adapt</span>, and{" "}
            <span className="text-gradient font-semibold">solve real problems</span>."
          </blockquote>

          <div className="mt-8 text-slate-400">
            <p className="text-lg font-mono">— SMLRA Research Philosophy</p>
            <p className="text-sm mt-2">Training the next generation of intelligent systems</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
