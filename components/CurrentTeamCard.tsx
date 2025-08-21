"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type CurrentTeamMember = {
  name: string;
  position: string;
  department: string;
  imageUrl: string;
  linktreeUrl: string;
};

type CurrentTeamCardProps = {
  member: CurrentTeamMember;
  index: number;
  className?: string;
};

export default function CurrentTeamCard({
  member,
  index = 0,
  className = "",
}: CurrentTeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`w-full ${className} mt-5`}
    >
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 h-full">
        {/* Vertical layout: Image on top, content below */}
        <div className="flex flex-col h-full">
          {/* Image at the top */}
          <div className="flex justify-center pt-6 pb-4">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36">
              <Image
                src={member.imageUrl === "#" ? "/placeholder.svg" : member.imageUrl}
                alt={member.name}
                fill
                className="object-cover rounded-full border-2 border-blue-500/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
          </div>

          {/* Content at the bottom */}
          <div className="p-4 sm:p-5 flex flex-col flex-grow">
            <div className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 w-fit">
              {member.position}
            </div>

            <h3 className="text-base sm:text-lg font-bold mb-2 text-white transition-colors duration-300 group-hover:text-blue-400 leading-tight">
              {member.name}
            </h3>

            <p className="text-slate-400 text-xs mb-4 flex-grow">
              {member.department}
            </p>

            <div className="flex items-center justify-center">
              {member.linktreeUrl && member.linktreeUrl !== "#" ? (
                <Link
                  href={member.linktreeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:from-green-700 hover:to-green-600 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Linktree</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2 bg-slate-700/50 text-slate-400 px-4 py-2 rounded-full text-xs font-medium opacity-50">
                  <ExternalLink className="h-3 w-3" />
                  <span>Connect</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}