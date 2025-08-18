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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src={"SMLRA.png"}
                alt="SMLRA Logo"
                width={40}
                height={40}
              />
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
                  Mumbai, Maharashtra, India - 400077
                </address>
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-6 ml-12">
            <h4 className="text-2xl font-semibold font-display">Connect with us</h4>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.linkedin.com/company/smlra-kjsce/posts/?feedView=all"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-[#2365b5]/100 focus-visible"
                aria-label="Connect on LinkedIn"
                target="_blank"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/smlra_kjsce?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-[#f60669]/100 focus-visible"
                aria-label="Follow on Instagram"
                target="_blank"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.youtube.com/@smlra-kjsce6909"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-[#f60002]/100 focus-visible"
                aria-label="Subscribe to YouTube"
                target="_blank"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:smlra-kjsce@somaiya.edu"
                className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-[#33a951]/100 focus-visible"
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
                <p className="font-mono text-[16px] font-bold">
                  Council Co Lead
                </p>
                <p className="font-mono">Sambhav: +91 7007231054</p>
                <p className="font-mono">Aryan: +91 9004136721</p>
              </div>
            </div>
          </div>

             {/* Map */}
          <div className="space-y-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7927659956486!2d72.8973512749772!3d19.072846982131143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c70058b8f75b%3A0x30141bc68f2501ae!2sSMLRA%20-%20Somaiya%20Machine%20Learning%20Research%20Association!5e0!3m2!1sen!2sin!4v1735114240403!5m2!1sen!2sin"
              width="360"
              height="280"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800 ">
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
