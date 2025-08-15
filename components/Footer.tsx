"use client";

import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="bg-slate-900/50 border-t border-slate-800 relative overflow-hidden"
      role="contentinfo"
    >
      <div className="absolute inset-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* SMLRA Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/smlra.png" alt="SMLRA Logo" width={40} height={40} />
              <div>
                <h3 className="text-2xl font-bold text-gradient font-display">
                  SMLRA
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  AI/ML Council of KJSSE
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Somaiya Machine Learning Research Association - Pioneering the
              future of artificial intelligence through innovative research,
              cutting-edge models, and collaborative learning.
            </p>
            <div className="flex items-start space-x-3 text-slate-400 text-sm">
              <Link
                href={`https://maps.app.goo.gl/guR36dadWsfPjjBn9`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <address className="not-italic">
                  Somaiya College of Engineering
                  <br />
                  Department of Computer Science
                  <br />
                  Mumbai, Maharashtra, India
                </address>
              </Link>
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
              <Link
                href="https://www.linkedin.com/company/smlra-kjsce/posts/?feedView=all"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Connect on LinkedIn"
                target="_blank"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/smlra_kjsce?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Follow on Instagram"
                target="_blank"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.youtube.com/@smlra-kjsce6909"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Subscribe to YouTube"
                target="_blank"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:smlra-kjsce@somaiya.edu"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10 focus-visible"
                aria-label="Send us an email"
                target="_blank"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
            <div className="text-sm text-slate-400 space-y-4">
              <p className="font-mono">smlra-kjsce@somaiya.edu</p>
              <div className="space-y-1">
                <p className="font-mono text-[16px] font-bold">Council Lead</p>
                <p className="font-mono">Vibhu: +91 9877747148</p>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[16px] font-bold">Council Co Lead</p>
                <p className="font-mono">Sambhav: +91 7007231054</p>
                <p className="font-mono">Aryan: +91 9004136721</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              <p>
                &copy; 2025 SMLRA - Somaiya Machine Learning Research
                Association. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-blue-400 transition-colors focus-visible"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-blue-400 transition-colors focus-visible"
              >
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
          <div className="mt-4 text-center"></div>
        </div>
      </div>
    </footer>
  );
}
