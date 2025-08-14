"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, Lightbulb } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To advance AI/ML research and foster innovation through collaborative learning and practical applications.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To be a leading research community that bridges the gap between academic research and industry applications.",
  },
  {
    icon: Heart,
    title: "Values",
    description: "Excellence, collaboration, innovation, and ethical AI development guide everything we do.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Pushing boundaries in machine learning research while maintaining practical relevance and social impact.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient">SMLRA</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              The Somaya Machine Learning Research Association is a vibrant community of researchers, students, and
              innovators dedicated to advancing the frontiers of artificial intelligence and machine learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  Founded in 2020, SMLRA emerged from a shared passion for artificial intelligence and its potential to
                  solve complex real-world problems. What started as a small group of computer science students
                  experimenting with neural networks has evolved into a cutting-edge AI research laboratory.
                </p>
                <p>
                  Our lab specializes in deep learning, computer vision, natural language processing, and reinforcement
                  learning. We've trained over 500 models, published 40+ research papers, and deployed AI solutions that
                  impact thousands of users daily.
                </p>
                <p>
                  Today, SMLRA stands as a premier AI research facility at Somaya College of Engineering, where we push
                  the boundaries of what's possible with artificial intelligence and machine learning.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-blue-500/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">2020</div>
                    <div className="text-slate-400">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">500+</div>
                    <div className="text-slate-400">Models Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">10TB+</div>
                    <div className="text-slate-400">Data Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">96.8%</div>
                    <div className="text-slate-400">Avg Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">25+</div>
                    <div className="text-slate-400">GPU Clusters</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our <span className="text-gradient">Foundation</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The principles that guide our research and community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 card-hover"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
