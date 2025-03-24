"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface FeaturedCardProps {
  title: string
  subtitle?: string
  description?: string
  image?: string
  href: string
  textPosition?: "left" | "right" | "bottom" | "center"
  textColor?: "light" | "dark"
  className?: string
  bgColor?: string
  viewDetailsText?: string
}

export default function FeaturedCard({
  title,
  subtitle,
  description,
  image,
  href,
  textPosition = "left",
  textColor = "light",
  className = "",
  bgColor = "",
  viewDetailsText = "View details",
}: FeaturedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Determine text position classes
  const getTextPositionClasses = () => {
    switch (textPosition) {
      case "left":
        return "items-start text-left"
      case "right":
        return "items-end text-right"
      case "bottom":
        return "items-start text-left justify-end pb-8"
      case "center":
        return "items-center text-center justify-center"
      default:
        return "items-start text-left"
    }
  }

  // Determine text color classes
  const getTextColorClasses = () => {
    return textColor === "light" ? "text-white" : "text-black"
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden ${className} ${bgColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <Link href={href} className="block w-full h-full">
        {/* Background Image (if provided) */}
        {image && (
          <div className="absolute inset-0 w-full h-full">
            <motion.div
              className="w-full h-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        )}

        {/* Overlay for text contrast */}
        {image && <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70" />}

        {/* Content */}
        <div
          className={`relative z-10 flex flex-col p-6 sm:p-8 h-full ${getTextPositionClasses()} ${getTextColorClasses()}`}
        >
          {subtitle && <p className="text-sm mb-1 opacity-80">{subtitle}</p>}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium max-w-[80%] leading-tight">{title}</h3>
          {description && <p className="text-xs sm:text-sm mt-2 sm:mt-4 max-w-[80%] opacity-80">{description}</p>}

          <motion.div
            className="mt-4 sm:mt-6 flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">{viewDetailsText}</span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

