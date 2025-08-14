"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const technologies = [
  { name: "Python", logo: "/placeholder.svg?height=60&width=60", category: "Language" },
  { name: "PyTorch", logo: "/placeholder.svg?height=60&width=60", category: "Framework" },
  { name: "TensorFlow", logo: "/placeholder.svg?height=60&width=60", category: "Framework" },
  { name: "Jupyter", logo: "/placeholder.svg?height=60&width=60", category: "Tool" },
  { name: "Docker", logo: "/placeholder.svg?height=60&width=60", category: "DevOps" },
  { name: "Kubernetes", logo: "/placeholder.svg?height=60&width=60", category: "DevOps" },
  { name: "MLflow", logo: "/placeholder.svg?height=60&width=60", category: "MLOps" },
  { name: "Weights & Biases", logo: "/placeholder.svg?height=60&width=60", category: "MLOps" },
  { name: "CUDA", logo: "/placeholder.svg?height=60&width=60", category: "Compute" },
  { name: "Apache Spark", logo: "/placeholder.svg?height=60&width=60", category: "Big Data" },
  { name: "MongoDB", logo: "/placeholder.svg?height=60&width=60", category: "Database" },
  { name: "Redis", logo: "/placeholder.svg?height=60&width=60", category: "Cache" },
]

export default function TechStack() {
  return (
    <section className="py-20 bg-slate-900/30 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Powered by industry-leading tools and frameworks for AI/ML development
          </p>
          <div className="mt-4 font-mono text-sm text-slate-400">{">"} Production-ready • Scalable • Open Source</div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center card-hover group-hover:border-blue-500/50 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    width={32}
                    height={32}
                    className="opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-blue-400 transition-colors">{tech.name}</h3>
                <p className="text-xs text-slate-500 font-mono">{tech.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
