"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "AI/ML Workshop: Deep Learning Fundamentals",
    description:
      "A comprehensive workshop covering the basics of deep learning, neural networks, and practical implementation using PyTorch.",
    date: "2024-02-15",
    time: "10:00 AM - 4:00 PM",
    location: "Somaya College Auditorium",
    capacity: 100,
    registered: 85,
    image: "/placeholder.svg?height=300&width=500",
    type: "Workshop",
    status: "upcoming",
  },
  {
    id: 2,
    title: "SMLRA Annual Hackathon 2024",
    description: "Join us for our biggest hackathon of the year! Build innovative AI solutions to real-world problems.",
    date: "2024-03-01",
    time: "9:00 AM - 9:00 PM",
    location: "Innovation Lab, Building A",
    capacity: 150,
    registered: 120,
    image: "/placeholder.svg?height=300&width=500",
    type: "Hackathon",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Research Paper Presentation Series",
    description:
      "Monthly series where members present their latest research findings and discuss cutting-edge papers in AI/ML.",
    date: "2024-02-28",
    time: "2:00 PM - 4:00 PM",
    location: "Conference Room 301",
    capacity: 50,
    registered: 35,
    image: "/placeholder.svg?height=300&width=500",
    type: "Seminar",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Industry Expert Talk: AI in Healthcare",
    description:
      "Guest lecture by Dr. Rajesh Mehta from Apollo Hospitals on the applications of AI in modern healthcare.",
    date: "2024-01-20",
    time: "3:00 PM - 5:00 PM",
    location: "Main Auditorium",
    capacity: 200,
    registered: 200,
    image: "/placeholder.svg?height=300&width=500",
    type: "Guest Lecture",
    status: "completed",
  },
  {
    id: 5,
    title: "Computer Vision Project Showcase",
    description:
      "Students and researchers showcase their computer vision projects and demonstrate real-world applications.",
    date: "2024-01-10",
    time: "1:00 PM - 6:00 PM",
    location: "Exhibition Hall",
    capacity: 80,
    registered: 75,
    image: "/placeholder.svg?height=300&width=500",
    type: "Showcase",
    status: "completed",
  },
  {
    id: 6,
    title: "NLP Workshop: Building Chatbots",
    description:
      "Hands-on workshop on natural language processing and building intelligent chatbots using modern frameworks.",
    date: "2023-12-15",
    time: "10:00 AM - 3:00 PM",
    location: "Computer Lab 2",
    capacity: 40,
    registered: 40,
    image: "/placeholder.svg?height=300&width=500",
    type: "Workshop",
    status: "completed",
  },
]

const upcomingEvents = events.filter((event) => event.status === "upcoming")
const pastEvents = events.filter((event) => event.status === "completed")

export default function EventsPage() {
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
              Events & <span className="text-gradient">Workshops</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Join our community events, workshops, and seminars to learn, network, and stay updated with the latest in
              AI and ML research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-4">
              Upcoming <span className="text-gradient">Events</span>
            </h2>
            <p className="text-slate-300 text-center max-w-2xl mx-auto">
              Don't miss out on these exciting opportunities to learn and connect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden card-hover group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                      Upcoming
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-300 mb-4 leading-relaxed">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.registered}/{event.capacity} registered
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="w-full bg-slate-700 rounded-full h-2 mr-4">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 whitespace-nowrap">
                      <span>Register</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center mb-4">
              Past <span className="text-gradient">Events</span>
            </h2>
            <p className="text-slate-300 text-center max-w-2xl mx-auto">
              Take a look at our successful events and workshops
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden card-hover group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-slate-500/20 text-slate-400 px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-300 mb-4 text-sm leading-relaxed line-clamp-3">{event.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>{event.registered} attendees</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Want to Host an <span className="text-gradient">Event</span>?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Have an idea for a workshop, seminar, or research presentation? We'd love to hear from you and help make
              it happen.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 glow-effect">
              Propose an Event
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
