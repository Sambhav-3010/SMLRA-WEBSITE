"use client";

import { motion } from "framer-motion";
import { Book, Mail } from "lucide-react";
// Linkedin icon is deprecated, use a placeholder SVG or import from simple-icons if available
import Image from "next/image";
import Link from "next/link";
import allTeamsData from "@/lib/data/teams.json";
import FacultyCard from "@/components/FacultyCard";

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
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {faculty[0].members.map(
              (
                member: {
                  name: string;
                  role: string;
                  imageUrl: string;
                  linkedinUrl: string;
                  facultyProfileUrl: string;
                  email: string;
                },
                index: number
              ) => (
                <FacultyCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  imageUrl={member.imageUrl}
                  linkedinUrl={member.linkedinUrl}
                  facultyProfileUrl={member.facultyProfileUrl}
                  email={member.email}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </section>

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
