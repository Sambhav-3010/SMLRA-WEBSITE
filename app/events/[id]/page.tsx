// app/events/[id]/page.tsx
"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, ArrowLeft, ExternalLink, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import events from "@/lib/data/eventData.json"

interface EventDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  // Unwrap the params Promise using React.use()
  const { id } = use(params)
  const event = events.find(e => e.id === parseInt(id))

  if (!event) {
    notFound()
  }

  const isUpcoming = event.status === "upcoming"
  const completionPercentage = event.capacity ? (event.registered / event.capacity) * 100 : 0

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/events" 
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events</span>
        </Link>
      </div>

      {/* Hero Section with Event Image */}
      <section className="relative">
        <div className="relative h-96 overflow-hidden">
          {Array.isArray(event.image) ? (
            <Image
              src={event.image[0] || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          {/* Status Badges */}
          <div className="absolute top-6 left-6 flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.type === 'workshop' ? 'bg-purple-500/20 text-purple-400' :
              event.type === 'seminar' ? 'bg-green-500/20 text-green-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {event.type}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isUpcoming ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
            }`}>
              {isUpcoming ? 'Upcoming' : 'Completed'}
            </span>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">{event.title}</h1>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
                <button className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
                {isUpcoming && (
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2">
                    <span>Register Now</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Event Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-400">Date</p>
                    <p className="font-semibold">{
                      (() => {
                        try {
                          return new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        } catch {
                          return event.date // fallback to original date string
                        }
                      })()
                    }</p>
                  </div>
                </div>
              </div>

              {event.time && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-sm text-slate-400">Time</p>
                      <p className="font-semibold">{event.time}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="font-semibold">{event.location || 'TBA'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-slate-400">Attendees</p>
                    <p className="font-semibold">
                      {isUpcoming ? `${event.registered}/${event.capacity}` : `${event.registered} attended`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Year field for older events */}
              {event.year && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-slate-400">Academic Year</p>
                      <p className="font-semibold">{event.year}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Registration Progress (for upcoming events) */}
            {isUpcoming && event.capacity && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Registration Progress</span>
                  <span className="text-sm font-medium">{Math.round(completionPercentage)}% Full</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-slate-300 leading-relaxed text-lg">{event.description}</p>
            </div>

            {/* Additional Images (if multiple images) */}
            {Array.isArray(event.image) && event.image.length > 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.image.slice(1).map((img: string, idx: number) => (
                    <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${event.title} - Image ${idx + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            {isUpcoming && (
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Join Us?</h3>
                <p className="text-slate-300 mb-6">
                  Don't miss out on this amazing opportunity to learn and connect with fellow enthusiasts.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 glow-effect">
                  Register Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
