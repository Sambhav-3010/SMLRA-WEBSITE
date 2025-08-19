"use client";

import { motion, useInView } from "framer-motion";
import { Brain, Eye } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

type ResearchArea = {
  title: string;
  description: string;
  technologies: string[];
  illustration?: string;
  color: string;
  icon: React.ElementType;
  projects: number;
  accuracy: string;
};

const researchAreas: ResearchArea[] = [
  {
    title: "Composite Sketch Generation",
    description:
      "AI-powered system that generates precise suspect sketches from eyewitness descriptions using generative models and LLMs for forensic use.",
    technologies: ["Stable Diffusion", "GANs", "CLIP", "GPT", "OpenCV"],
    illustration: "/1.jpg",
    color: "from-green-400 to-blue-400",
    icon: Brain,
    projects: 12,
    accuracy: "97.2% accuracy",
  },
  {
    title: "AI Companions in Early Childhood Development",
    description:
      "Examining how AI companions shape early childhood development, balancing opportunities for growth with potential risks.",
    technologies: ["SFT", "NLP", "RAG", "NLTK"],
    illustration: "/2.jpg",
    color: "from-purple-400 to-pink-400",
    icon: Eye,
    projects: 8,
    accuracy: "95.8% accuracy",
  },
];

export default function AIResearchAreas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      id="research-areas"
    >
      <div className="absolute inset-0 data-flow opacity-20" />
      <div className="absolute inset-0 holographic opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 font-display"
            animate={
              isInView
                ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                : {}
            }
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <span className="text-gradient">Research</span> Domains
          </motion.h2>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Exploring cutting-edge AI technologies across multiple domains with
            state-of-the-art results
          </p>
          <motion.div
            className="mt-6 font-mono text-sm text-slate-400 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              6+ active projects
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Cutting-edge AI Research
            </span>
          </motion.div>
        </motion.header>

        {/* Research Cards */}
        <div className="flex justify-center items-center gap-8 flex-row w-full">
          <div className="flex flex-row gap-8 w-full max-w-3xl mx-auto justify-center items-stretch">
            {researchAreas.map((area, index) => (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group interactive-card flex-1 min-w-0"
              >
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden card-hover-intense group-hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col">
                  {/* Illustration */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={area.illustration || "/placeholder.svg"}
                      alt={`${area.title} research illustration`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${area.color} flex items-center justify-center shadow-lg`}
                      >
                        <area.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <header>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 font-display">
                        {area.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </header>

                    {/* Tech Stack */}
                    <div className="mt-auto">
                      <div className="text-xs text-slate-500 mb-2 font-mono font-semibold tracking-wide">
                        TECH STACK:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-slate-800/70 text-slate-300 px-3 py-1 rounded-full font-mono border border-slate-700/50 hover:border-blue-500/50 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6 font-mono">
            Interested in collaborating on cutting-edge AI research?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 glow-effect focus-visible"
          >
            Join Our Research
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
