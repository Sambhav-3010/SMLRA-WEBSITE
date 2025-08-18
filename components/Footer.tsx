"use client";

import Link from "next/link";
import { Linkedin, Instagram, Youtube, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="bg-slate-900/50 border-t border-slate-800 relative overflow-hidden"
      role="contentinfo"
    >
      <div className="inset-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* About Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image
                src={"SMLRA.png"}
                alt="SMLRA Logo"
                width={32}
                height={32}
                className="sm:w-10 sm:h-10"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient font-display">
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
            <div className="text-slate-400 text-sm">
              <Link
                href={`https://maps.app.goo.gl/guR36dadWsfPjjBn9`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-blue-500 transition-colors"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                <address className="not-italic">
                  Somaiya College of Engineering
                  <br />
                  Department of Computer Science
                  <br />
                  Mumbai, Maharashtra, India - 400077
                </address>
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4 sm:space-y-6 text-left">
            <h4 className="text-xl sm:text-2xl font-semibold font-display text-left">Connect with us</h4>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-start">
              <Link
                href="https://www.linkedin.com/company/smlra-kjsce/posts/?feedView=all"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-[#2365b5]/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Connect on LinkedIn"
                target="_blank"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/smlra_kjsce?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="text-slate-400 hover:text-pink-400 transition-colors p-2 rounded-lg hover:bg-[#f60669]/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
                aria-label="Follow on Instagram"
                target="_blank"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="https://www.youtube.com/@smlra-kjsce6909"
                className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-[#f60002]/20 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Subscribe to YouTube"
                target="_blank"
              >
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="mailto:smlra-kjsce@somaiya.edu"
                className="text-slate-400 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-[#33a951]/20 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Send us an email"
                target="_blank"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </div>

            {/* Contact Information */}
            <div className="text-sm text-slate-400 space-y-3 sm:space-y-4 text-left">
              <div>
                <p className="font-mono text-blue-400 text-left">smlra-kjsce@somaiya.edu</p>
              </div>
              
              <div className="space-y-2 text-left">
                <p className="font-mono text-sm sm:text-base font-bold text-slate-300 text-left">Council Lead</p>
                <p className="font-mono text-xs sm:text-sm text-left">Vibhu: +91 9877747148</p>
              </div>
              
              <div className="space-y-2 text-left">
                <p className="font-mono text-sm sm:text-base font-bold text-slate-300 text-left">Council Co Lead</p>
                <div className="space-y-1 text-left">
                  <p className="font-mono text-xs sm:text-sm text-left">Sambhav: +91 7007231054</p>
                  <p className="font-mono text-xs sm:text-sm text-left">Aryan: +91 9004136721</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-4 sm:space-y-6 text-left">
            <h4 className="text-xl sm:text-2xl font-semibold font-display lg:hidden text-left">Location</h4>
            <div className="w-full aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7927659956486!2d72.8973512749772!3d19.072846982131143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c70058b8f75b%3A0x30141bc68f2501ae!2sSMLRA%20-%20Somaiya%20Machine%20Learning%20Research%20Association!5e0!3m2!1sen!2sin!4v1735114240403!5m2!1sen!2sin"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SMLRA Location Map"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="text-slate-400 text-xs sm:text-sm text-left">
              <p>
                &copy; 2025 SMLRA - Somaiya Machine Learning Research
                Association. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-start sm:justify-end items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}