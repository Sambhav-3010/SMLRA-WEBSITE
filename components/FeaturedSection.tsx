"use client"

import { motion } from "framer-motion"
import { Calendar, Users, BookOpen, Award } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Calendar,
    title: "Upcoming Events",
    description: "Join our workshops, hackathons, and research seminars",
    href: "/events",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Research Teams",
    description: "Collaborate with passionate researchers and innovators",
    href: "/team",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Publications",
    description: "Explore our latest research papers and technical articles",
    href: "/blog",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Award,
    title: "Achievements",
    description: "Celebrating our members' success and recognition",
    href: "/about",
    color: "from-orange-500 to-red-500",
  },
]

export default function FeaturedSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Explore</span> Our Ecosystem
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover the various facets of our research community and innovation initiatives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={feature.href} className="group block">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 card-hover group-hover:border-blue-500/50 transition-all duration-300 h-60">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
