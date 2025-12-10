"use client";

import { motion, useInView } from "framer-motion";
import LogoLoop from "./LogoLoop";
import { useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPycharm,
  SiPython,
  SiTensorflow,
  SiKaggle,
  SiHuggingface,
  SiNvidia,
  SiGooglecolab,
  SiJupyter,
  SiGooglegemini,
  SiClaude,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiExpress />,
    title: "Express",
    href: "https://expressjs.com/",
  },
  {
    node: <SiMongodb />,
    title: "MongoDB",
    href: "https://www.mongodb.com/"
  },
  {
    node: <SiPycharm />,
    title: "PyCharm",
    href: "https://www.jetbrains.com/pycharm/",
  },
  {
    node: <SiPython />,
    title: "Python",
    href: "https://www.python.org/",
  },
  {
    node: <SiTensorflow />,
    title: "TensorFlow",
    href: "https://www.tensorflow.org/",
  },
  {
    node: <SiKaggle />,
    title: "Kaggle",
    href: "https://www.kaggle.com/",
  },
  {
    node: <SiHuggingface />,
    title: "Hugging Face",
    href: "https://huggingface.co/",
  },
  {
    node: <SiNvidia />,
    title: "NVIDIA",
    href: "https://www.nvidia.com/",
  },
  {
    node: <SiGooglecolab />,
    title: "Google Colab",
    href: "https://colab.research.google.com/",
  },
  {
    node: <SiJupyter />,
    title: "Jupyter",
    href: "https://jupyter.org/",
  },
  {
    node: <SiGooglegemini />,
    title: "Google Gemini",
    href: "https://gemini.google.com/app"
  },
  {
    node: <SiClaude />,
    title: "Claude",
    href: "https://www.anthropic.com/claude"
  },
  {
    node: <SiOpencv />,
    title: "OpenCV",
    href: "https://opencv.org/"
  },
  {
    node: <SiNumpy />,
    title: "NumPy",
    href: "https://numpy.org/"
  },
  {
    node: <SiPandas />,
    title: "Pandas",
    href: "https://pandas.pydata.org/"
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/"
  }
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <>
      <motion.header
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-32 mt-20"
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
          <span className="text-gradient">Our Tech</span> Stack
        </motion.h2>
        <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
          The technologies we use to build our AI solutions
        </p>
      </motion.header>
      <div
        style={{ height: "200px", position: "relative", overflow: "hidden" }}
      >
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technology partners"
        />
      </div>
    </>
  );
}
