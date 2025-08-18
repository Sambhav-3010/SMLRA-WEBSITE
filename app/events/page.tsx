"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import events from "@/lib/data/eventData.json"

const upcomingEvents = events.filter((event) => event.status === "upcoming")
const pastEvents = events.filter((event) => event.status === "completed")

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
              Events & <span className="text-gradient">Workshops</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
              Join our community events, workshops, and seminars to learn, network, and stay updated with the latest in AI and ML research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
                Upcoming <span className="text-gradient">Events</span>
              </h2>
              <p className="text-slate-300 text-center max-w-2xl mx-auto px-4 text-sm sm:text-base">
                Don&apos;t miss out on these exciting opportunities to learn and connect
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-16">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} isUpcoming={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
              Past <span className="text-gradient">Events</span>
            </h2>
            <p className="text-slate-300 text-center max-w-2xl mx-auto px-4 text-sm sm:text-base">
              Take a look at our successful events and workshops
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pastEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} isUpcoming={false} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Want to propose an <span className="text-gradient">Event idea</span>?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
              Have an idea for a workshop, seminar, or research presentation? We&apos;d love to hear from you and help make it happen.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 glow-effect text-sm sm:text-base" onClick={() => window.open("mailto:smlra-kjsce@somaiya.edu")}>
              Send us an Email
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Card
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