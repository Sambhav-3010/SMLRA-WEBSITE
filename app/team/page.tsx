"use client";

import { motion } from "framer-motion";
import { Book, Mail } from "lucide-react";
// Linkedin icon is deprecated, use a placeholder SVG or import from simple-icons if available
import Image from "next/image";
import Link from "next/link";
import allTeamsData from "@/lib/data/teams.json";
import Card from "@/components/Card";

export default function TeamPage() {
  const faculty = allTeamsData.faculty;
  console.log(faculty);
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="mt-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Meet the brilliant minds behind SMLRA's success. Our diverse team
              of researchers, students, and faculty advisors work together to
              push the boundaries of AI and ML.
            </p>
          </motion.div>
        </div>
      </section>

      <h1 className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold">
        Our <span className="text-gradient">Faculty</span>
      </h1>

      {/* Team Grid */}
      <div className="flex flex-wrap justify-center gap-8 py-12">
        {faculty[0].members.map(
          (member: {
            name: string;
            role: string;
            imageUrl: string;
            linkedinUrl: string;
            facultyProfileUrl: string;
            email: string;
          }) => (
            <Card
              key={member.name}
              className="w-96 h-96 flex flex-col items-center justify-center rounded-2xl shadow-lg bg-slate-900 p-6 transition hover:shadow-xl"
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={220}
                height={220}
                className="rounded-full border-4 border-slate-800 shadow-md mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-slate-100 text-center">
                {member.name}
              </h3>
              <p className="text-slate-400 text-sm mb-4 text-center">
                {member.role}
              </p>
              <div className="flex items-center justify-center gap-4 mt-auto">
                <Link
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-slate-800 transition"
                >
                  <svg
                    className="h-6 w-6 text-slate-400 hover:text-slate-200 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>LinkedIn</title>
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 
                2.761 2.239 5 5 5h14c2.761 0 5-2.239 
                5-5v-14c0-2.761-2.239-5-5-5zm-11 
                19h-3v-10h3v10zm-1.5-11.268c-.966 
                0-1.75-.784-1.75-1.75s.784-1.75 
                1.75-1.75 1.75.784 1.75 1.75-.784 
                1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 
                0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 
                1.379-1.563 2.838-1.563 3.036 0 
                3.6 2.001 3.6 4.601v5.595z"
                    />
                  </svg>
                </Link>
                <Link
                  href={member.facultyProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-slate-800 transition"
                >
                  <Book className="h-6 w-6 text-slate-400 hover:text-slate-200 transition-colors" />
                </Link>
                <Link href={`mailto:${member.email}`}>
                  <Mail className="h-6 w-6 text-slate-400 hover:text-slate-200 transition-colors" />
                </Link>
              </div>
            </Card>
          )
        )}
      </div>

      {/* Join Us Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join Our <span className="text-gradient">Community</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Interested in becoming part of our research community? We're
              always looking for passionate individuals who want to make a
              difference in AI and ML.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 glow-effect">
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
