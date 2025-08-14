"use client"

import Link from "next/link"
import { Github, Linkedin, Instagram, Youtube, Mail, MapPin, Brain } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 neural-network-bg opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* SMLRA Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-2xl font-bold text-gradient font-display">SMLRA</h3>
                <p className="text-xs text-slate-400 font-mono">AI Research Lab</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Somaya Machine Learning Research Association - Pioneering the future of artificial intelligence through
              innovative research, cutting-edge models, and collaborative learning.
            </p>
            <div className="flex items-start space-x-3 text-slate-400 text-sm">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <address className="not-italic">
                Somaya College of Engineering
                <br />
                Department of Computer Science
                <br />
                Mumbai, Maharashtra, India
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-display">Research</h4>
            <nav className="space-y-3">
              <Link
                href="/about"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                About Lab
              </Link>
              <Link
                href="/team"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                Research Team
              </Link>
              <Link
                href="/events"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                Events & Workshops
              </Link>
              <Link
                href="/blog"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                Publications
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-display">Resources</h4>
            <nav className="space-y-3">
              <Link
                href="/blog"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                Research Blog
              </Link>
              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                Datasets
              </Link>
              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                Model Zoo
              </Link>
              <Link
                href="#"
                className="block text-slate-400 hover:text-blue-400 transition-colors text-sm focus-visible"
              >
                Documentation
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-display">Connect</h4>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Follow us on GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Follow on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Subscribe to YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="mailto:contact@smlra.somaya.edu"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Send us an email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="text-sm text-slate-400 space-y-2">
              <p className="font-mono">contact@smlra.somaya.edu</p>
              <p className="font-mono">+91 (22) 1234-5678</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              <p>&copy; 2024 SMLRA - Somaya Machine Learning Research Association. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors focus-visible">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors focus-visible">
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-slate-400 hover:text-blue-400 transition-colors focus-visible"
              >
                Accessibility
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 font-mono">
              Built with Next.js • Powered by AI • Made with ❤️ by SMLRA Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
