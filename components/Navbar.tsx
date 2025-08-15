"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Brain } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/", ariaLabel: "Go to homepage" },
  { name: "About", href: "/about", ariaLabel: "Learn about SMLRA" },
  { name: "Team", href: "/team", ariaLabel: "Meet our research team" },
  { name: "Blog", href: "/blog", ariaLabel: "Read our research blog" },
  { name: "Events", href: "/events", ariaLabel: "View upcoming events" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest("nav")) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-blue-500/10"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg"
            aria-label="SMLRA - Somaiya Machine Learning Research Association"
          >
            <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }} className="relative">
              <Image height="20" width="20" src={"SMLRA.png"} alt="SMLRA" className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              <div  className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-blue-300/30 transition-all duration-300"></div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient font-display">
                SMLRA
              </span>
              <span className="text-xs text-slate-400 font- -mt-1">Official AI/ML Council of KJSSE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.ariaLabel}
                className="relative px-4 py-2 text-slate-300 hover:text-blue-400 transition-all duration-300 rounded-lg group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <span className="relative z-10 font-medium">{item.name}</span>
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-8 group-hover:-translate-x-4"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-blue-400 transition-colors duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-slate-950/98 backdrop-blur-xl border-b border-slate-800/50"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
