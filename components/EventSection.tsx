"use client"

import { motion } from "framer-motion"
import { Trophy, Users, BookOpen, Star } from "lucide-react"

const achievements = [
  {
    icon: Trophy,
    number: "500+",
    label: "Models Trained",
    description: "Deep learning models in production",
  },
  {
    icon: Users,
    number: "150+",
    label: "AI Researchers",
    description: "Active members and contributors",
  },
  {
    icon: BookOpen,
    number: "40+",
    label: "Research Papers",
    description: "Published in top-tier conferences",
  },
  {
    icon: Star,
    number: "96.8%",
    label: "Model Accuracy",
    description: "Average across all deployments",
  },
]

export default function EventSection() {
  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Events</span>
          </h2>
          <p>Crousals for all past events with a cool card</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8 card-hover">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>

                <div className="text-4xl font-bold text-gradient mb-2">{achievement.number}</div>

                <h3 className="text-xl font-semibold mb-2">{achievement.label}</h3>

                <p className="text-slate-400">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
