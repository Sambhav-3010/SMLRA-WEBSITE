"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, Sparkles, Trophy, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import events from "@/lib/data/eventData.json"

const upcomingEvents = events.filter((event) => event.status === "upcoming")
const pastEvents = events.filter((event) => event.status === "completed")

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0 grid-bg opacity-5"></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-pink-500/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-blue-500/8 rounded-full blur-2xl"></div>
      </div>

      {/* Hero */}
      <section className="py-24 relative overflow-hidden h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                Events &{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Workshops
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              Join our community events, workshops, and seminars to learn, network, and stay updated with the latest in AI and ML research.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Upcoming <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Events</span>
              </h2>
              <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Don&apos;t miss out on these exciting opportunities to learn and connect
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} isUpcoming={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-blue-950/30 to-slate-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Past <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Take a look at our successful events and workshops
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} isUpcoming={false} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20 shadow-2xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Want to propose an{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Event idea
              </span>?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Have an idea for a workshop, seminar, or research presentation? We&apos;d love to hear from you and help make it happen.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              onClick={() => window.open("mailto:smlra-kjsce@somaiya.edu")}
            >
              Send us an Email
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Card component (unchanged from original)
function EventCard({ event, index, isUpcoming }: { 
  event: any, 
  index: number, 
  isUpcoming: boolean 
}) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden card-hover group"
    >
      <Link href={`/events/${event.id}`} className="block">
        <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-800">
          <Image
            src={
              Array.isArray(event.image)
                ? event.image[0] || "/placeholder.svg"
                : event.image || "/placeholder.svg"
            }
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-all duration-300"
          />

          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span
              className={`${
                isUpcoming
                  ? "bg-green-500/20 text-green-400"
                  : "bg-purple-500/20 text-purple-400"
              } px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
            >
              {event.type}
            </span>
          </div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <span
              className={`${
                isUpcoming
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-slate-500/20 text-slate-400"
              } px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}
            >
              {isUpcoming ? "Upcoming" : "Completed"}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <h3
            className={`font-semibold mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors leading-tight ${
              isUpcoming ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {event.title}
          </h3>

          <p
            className={`text-slate-300 mb-3 sm:mb-4 leading-relaxed line-clamp-3 ${
              isUpcoming ? "text-sm sm:text-base" : "text-xs sm:text-sm"
            }`}
          >
            {event.description}
          </p>

          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">{formatDate(event.date)}</span>
            </div>
            {event.time && isUpcoming && (
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{event.time}</span>
              </div>
            )}
            {isUpcoming && (
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{event.location || "TBA"}</span>
              </div>
            )}
            {event.year && !isUpcoming && (
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Academic Year: {event.year}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            {event.capacity && isUpcoming && (
              <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2 mr-3 sm:mr-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(event.registered / event.capacity) * 100}%`,
                  }}
                ></div>
              </div>
            )}
            <span className="text-blue-400 text-xs sm:text-sm font-medium whitespace-nowrap">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}