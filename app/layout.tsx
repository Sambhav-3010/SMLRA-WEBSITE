import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = {
  title: "SMLRA - Somaya Machine Learning Research Association | AI Research Lab",
  description:
    "Leading AI/ML research lab at Somaya College of Engineering. Advancing neural networks, deep learning, computer vision, and NLP through cutting-edge research and innovation.",
  keywords: [
    "machine learning",
    "artificial intelligence",
    "deep learning",
    "neural networks",
    "computer vision",
    "NLP",
    "AI research",
    "Somaya College",
    "research lab",
    "data science",
    "PyTorch",
    "TensorFlow",
  ],
  authors: [{ name: "SMLRA Team" }],
  creator: "Somaya Machine Learning Research Association",
  publisher: "Somaya College of Engineering",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smlra.somaya.edu",
    siteName: "SMLRA - Somaya Machine Learning Research Association",
    title: "SMLRA - Leading AI/ML Research Lab",
    description:
      "Advancing the frontiers of artificial intelligence and machine learning through innovative research, cutting-edge models, and collaborative learning.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SMLRA - AI Research Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMLRA - Leading AI/ML Research Lab",
    description: "Advancing AI/ML research through neural networks, deep learning, and innovative solutions.",
    images: ["/twitter-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3b82f6",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://smlra.somaya.edu" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans bg-slate-950 text-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
