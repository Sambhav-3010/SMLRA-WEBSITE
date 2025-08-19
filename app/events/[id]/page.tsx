"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Check,
  Clock,
  ArrowLeft,
  ExternalLink,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import events from "@/lib/data/eventData.json";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  // Unwrap the params Promise using React.use()
  const { id } = use(params);
  const event = events.find((e) => e.id === parseInt(id));
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy link:", err));
  };

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!event) {
    notFound();
  }

  const isUpcoming = event.status === "upcoming";
  const completionPercentage = event.capacity
    ? (event.registered / event.capacity) * 100
    : 0;

  // Handle both single image and array of images
  const eventImages = Array.isArray(event.image) ? event.image : [event.image];
  const hasMultipleImages = eventImages.length > 1;

  // Auto-advance carousel
  useEffect(() => {
    if (!hasMultipleImages) return; // Don't start timer for single images

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [eventImages.length, hasMultipleImages]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + eventImages.length) % eventImages.length
    );
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        <Link
          href="/events"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events</span>
        </Link>
      </div>

      {/* Hero Section with Event Image Carousel */}
      <section className="relative z-10">
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-4xl h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-lg">
            <Image
              src={eventImages[currentImageIndex] || "/placeholder.svg"}
              alt={`${event.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent rounded-lg" />

            {/* Carousel Navigation */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {eventImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm z-10">
                  {currentImageIndex + 1} / {eventImages.length}
                </div>
              </>
            )}

            {/* Status Badges */}
            <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 z-10">
              <span
                className={`text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block ${
                  event.type === "workshop"
                    ? "bg-purple-500 text-purple-400"
                    : event.type === "seminar"
                    ? "bg-green-500 text-green-400"
                    : "bg-blue-500 text-blue-400"
                }`}
              >
                {event.type}
              </span>
              <span
                className={`text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-block ${
                  isUpcoming
                    ? "bg-green-500 text-green-400"
                    : "bg-slate-500 text-slate-400"
                }`}
              >
                {isUpcoming ? "Upcoming" : "Completed"}
              </span>
            </div>
            <span className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 z-10 items-center justify-center">
              <button
                onClick={handleCopyLink}
                className="flex items-center px-2 sm:px-3 py-1 bg-purple-600 text-white transition-colors text-xs sm:text-sm rounded-full"
              >
                {copied ? (
                  <>
                    Copied <span className="ml-2"><Check className="h-4 w-4" /></span>
                  </>
                ) : (
                  <>
                    Share <Share2 className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </span>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-8 sm:py-10 lg:py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Title and Actions */}
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-start lg:justify-between mb-6 sm:mb-8">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  {event.title}
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:mt-0 lg:ml-6">
                {isUpcoming && (
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <span>Register Now</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Event Meta Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-slate-400">Date</p>
                    <p className="font-semibold text-sm sm:text-base truncate">
                      {event.date}
                    </p>
                  </div>
                </div>
              </div>

              {event.time && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-400">Time</p>
                      <p className="font-semibold text-sm sm:text-base truncate">
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-slate-400">
                      Location
                    </p>
                    <p className="font-semibold text-sm sm:text-base truncate">
                      {"KJSCE"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Year field for older events */}
              {event.year && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-400">
                        Academic Year
                      </p>
                      <p className="font-semibold text-sm sm:text-base truncate">
                        {event.year}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Registration Progress (for upcoming events) */}
            {isUpcoming && event.capacity && (
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">
                    Registration Progress
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round(completionPercentage)}% Full
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                About This Event
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                {event.description}
              </p>
            </div>

            {/* Call to Action */}
            {isUpcoming && (
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-6 sm:p-8 text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
                  Ready to Join Us?
                </h3>
                <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  Don't miss out on this amazing opportunity to learn and
                  connect with fellow enthusiasts.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 glow-effect text-sm sm:text-base">
                  Register Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
