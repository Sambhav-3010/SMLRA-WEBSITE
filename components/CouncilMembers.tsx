"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

type PastCouncilCardProps = {
  name: string;
  role: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  index?: number;
  className?: string;
};

export default function PastCouncilCard({
  name,
  role,
  imageUrl,
  githubUrl,
  linkedinUrl,
  instagramUrl,
  index = 0,
  className = "",
}: PastCouncilCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`w-full ${className} mt-5`}
    >
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 h-full">
        {/* Vertical layout: Image on top, content below */}
        <div className="flex flex-col h-full">
          {/* Image at the top */}
          <div className="flex justify-center pt-6 pb-4">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover rounded-full border-2 border-purple-500/20"
              />
            </div>
          </div>

          {/* Content at the bottom */}
          <div className="p-4 sm:p-5 flex flex-col flex-grow">
            <div className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 w-fit">
              {role}
            </div>

            <h3 className="text-base sm:text-lg font-bold mb-4 text-white transition-colors duration-300 group-hover:text-purple-400 leading-tight flex-grow">
              {name}
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              {linkedinUrl && linkedinUrl !== "#" && (
                <Link
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 transition-colors duration-300 hover:text-purple-400"
                >
                  <Linkedin className="h-3 w-3" />
                  <span>LinkedIn</span>
                </Link>
              )}

              {githubUrl && githubUrl !== "#" && (
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 transition-colors duration-300 hover:text-purple-400"
                >
                  <Github className="h-3 w-3" />
                  <span>GitHub</span>
                </Link>
              )}

              {instagramUrl && instagramUrl !== "#" && (
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 transition-colors duration-300 hover:text-purple-400"
                >
                  <Instagram className="h-3 w-3" />
                  <span>Instagram</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}