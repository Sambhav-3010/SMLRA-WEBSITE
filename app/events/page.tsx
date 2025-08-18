// app/events/page.tsx - Updated with lazy loading and clickable cards
"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import events from "@/lib/data/eventData.json"

const ITEMS_PER_PAGE = 6

const upcomingEvents = events.filter((event) => event.status === "upcoming")
const pastEvents = events.filter((event) => event.status === "completed")

export default function EventsPage() {
  const [visiblePastEvents, setVisiblePastEvents] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  // Memoized arrays to avoid unnecessary re-filtering
  const displayedPastEvents = useMemo(
    () => pastEvents.slice(0, visiblePastEvents),
    [visiblePastEvents]
  )

  const hasMoreEvents = visiblePastEvents < pastEvents.length

  const loadMoreEvents = async () => {
    if (isLoading || !hasMoreEvents) return

    setIsLoading(true)
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setVisiblePastEvents(prev => Math.min(prev + ITEMS_PER_PAGE, pastEvents.length))
    setIsLoading(false)
  }

  // Intersection Observer for automatic loading when scrolling near bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreEvents && !isLoading) {
          loadMoreEvents()
        }
      },
      { threshold: 0.1 }
    )

    const loadMoreTrigger = document.getElementById('load-more-trigger')
    if (loadMoreTrigger) {
      observer.observe(loadMoreTrigger)
    }

    return () => {
      if (loadMoreTrigger) {
        observer.unobserve(loadMoreTrigger)
      }
    }
  }, [hasMoreEvents, isLoading])

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
      {upcomingEvents.length > 0 && (
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
                <EventCard key={event.id} event={event} index={index} isUpcoming={true} />
              ))}
            </div>
          </div>
        </section>
      )}

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
            {displayedPastEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} isUpcoming={false} />
            ))}
          </div>

          {/* Load More Trigger */}
          {hasMoreEvents && (
            <div id="load-more-trigger" className="mt-12 text-center">
              <button
                onClick={loadMoreEvents}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 glow-effect disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  `Load More Events (${pastEvents.length - visiblePastEvents} remaining)`
                )}
              </button>
            </div>
          )}

          {/* Loading indicator for automatic loading */}
          {isLoading && hasMoreEvents && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center text-slate-400">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading more events...
              </div>
            </div>
          )}
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

// Separate EventCard component for better performance
function EventCard({ event, index, isUpcoming }: { 
  event: any, 
  index: number, 
  isUpcoming: boolean 
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden card-hover group ${
        isUpcoming ? 'lg:col-span-1' : ''
      }`}
    >
      <Link href={`/events/${event.id}`} className="block">
        <div className="relative h-48 overflow-hidden bg-slate-800">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
              <div className="text-slate-600">Loading...</div>
            </div>
          )}
          <Image
            src={Array.isArray(event.image) ? event.image[0] || "/placeholder.svg" : event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className={`object-cover group-hover:scale-110 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-4 left-4">
            <span className={`${
              isUpcoming 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-purple-500/20 text-purple-400'
            } px-3 py-1 rounded-full text-sm font-medium`}>
              {event.type}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`${
              isUpcoming
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-slate-500/20 text-slate-400'
            } px-3 py-1 rounded-full text-sm font-medium`}>
              {isUpcoming ? 'Upcoming' : 'Completed'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className={`font-semibold mb-3 group-hover:text-blue-400 transition-colors ${
            isUpcoming ? 'text-xl' : 'text-lg'
          }`}>
            {event.title}
          </h3>

          <p className={`text-slate-300 mb-4 leading-relaxed line-clamp-3 ${
            isUpcoming ? '' : 'text-sm'
          }`}>
            {event.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.time && isUpcoming && (
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
            )}
            {isUpcoming && (
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>{event.location || 'TBA'}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Users className="h-4 w-4" />
              <span>
                {isUpcoming && event.capacity 
                  ? `${event.registered}/${event.capacity} registered`
                  : `${event.registered} attendees`
                }
              </span>
            </div>
            {event.year && !isUpcoming && (
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>Academic Year: {event.year}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            {event.capacity && isUpcoming && (
              <div className="w-full bg-slate-700 rounded-full h-2 mr-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                ></div>
              </div>
            )}
            <span className="text-blue-400 text-sm font-medium whitespace-nowrap">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
