"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Node {
  id: string
  x: number
  y: number
  layer: number
  active: boolean
}

interface Connection {
  from: string
  to: string
  weight: number
  active: boolean
}

export default function InteractiveNeuralNetwork() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])

  useEffect(() => {
    // Generate neural network structure
    const layers = [4, 6, 6, 3] // Input, Hidden1, Hidden2, Output
    const newNodes: Node[] = []
    const newConnections: Connection[] = []

    let nodeId = 0
    layers.forEach((layerSize, layerIndex) => {
      for (let i = 0; i < layerSize; i++) {
        newNodes.push({
          id: `node-${nodeId}`,
          x: layerIndex * 200 + 50,
          y: i * 60 + 50 + (layerIndex % 2) * 30,
          layer: layerIndex,
          active: false,
        })
        nodeId++
      }
    })

    // Generate connections between layers
    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerNodes = newNodes.filter((n) => n.layer === layer)
      const nextLayerNodes = newNodes.filter((n) => n.layer === layer + 1)

      currentLayerNodes.forEach((fromNode) => {
        nextLayerNodes.forEach((toNode) => {
          newConnections.push({
            from: fromNode.id,
            to: toNode.id,
            weight: Math.random() * 2 - 1, // Random weight between -1 and 1
            active: false,
          })
        })
      })
    }

    setNodes(newNodes)
    setConnections(newConnections)

    // Start animation sequence
    const animateNetwork = async () => {
      while (true) {
        // Forward propagation animation
        for (let layer = 0; layer < 4; layer++) {
          // Activate nodes in current layer
          setNodes((prev) =>
            prev.map((node) => ({
              ...node,
              active: node.layer === layer,
            })),
          )

          // Activate connections from current layer
          setConnections((prev) =>
            prev.map((conn) => {
              const fromNode = newNodes.find((n) => n.id === conn.from)
              return {
                ...conn,
                active: fromNode?.layer === layer,
              }
            }),
          )

          await new Promise((resolve) => setTimeout(resolve, 800))
        }

        // Reset and wait
        setNodes((prev) => prev.map((node) => ({ ...node, active: false })))
        setConnections((prev) => prev.map((conn) => ({ ...conn, active: false })))
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    animateNetwork()
  }, [])

  return (
    <div className="relative w-full h-96 bg-slate-900/30 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="absolute inset-0 neural-network-bg opacity-20" />

      <svg
        className="w-full h-full"
        viewBox="0 0 800 400"
        role="img"
        aria-label="Interactive Neural Network Visualization"
      >
        <title>Neural Network Forward Propagation Animation</title>
        <desc>
          A visualization showing data flowing through a 4-layer neural network with input, hidden, and output layers
        </desc>

        {/* Render connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find((n) => n.id === conn.from)
          const toNode = nodes.find((n) => n.id === conn.to)

          if (!fromNode || !toNode) return null

          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={conn.active ? "#3b82f6" : "#475569"}
              strokeWidth={conn.active ? 2 : 1}
              opacity={conn.active ? 0.8 : 0.3}
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: conn.active ? 1 : 0.5,
                stroke: conn.active ? "#3b82f6" : "#475569",
              }}
              transition={{ duration: 0.5 }}
            />
          )
        })}

        {/* Render nodes */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.active ? 12 : 8}
              fill={node.active ? "#3b82f6" : "#64748b"}
              stroke={node.active ? "#60a5fa" : "#475569"}
              strokeWidth={2}
              animate={{
                r: node.active ? 12 : 8,
                fill: node.active ? "#3b82f6" : "#64748b",
                scale: node.active ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            {node.active && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill="none"
                stroke="#3b82f6"
                strokeWidth={1}
                opacity={0.5}
                initial={{ r: 8, opacity: 0.8 }}
                animate={{ r: 25, opacity: 0 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </motion.g>
        ))}

        {/* Layer labels */}
        <text x="50" y="30" fill="#64748b" fontSize="12" fontFamily="monospace">
          Input
        </text>
        <text x="250" y="30" fill="#64748b" fontSize="12" fontFamily="monospace">
          Hidden 1
        </text>
        <text x="450" y="30" fill="#64748b" fontSize="12" fontFamily="monospace">
          Hidden 2
        </text>
        <text x="650" y="30" fill="#64748b" fontSize="12" fontFamily="monospace">
          Output
        </text>
      </svg>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between text-sm font-mono">
            <span className="text-slate-400">Neural Network Visualization</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400">Forward Pass</span>
              </div>
              <span className="text-slate-500">19 nodes • 42 connections</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
