"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Brain, Cpu, Database, Code, Zap, GitBranch } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link focus-visible">
        Skip to main content
      </a>

      {/* Advanced Neural Network Background */}
      <motion.div className="absolute inset-0 neural-network-bg" style={{ y, opacity }} />
      <div className="absolute inset-0 circuit-advanced opacity-20" />
      <div className="absolute inset-0 data-flow opacity-30" />

      {/* Animated Neural Nodes */}
      <div className="absolute inset-0 parallax-slow">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute neural-node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Floating AI Icons with Parallax */}
      <div className="absolute inset-0 parallax-medium">
        {[Brain, Cpu, Database, Code, Zap, GitBranch].map((Icon, i) => (
          <motion.div
            key={`icon-${i}`}
            className="absolute text-blue-400/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.7,
            }}
          >
            <Icon className="h-16 w-16" />
          </motion.div>
        ))}
      </div>

      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 matrix-rain opacity-40 parallax-fast" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 border border-blue-500/30 rounded-full px-8 py-4 holographic"
          >
            <Brain className="h-6 w-6 text-blue-400" />
            <span className="text-sm text-blue-300 font-mono font-medium tracking-wide">
              Neural Networks • Deep Learning • AI Innovation
            </span>
            <Zap className="h-5 w-5 text-green-400" />
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold font-display"
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
            <motion.span
              className="text-white block mt-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              AI Research Lab
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
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
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
              <div className="text-xs text-slate-400 font-mono">// Latest Research Focus</div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="font-mono text-sm leading-relaxed">
              <span className="code-keyword">import</span> <span className="code-variable">torch</span>{" "}
              <span className="code-keyword">as</span> <span className="code-variable">nn</span>
              <br />
              <span className="code-keyword">from</span> <span className="code-string">"transformers"</span>{" "}
              <span className="code-keyword">import</span> <span className="code-function">AutoModel</span>
              <br />
              <span className="code-keyword">from</span> <span className="code-string">"smlra.models"</span>{" "}
              <span className="code-keyword">import</span> <span className="code-function">AdvancedTransformer</span>
              <br />
              <br />
              <span className="code-comment"># Building next-generation AI models</span>
              <br />
              <span className="code-keyword">class</span> <span className="code-function">SMLRAModel</span>
              <span className="code-operator">(</span>
              <span className="code-function">nn.Module</span>
              <span className="code-operator">)</span>
              <span className="code-operator">:</span>
              <br />
              &nbsp;&nbsp;<span className="code-keyword">def</span> <span className="code-function">forward</span>
              <span className="code-operator">(</span>
              <span className="code-keyword">self</span>
              <span className="code-operator">,</span> <span className="code-variable">x</span>
              <span className="code-operator">)</span>
              <span className="code-operator">:</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span>{" "}
              <span className="code-keyword">self</span>
              <span className="code-operator">.</span>
              <span className="code-function">innovation</span>
              <span className="code-operator">(</span>
              <span className="code-variable">x</span>
              <span className="code-operator">)</span>
              <br />
              <br />
              <span className="code-comment"># Accuracy: 96.8% | Inference: &lt;50ms</span>
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
              <Brain className="h-6 w-6" />
              <span className="text-lg">Explore Research</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>

            <Link
              href="/team"
              className="group border-2 border-blue-500/50 hover:border-blue-400 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 px-10 py-5 rounded-full font-semibold transition-all duration-500 flex items-center space-x-3 focus-visible"
              aria-label="Meet our AI research team"
            >
              <Cpu className="h-6 w-6" />
              <span className="text-lg">Meet Researchers</span>
            </Link>
          </motion.div>

          {/* Enhanced Research Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12"
          >
            {[
              { label: "Models Trained", value: "500+", icon: Brain },
              { label: "Research Papers", value: "40+", icon: Database },
              { label: "Active Datasets", value: "25+", icon: Code },
              { label: "Accuracy Rate", value: "96.8%", icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center group interactive-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gradient font-mono group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
