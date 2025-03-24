"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PortfolioItem {
  id: number
  title: string
  description: string
  category: string
  year: string
  client?: string
  images: string[]
}

interface PortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  item: PortfolioItem | null
}

export function PortfolioModal({ isOpen, onClose, item }: PortfolioModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [item])

  if (!item) return null

  const handleNext = () => {
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      handleNext()
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      handlePrev()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[90vw] h-[85vh] p-0 bg-[#0c0c0c] border-[#222] overflow-hidden">
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Image gallery */}
          <div
            className="relative w-full md:w-2/3 h-1/2 md:h-full bg-black"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentImageIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <img
                    src={item.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${item.title} - image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentImageIndex ? 1 : -1)
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white w-4" : "bg-white/40"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Text description */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-8 bg-[#0c0c0c]">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl text-white/90">{item.title}</h2>

              <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                <div>
                  <p className="text-white/40">类别</p>
                  <p>{item.category}</p>
                </div>
                <div>
                  <p className="text-white/40">年份</p>
                  <p>{item.year}</p>
                </div>
                {item.client && (
                  <div>
                    <p className="text-white/40">客户</p>
                    <p>{item.client}</p>
                  </div>
                )}
              </div>

              <div className="h-px bg-white/10 w-full my-6" />

              <div className="space-y-4 text-white/70">
                <p className="whitespace-pre-line">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

