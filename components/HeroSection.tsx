"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cpu,
  Database,
  Code,
  Zap,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import CNNBackground from "./NeuralBackground";

export default function HeroSection({isMobile}: { isMobile: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="-z-1000 opacity-25 absolute inset-0 h-[">
        <CNNBackground />
      </div>
      {/* Floating AI Icons with Parallax */}
      <div className="absolute inset-0 parallax-medium">
        {(isMobile
          ? [Brain, Code, Database, Cpu, Zap]
          : [
              Brain,
              Cpu,
              Database,
              Code,
              Zap,
              GitBranch,
              Brain,
              Cpu,
              Database,
              Code,
              GitBranch,
            ]
        ).map((Icon, i) => (
          <motion.div
            key={`icon-${i}`}
            className="absolute text-blue-600"
            style={{
              ...(isMobile ? { left: `${7 + i * 24}%` } : { right: `${7 + i * 8}%` }),
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.6, 1.0, 0.6],
            }}
            transition={{
              duration: 8 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.7,
            }}
          >
            <Icon className="h-12 w-12" />
          </motion.div>
        ))}
      </div>

      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 matrix-rain opacity-40 parallax-fast" />

      <div className="m-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold font-display mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span
              className="text-gradient block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              SMLRA
            </motion.span>
          </motion.h1>

          <motion.div
            className="max-w-5xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <p className="text-xl sm:text-3xl text-slate-300 leading-relaxed font-light">
              Pioneering the future of{" "}
              <motion.span
                className="text-gradient-purple font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Artificial Intelligence
              </motion.span>{" "}
              and{" "}
              <motion.span
                className="text-gradient-green font-semibold"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                }}
              >
                Machine Learning
              </motion.span>
            </p>
            <motion.p
              className="text-lg text-slate-400 font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              {">"} Training neural networks that reshape tomorrow
            </motion.p>
          </motion.div>

          {/* Enhanced Code Snippet */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="max-w-3xl mx-auto code-block-enhanced p-6 text-left interactive-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="font-mono text-sm leading-relaxed">
              <span className="code-keyword">import</span>{" "}
              <span className="code-variable">tensorflow</span>{" "}
              <span className="code-keyword">as</span>{" "}
              <span className="code-variable">tf</span>
              <br />
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">transformers</span>{" "}
              <span className="code-keyword">import</span>{" "}
              <span className="code-function">pipeline</span>
              <br />
              <span className="code-keyword">from</span>{" "}
              <span className="code-string">smlra.models</span>{" "}
              <span className="code-keyword">import</span>{" "}
              <span className="code-function">AdvancedTransformer</span>
              <br />
              <br />
              <span className="code-comment">
                # Building next-generation AI models
              </span>
              <br />
              <span className="code-keyword">class</span>{" "}
              <span className="code-function">SMLRAModel</span>
              <span className="code-operator">(</span>
              <span className="code-function">tf.Module</span>
              <span className="code-operator">)</span>
              <span className="code-operator">:</span>
              <br />
              &nbsp;&nbsp;<span className="code-keyword">def</span>{" "}
              <span className="code-function">forward</span>
              <span className="code-operator">(</span>
              <span className="code-keyword">self</span>
              <span className="code-operator">,</span>{" "}
              <span className="code-variable">x</span>
              <span className="code-operator">)</span>
              <span className="code-operator">:</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="code-keyword">return</span>{" "}
              <span className="code-keyword">self</span>
              <span className="code-operator">.</span>
              <span className="code-function">innovation</span>
              <span className="code-operator">(</span>
              <span className="code-variable">x</span>
              <span className="code-operator">)</span>
              <br />
              <br />
              <span className="code-comment">
                # Accuracy: 96.8% | Inference: &lt;50ms
              </span>
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/about"
              className="group bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-10 py-5 rounded-full font-semibold transition-all duration-500 flex items-center space-x-3 glow-effect card-hover-intense focus-visible"
              aria-label="Explore our AI research and projects"
            >
              <span className="text-lg">Explore Research</span>
            </Link>

            <Link
              href="/team"
              className="group border-2 border-blue-500/50 hover:border-blue-400 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 px-10 py-5 rounded-full font-semibold transition-all duration-500 flex items-center space-x-3 focus-visible"
              aria-label="Meet our AI research team"
            >
              <span className="text-lg">Meet Researchers</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
