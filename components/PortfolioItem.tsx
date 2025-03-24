"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface PortfolioItemProps {
  id: number
  title: string
  thumbnail: string
  category: string
  onClick: () => void
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  showFrame: boolean
}

export function PortfolioItem({
  id,
  title,
  thumbnail,
  category,
  onClick,
  corner,
  edgeHorizontal,
  edgeVertical,
  showFrame,
}: PortfolioItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [scale, setScale] = useState(1)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isHovered) {
      setScale(1.05)
    } else {
      setScale(1)
    }
  }, [isHovered])

  return (
    <motion.div
      ref={itemRef}
      className="relative w-full h-full cursor-pointer overflow-hidden group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Thumbnail with Border */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `0px` : "0",
            width: showFrame ? `80%` : "100%",
            height: showFrame ? `80%` : "100%",
            left: showFrame ? `10%` : "0",
            top: showFrame ? `10%` : "0",
          }}
        >
          <motion.div
            className="w-full h-full overflow-hidden"
            animate={{ scale }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700"
              src={thumbnail || "/placeholder.svg"}
              alt={title}
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Frame Elements (Higher z-index) */}
        {showFrame && (
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            {/* Corners */}
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})` }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
            />

            {/* Edges */}
            <div
              className="absolute top-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="absolute left-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}

        {/* Overlay with text */}
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex flex-col justify-end p-6 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <h3 className="text-white text-xl md:text-2xl font-light">{title}</h3>
            <p className="text-white/70 text-sm">{category}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

