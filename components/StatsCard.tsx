"use client"

import { motion } from "framer-motion"

interface StatsCardProps {
  category: string
  value: string
  description?: string
  color?: "blue" | "white" | "gray"
  tags?: string[]
  className?: string
}

export default function StatsCard({
  category,
  value,
  description,
  color = "white",
  tags,
  className = "",
}: StatsCardProps) {
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
      {tags ? (
        <div className="h-full flex flex-col">
          <div className="mb-2 sm:mb-4">
            <span className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/10">{category}</span>
          </div>
          <div className="flex-1 flex flex-wrap gap-1 sm:gap-2 content-center justify-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 text-xs sm:text-sm inline-block"
                style={{
                  transform: `rotate(${Math.random() * 6 - 3}deg)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="mb-2 sm:mb-4">
            <span className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/10">{category}</span>
          </div>
          <div className="mt-auto">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{value}</div>
            {description && <p className="text-xs sm:text-sm opacity-70">{description}</p>}
          </div>
        </div>
      )}
    </motion.div>
  )
}

