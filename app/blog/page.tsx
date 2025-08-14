"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    slug: "transformer-architecture-explained",
    title: "Understanding Transformer Architecture: A Deep Dive",
    excerpt: "Explore the revolutionary transformer architecture that powers modern NLP models like GPT and BERT.",
    author: "Priya Sharma",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Deep Learning",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 2,
    slug: "computer-vision-healthcare",
    title: "Computer Vision Applications in Healthcare",
    excerpt: "How AI-powered image analysis is revolutionizing medical diagnosis and treatment.",
    author: "Arjun Patel",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Computer Vision",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 3,
    slug: "ethical-ai-development",
    title: "Ethical Considerations in AI Development",
    excerpt: "Addressing bias, fairness, and transparency in machine learning systems.",
    author: "Ananya Singh",
    date: "2024-01-05",
    readTime: "10 min read",
    category: "AI Ethics",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 4,
    slug: "reinforcement-learning-robotics",
    title: "Reinforcement Learning in Robotics",
    excerpt: "Training autonomous agents to perform complex tasks through trial and error.",
    author: "Rahul Kumar",
    date: "2023-12-28",
    readTime: "7 min read",
    category: "Reinforcement Learning",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 5,
    slug: "nlp-sentiment-analysis",
    title: "Advanced Techniques in Sentiment Analysis",
    excerpt: "Modern approaches to understanding emotions and opinions in text data.",
    author: "Priya Sharma",
    date: "2023-12-20",
    readTime: "9 min read",
    category: "NLP",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 6,
    slug: "gan-creative-applications",
    title: "GANs: Beyond Image Generation",
    excerpt: "Exploring creative and practical applications of Generative Adversarial Networks.",
    author: "Vikram Reddy",
    date: "2023-12-15",
    readTime: "5 min read",
    category: "Generative AI",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Research <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Insights, discoveries, and technical deep-dives from our research community. Stay updated with the latest
              in AI and ML research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">
                <span className="text-gradient">Featured Article</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden card-hover group-hover:border-blue-500/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative h-64 lg:h-auto">
                      <Image
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                      <div className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                        {featuredPost.category}
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                        {featuredPost.title}
                      </h3>

                      <p className="text-slate-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-center">
              Latest <span className="text-gradient">Articles</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden card-hover group-hover:border-blue-500/50">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
