"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { JSX, useEffect, useState } from "react"

type EventType = {
  id: number
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

interface EventDetailsPageProps {
  params: { id: string }
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  const [event, setEvent] = useState<EventType | null>(null)
  const { id } = useParams()

  useEffect(() => {
    import("@/lib/data/eventData.json")
      .then((data) => {
        const evtRaw = data.default.find((e: any) => e.id === parseInt(String(id ?? "")))
        if (!evtRaw) return notFound()
        // Ensure status is typed correctly
        const evt: EventType = {
          ...evtRaw,
          status: evtRaw.status === "upcoming" ? "upcoming" : "completed"
        }
        setEvent(evt)
      })
      .catch(() => notFound())
  }, [])

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-400 rounded-full"></div>
      </div>
    )
  }

  const isUpcoming = event.status === "upcoming"
  const completionPercentage = event.capacity ? (event.registered! / event.capacity) * 100 : 0

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background */}
      <BackgroundEffects />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        <Link href="/events" className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm sm:text-base">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events</span>
        </Link>
      </div>

      {/* Hero Image */}
      <section className="relative z-10">
        <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl">
          <OptimizedEventImage images={event.image} title={event.title} />
          <StatusBadges event={event} isUpcoming={isUpcoming} />
        </div>
      </section>

      {/* Event Details */}
      <section className="py-8 sm:py-10 lg:py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <EventHeader event={event} isUpcoming={isUpcoming} />
            <EventMeta event={event} isUpcoming={isUpcoming} completionPercentage={completionPercentage} />
            <EventDescription description={event.description} />
            {Array.isArray(event.image) && event.image.length > 1 && <EventGallery images={event.image.slice(1)} title={event.title} />}
            {isUpcoming && <EventCTA />}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/* ---------------- Components ---------------- */

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5"></div>
      <div className="absolute inset-0 grid-bg opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-1/4 w-48 h-48 bg-pink-500/8 rounded-full blur-2xl"></div>
      <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-blue-500/8 rounded-full blur-2xl"></div>
    </div>
  )
}

function OptimizedEventImage({ images, title }: { images: string | string[]; title: string }) {
  const src = Array.isArray(images) ? images[0] || "/placeholder.svg" : images || "/placeholder.svg"
  return <Image src={src} alt={title} width={1200} height={600} className="object-cover w-full h-full" priority />
}

function StatusBadges({ event, isUpcoming }: { event: any; isUpcoming: boolean }) {
  const typeColors: Record<string, string> = { workshop: "bg-purple-500/20 text-purple-400", seminar: "bg-green-500/20 text-green-400" }
  return (
    <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block ${typeColors[event.type] || "bg-blue-500/20 text-blue-400"}`}>{event.type}</span>
      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block ${isUpcoming ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"}`}>{isUpcoming ? "Upcoming" : "Completed"}</span>
    </div>
  )
}

function EventHeader({ event, isUpcoming }: { event: any; isUpcoming: boolean }) {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-start lg:justify-between mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{event.title}</h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
        {isUpcoming && (
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
            <span>Register Now</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

function EventMeta({ event, isUpcoming, completionPercentage }: { event: any; isUpcoming: boolean; completionPercentage: number }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <MetaCard icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />} label="Date" value={event.date} />
        {event.time && <MetaCard icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />} label="Time" value={event.time} />}
        <MetaCard icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />} label="Location" value={event.location || "KJSCE"} />
        {event.year && <MetaCard icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />} label="Academic Year" value={event.year} />}
      </div>

      {isUpcoming && event.capacity && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Registration Progress</span>
            <span className="text-sm font-medium">{Math.round(completionPercentage)}% Full</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3">
            <motion.div initial={{ width: 0 }} animate={{ width: `${completionPercentage}%` }} transition={{ duration: 0.8, delay: 0.3 }} className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full" />
          </div>
        </div>
      )}
    </>
  )
}

function MetaCard({ icon, label, value }: { icon: JSX.Element; label: string; value: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center space-x-3">
      {icon}
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-slate-400">{label}</p>
        <p className="font-semibold text-sm sm:text-base truncate">{value}</p>
      </div>
    </div>
  )
}

function EventDescription({ description }: { description: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About This Event</h2>
      <p className="text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">{description}</p>
    </div>
  )
}

function EventGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Event Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative h-40 sm:h-48 rounded-lg overflow-hidden">
            <Image src={img || "/placeholder.svg"} alt={`${title} - Image ${idx + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}

function EventCTA() {
  return (
    <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-6 sm:p-8 text-center">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">Ready to Join Us?</h3>
      <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">Don't miss out on this amazing opportunity to learn and connect with fellow enthusiasts.</p>
      <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 glow-effect text-sm sm:text-base">
        Register Now
      </button>
    </div>
  )
}
