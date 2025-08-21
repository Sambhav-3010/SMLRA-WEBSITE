"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

// Mock blog post data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    slug: "transformer-architecture-explained",
    title: "Understanding Transformer Architecture: A Deep Dive",
    excerpt: "Explore the revolutionary transformer architecture that powers modern NLP models like GPT and BERT.",
    content: `
      <p>The Transformer architecture, introduced in the groundbreaking paper "Attention Is All You Need" by Vaswani et al., has revolutionized the field of natural language processing and beyond. This architecture has become the foundation for many state-of-the-art models including BERT, GPT, and T5.</p>
      
      <h2>What Makes Transformers Special?</h2>
      <p>Unlike traditional RNNs and CNNs, Transformers rely entirely on attention mechanisms to draw global dependencies between input and output. This allows for much more parallelization during training and better handling of long-range dependencies.</p>
      
      <h2>Key Components</h2>
      <p>The Transformer consists of an encoder and decoder stack, each containing multiple layers with two main sub-layers:</p>
      <ul>
        <li><strong>Multi-Head Self-Attention:</strong> Allows the model to attend to different positions of the input sequence simultaneously</li>
        <li><strong>Position-wise Feed-Forward Networks:</strong> Applies transformations to each position separately and identically</li>
      </ul>
      
      <h2>Self-Attention Mechanism</h2>
      <p>The self-attention mechanism is the heart of the Transformer. It computes attention weights for each position in the sequence, allowing the model to focus on relevant parts of the input when processing each element.</p>
      
      <h2>Applications and Impact</h2>
      <p>Transformers have found applications far beyond NLP, including computer vision (Vision Transformer), protein folding (AlphaFold), and even game playing (MuZero). Their versatility and effectiveness have made them the go-to architecture for many AI applications.</p>
    `,
    author: "Priya Sharma",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Deep Learning",
    image: "/placeholder.svg?height=400&width=800",
  },
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>

            <div className="mb-6">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 mb-8">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-64 sm:h-96 rounded-2xl overflow-hidden"
          >
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold">
              More <span className="text-gradient">Articles</span>
            </h2>
          </motion.div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              <span>View All Articles</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
