"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Award,
  Zap,
  Globe,
} from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Vision",
    description: [
      "To foster a thriving culture of Machine Learning and Deep Learning research at KJSSE by cultivating meaningful student-researcher collaboration and encouraging original scientific inquiry. Our mission is to create an environment where curiosity meets expertise, enabling breakthrough discoveries and innovative solutions.",
      "We are committed to building clear pathways to cutting-edge innovations in artificial intelligence that drive Industry 4.0 and beyond. Through our comprehensive research initiatives, we aim to bridge the gap between academic excellence and real-world applications that shape the future of technology.",
    ],
  },
  {
    icon: Heart,
    title: "Values",
    description:
      "Collaboration • Innovation • Excellence • Curiosity • Community",
    valuesList: [
      "Collaboration",
      "Innovation",
      "Excellence",
      "Curiosity",
      "Community",
    ],
  },
];

const stats = [
  { number: "2018", label: "Founded", icon: Target },
  { number: "1000+", label: "Models Trained", icon: Zap },
  { number: "4TB+", label: "Data Processed", icon: Globe },
  { number: "6+", label: "Ongoing Research", icon: Lightbulb },
];

const highlights = [
  {
    icon: Users,
    title: "Collaborative Community",
    description: "Building bridges between students and industry experts",
  },
  {
    icon: Award,
    title: "Research Excellence",
    description: "Fostering original inquiry and cutting-edge AI innovations",
  },
  {
    icon: Lightbulb,
    title: "Knowledge Sharing",
    description: "Symposiums, workshops, and peer-to-peer learning",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden h-screen flex items-center flex-col justify-center">
        <BackgroundDecorations />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SMLRA
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Dedicated student community of KJSSE with an aim to accelerate
              collaboration among students in AI research and development.
              Discover what motivates our members and the importance of such a
              community at our university.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story + Stats Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Story
                </span>
              </h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Founded in{" "}
                  <span className="text-blue-400 font-semibold">2018</span> at
                  KJSSE, the Somaiya Machine Learning Research Association
                  (SMLRA) draws inspiration from research communities at{" "}
                  <span className="text-cyan-400 font-semibold">
                    MIT, Stanford, and IIT Bombay
                  </span>
                  .
                </p>
                <p>
                  With the growing global impact of AI, Machine Learning, and
                  Deep Learning, SMLRA fosters a research-driven ecosystem
                  bridging students and researchers, encouraging{" "}
                  <span className="text-purple-400 font-semibold">
                    innovation and intellectual growth
                  </span>
                  .
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl grid grid-cols-2 gap-8">
                {stats.map((stat, idx) => (
                  <div key={stat.label} className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-slate-900/40 to-cyan-950/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold mb-8"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Mission
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-slate-300 max-w-5xl mx-auto leading-relaxed"
            >
              Our mission is to cultivate a research-focused AI community
              through symposiums, workshops, and competitions. By supporting
              student-led research and connecting them with domain experts, we
              build a collaborative network for peer-to-peer learning and
              impactful contributions to AI.
            </motion.p>
          </div>

          {/* Highlights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 hover:border-blue-500/30"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <highlight.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {highlight.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 h-full hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {value.title}
                    </h3>
                  </div>

                  {value.title === "Values" ? (
                    <div className="space-y-4">
                      <p className="text-slate-400 text-lg leading-relaxed mb-6">
                        Our core values guide everything we do:
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {value.valuesList?.map((val, i) => (
                          <motion.div
                            key={val}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-3 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                            <span className="text-slate-300 font-medium">
                              {val}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-lg leading-relaxed">
                      {value.description[0]}
                      <br />
                      <br />
                      {value.description[1]}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20 shadow-2xl"
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Innovate
              </span>{" "}
              with Us?
            </h3>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Join a community of passionate researchers and innovators shaping
              the future of AI.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Get Involved
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function BackgroundDecorations() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5"></div>
      <div className="absolute inset-0 grid-bg opacity-5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>
  );
}
