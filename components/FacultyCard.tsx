"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Book, Mail, Linkedin } from "lucide-react";

type FacultyCardProps = {
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
  facultyProfileUrl: string;
  email: string;
  index?: number;
  className?: string;
};

export default function FacultyCard({
  name,
  role,
  imageUrl,
  linkedinUrl,
  facultyProfileUrl,
  email,
  index = 0,
  className = "",
}: FacultyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`w-full ${className}`}
    >
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 h-full">
        <div className="flex flex-col lg:flex-row h-full lg:h-96">
          {/* Image - top on mobile/tablet, left on desktop */}
          <div className="relative w-full lg:w-[48%] h-64 lg:h-full flex-shrink-0">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content - bottom on mobile/tablet, right on desktop */}
          <div className="p-4 sm:p-6 flex flex-col justify-center lg:w-3/5">
            <div className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 w-fit">
              {role}
            </div>

            <h3 className="text-lg sm:text-2xl lg:text-2xl lg:mt-2 lg:mb-3 font-bold mb-3 text-white transition-colors duration-300 group-hover:text-blue-400 leading-tight">
              {name}
            </h3>
            
            <p className="text-slate-300 mb-4 sm:mb-5 leading-relaxed text-xs sm:text-sm lg:text-base">
              {email}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400">
              <Link
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 transition-colors duration-300 hover:text-blue-400"
              >
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>LinkedIn</span>
              </Link>

              <Link
                href={`mailto:${email}`}
                className="flex items-center space-x-2 transition-colors duration-300 hover:text-blue-400"
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Email</span>
              </Link>

              <Link
                href={facultyProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 transition-colors duration-300 hover:text-blue-400"
              >
                <Book className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}