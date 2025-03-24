"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  value?: string
  description?: string
  color?: "blue" | "white" | "gray"
  href: string
  className?: string
}

export default function ProjectCard({
  title,
  value,
  description,
  color = "white",
  href,
  className = "",
}: ProjectCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-[#1a4bff] text-white"
      case "white":
        return "bg-white text-black"
      case "gray":
        return "bg-[#f2f2f2] text-black"
      default:
        return "bg-white text-black"
    }
  }

  return (
    <motion.div
      className={`rounded-3xl p-4 sm:p-6 ${getColorClasses()} ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href} className="block h-full">
        <div className="h-full flex flex-col">
          <div className="mb-2 sm:mb-4">
            <span className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/10">{title}</span>
          </div>
          <div className="mt-auto">
            {value && <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{value}</div>}
            {description && <p className="text-xs sm:text-sm opacity-70">{description}</p>}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

