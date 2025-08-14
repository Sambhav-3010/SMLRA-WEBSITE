"use client"

import { motion } from "framer-motion"
import { Activity, Cpu, Database, Zap, TrendingUp, Users } from "lucide-react"
import { useState, useEffect } from "react"

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    modelsTraining: 12,
    cpuUsage: 78,
    gpuUsage: 92,
    dataProcessed: 2.4,
    activeResearchers: 24,
    accuracy: 96.8,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        modelsTraining: prev.modelsTraining + Math.floor(Math.random() * 3) - 1,
        cpuUsage: Math.max(60, Math.min(95, prev.cpuUsage + Math.floor(Math.random() * 10) - 5)),
        gpuUsage: Math.max(80, Math.min(98, prev.gpuUsage + Math.floor(Math.random() * 6) - 3)),
        dataProcessed: Math.max(1, prev.dataProcessed + Math.random() * 0.2 - 0.1),
        activeResearchers: Math.max(15, Math.min(30, prev.activeResearchers + Math.floor(Math.random() * 3) - 1)),
        accuracy: Math.max(95, Math.min(99, prev.accuracy + Math.random() * 0.4 - 0.2)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const metricsData = [
    {
      icon: Activity,
      label: "Models Training",
      value: metrics.modelsTraining,
      unit: "",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Cpu,
      label: "CPU Usage",
      value: metrics.cpuUsage,
      unit: "%",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: Zap,
      label: "GPU Usage",
      value: metrics.gpuUsage,
      unit: "%",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
    },
    {
      icon: Database,
      label: "Data Processed",
      value: metrics.dataProcessed.toFixed(1),
      unit: "TB/hr",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: Users,
      label: "Active Researchers",
      value: metrics.activeResearchers,
      unit: "",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
    },
    {
      icon: TrendingUp,
      label: "Avg Accuracy",
      value: metrics.accuracy.toFixed(1),
      unit: "%",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 neural-bg opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-gradient">Live</span> Lab Metrics
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time insights into our AI research infrastructure
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-mono text-sm text-slate-400">Live Data • Updated every 3s</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold font-mono ${metric.color}`}>
                    {metric.value}
                    {metric.unit}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">REAL-TIME</div>
                </div>
              </div>

              <div className="text-sm text-slate-300 font-medium mb-2">{metric.label}</div>

              {/* Progress bar for percentage metrics */}
              {metric.unit === "%" && (
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      metric.color.includes("blue")
                        ? "from-blue-500 to-cyan-500"
                        : metric.color.includes("yellow")
                          ? "from-yellow-500 to-orange-500"
                          : "from-emerald-500 to-green-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-slate-900/50 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">System Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-mono">All Systems Operational</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">GPU Cluster:</span>
              <span className="text-green-400">● Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Data Pipeline:</span>
              <span className="text-green-400">● Running</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Model Registry:</span>
              <span className="text-green-400">● Healthy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
