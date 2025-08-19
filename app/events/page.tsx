"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

// Lazy-load events JSON
type EventType = {
  id: string
  title: string
  description: string
  date: string
  time?: string
  image: string | string[]
  type: string
  status: "upcoming" | "completed"
  location?: string
  year?: string
  capacity?: number
  registered?: number
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {
    import("@/lib/data/eventData.json")
      .then((data) =>
        setEvents(
          data.default.map((event: any) => ({
            ...event,
            id: String(event.id),
          }))
        )
      )
      .catch((err) => console.error(err))
  }, [])

  if (!events.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-400 rounded-full"></div>
      </div>
    )
  }

  const upcomingEvents = events.filter((e) => e.status === "upcoming")
  const pastEvents = events.filter((e) => e.status === "completed")

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-24 h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            Events &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Workshops
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
          >
            Join our community events, workshops, and seminars to learn, network, and stay updated with the latest in AI and ML research.
          </motion.p>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <EventsGrid title="Upcoming Events" events={upcomingEvents} isUpcoming />
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <EventsGrid title="Past Events" events={pastEvents} isUpcoming={false} />
      )}

      {/* CTA */}
      <section className="py-24 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
            Have an idea for a workshop, seminar, or research presentation? We'd love to hear from you.
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
      </section>
    </div>
  )
}

// Events grid for upcoming or past events
function EventsGrid({
  title,
  events,
  isUpcoming,
}: {
  title: string
  events: EventType[]
  isUpcoming: boolean
}) {
  return (
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
            {title.includes("Upcoming") ? (
              <>
                Upcoming <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Events</span>
              </>
            ) : (
              <>
                Past <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Events</span>
              </>
            )}
          </h2>
        </motion.div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} isUpcoming={isUpcoming} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Optimized EventCard
function EventCard({ event, index, isUpcoming }: { event: EventType, index: number, isUpcoming: boolean }) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden card-hover group"
    >
      <Link href={`/events/${event.id}`} className="block">
        <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-800">
          <Image
            src={Array.isArray(event.image) ? event.image[0] || "/placeholder.svg" : event.image || "/placeholder.svg"}
            alt={event.title}
            width={400}
            height={200}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            priority={index < 3} // Preload first few images for speed
          />

          <div className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium"
               style={{ backgroundColor: isUpcoming ? 'rgba(16,185,129,0.2)' : 'rgba(139,92,246,0.2)', color: isUpcoming ? '#10b981' : '#8b5cf6' }}>
            {event.type}
          </div>
          <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium"
               style={{ backgroundColor: isUpcoming ? 'rgba(59,130,246,0.2)' : 'rgba(107,114,128,0.2)', color: isUpcoming ? '#3b82f6' : '#6b7280' }}>
            {isUpcoming ? "Upcoming" : "Completed"}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <h3 className={`font-semibold mb-2 sm:mb-3 ${isUpcoming ? "text-xl" : "text-lg"}`}>{event.title}</h3>
          <p className={`text-slate-300 mb-3 sm:mb-4 line-clamp-3 ${isUpcoming ? "text-base" : "text-sm"}`}>{event.description}</p>

          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            {isUpcoming && event.time && (
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
            )}
            {isUpcoming && event.location && (
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {isUpcoming && event.capacity && (
            <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all duration-300"
                   style={{ width: `${(event.registered! / event.capacity) * 100}%` }} />
            </div>
          )}

          <span className="text-blue-400 text-sm font-medium">View Details →</span>
        </div>
      </Link>
    </motion.div>
  )
}
