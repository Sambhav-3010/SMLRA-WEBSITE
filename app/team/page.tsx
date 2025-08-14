"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Faculty Advisor",
    department: "Computer Science",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Leading researcher in deep learning and neural networks with 10+ years of experience.",
    social: {
      github: "#",
      linkedin: "#",
      email: "sarah.chen@somaya.edu",
    },
  },
  {
    name: "Arjun Patel",
    role: "President",
    department: "AI/ML Engineering",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Passionate about computer vision and its applications in healthcare.",
    social: {
      github: "#",
      linkedin: "#",
      email: "arjun.patel@student.somaya.edu",
    },
  },
  {
    name: "Priya Sharma",
    role: "Vice President",
    department: "Data Science",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Specializes in natural language processing and sentiment analysis.",
    social: {
      github: "#",
      linkedin: "#",
      email: "priya.sharma@student.somaya.edu",
    },
  },
  {
    name: "Rahul Kumar",
    role: "Technical Lead",
    department: "Machine Learning",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Expert in reinforcement learning and autonomous systems.",
    social: {
      github: "#",
      linkedin: "#",
      email: "rahul.kumar@student.somaya.edu",
    },
  },
  {
    name: "Ananya Singh",
    role: "Research Coordinator",
    department: "AI Ethics",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Focuses on ethical AI development and bias mitigation in ML models.",
    social: {
      github: "#",
      linkedin: "#",
      email: "ananya.singh@student.somaya.edu",
    },
  },
  {
    name: "Vikram Reddy",
    role: "Events Manager",
    department: "Computer Vision",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Organizes workshops and hackathons, specializes in image processing.",
    social: {
      github: "#",
      linkedin: "#",
      email: "vikram.reddy@student.somaya.edu",
    },
  },
]

export default function TeamPage() {
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
              Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Meet the brilliant minds behind SMLRA's success. Our diverse team of researchers, students, and faculty
              members work together to push the boundaries of AI and ML.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden card-hover group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-1">{member.role}</p>
                  <p className="text-slate-400 text-sm mb-3">{member.department}</p>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">{member.bio}</p>

                  <div className="flex space-x-3">
                    <a href={member.social.github} className="text-slate-400 hover:text-blue-400 transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-slate-400 hover:text-blue-400 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join Our <span className="text-gradient">Community</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Interested in becoming part of our research community? We're always looking for passionate individuals who
              want to make a difference in AI and ML.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 glow-effect">
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
