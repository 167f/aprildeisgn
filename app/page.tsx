"use client"

import { useState, useEffect, useRef } from "react"
import NavBar from "@/components/NavBar"
import FeaturedCard from "@/components/FeaturedCard"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, ChevronLeft, ChevronRight, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/LanguageContext"

// Hero slider images
const heroImages = [
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
  "/placeholder.svg?height=800&width=1400",
]

// Skills data
const skills = [
  {
    category: "3D Design",
    items: ["Rhino", "KEYSHOT", "C4D", "Blender", "Fusion 360", "SolidWorks"],
    color: "bg-blue-50 hover:bg-blue-100",
    textColor: "text-blue-800",
  },
  {
    category: "AI Tools",
    items: ["Midjourney", "Stable Diffusion", "DALL-E", "ChatGPT", "Adobe Firefly"],
    color: "bg-purple-50 hover:bg-purple-100",
    textColor: "text-purple-800",
  },
  {
    category: "2D Design",
    items: ["Photoshop", "Illustrator", "Figma", "InDesign", "After Effects", "Premiere Pro"],
    color: "bg-green-50 hover:bg-green-100",
    textColor: "text-green-800",
  },
  {
    category: "Other Skills",
    items: ["UI/UX Design", "Brand Identity", "Motion Graphics", "Prototyping", "Design Research"],
    color: "bg-amber-50 hover:bg-amber-100",
    textColor: "text-amber-800",
  },
]

// Skill descriptions
const skillDescriptions: Record<string, string> = {
  Rhino: "Expert in creating precise 3D models for industrial design projects.",
  KEYSHOT: "Skilled in creating photorealistic renders with advanced lighting and materials.",
  C4D: "Proficient in creating complex 3D animations and visual effects.",
  Blender: "Experienced in creating organic models and animations for various projects.",
  "Fusion 360": "Skilled in parametric modeling and CAD for product design.",
  SolidWorks: "Proficient in engineering-focused 3D modeling and simulation.",
  Midjourney: "Advanced prompt engineering for generating concept art and design inspiration.",
  "Stable Diffusion": "Expert in fine-tuning models and creating custom styles for design projects.",
  "DALL-E": "Skilled in generating and iterating on visual concepts quickly.",
  ChatGPT: "Proficient in using AI for design research and concept development.",
  "Adobe Firefly": "Experienced in creating and modifying images with AI assistance.",
  Photoshop: "Expert in image editing, compositing, and digital painting.",
  Illustrator: "Skilled in creating vector graphics and illustrations for various applications.",
  Figma: "Proficient in UI/UX design, prototyping, and collaborative design workflows.",
  InDesign: "Experienced in creating print and digital publications with professional layouts.",
  "After Effects": "Expert in creating motion graphics and visual effects for videos.",
  "Premiere Pro": "Skilled in video editing and post-production.",
  "UI/UX Design": "Proficient in creating user-centered digital experiences with a focus on usability.",
  "Brand Identity": "Experienced in developing comprehensive brand systems and visual identities.",
  "Motion Graphics": "Skilled in creating animated visual elements for various media.",
  Prototyping: "Expert in creating functional prototypes to test and validate design concepts.",
  "Design Research": "Proficient in conducting user research to inform design decisions.",
}

export default function Home() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)
  const [zoomedSlide, setZoomedSlide] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    // Auto-advance slides
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    resetSlideInterval()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
    resetSlideInterval()
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    resetSlideInterval()
  }

  const resetSlideInterval = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12">
        {/* Hero Section with Slider */}
        <section id="home-section" className="w-full py-16 md:py-24">
          <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl">
            {/* Slider */}
            <div
              className="w-full h-full flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className="min-w-full h-full cursor-pointer"
                  style={{ flex: "0 0 100%" }}
                  onClick={() => setZoomedSlide(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Hero slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white w-4" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works-section" className="w-full py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">{t.myWorks}</h2>
            <p className="text-black/60">{t.designPurestForm}</p>
          </div>

          {/* Main Content Area */}
          <div className="w-full h-full flex flex-col space-y-4">
            {/* Top Row - Featured Projects */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Featured Project - Industrial Design */}
              <div className="w-full aspect-[1/1.2] md:aspect-[1/1.1]">
                <FeaturedCard
                  title={t.industrialDesign}
                  description={t.industrialDesignDesc}
                  href="/projects/industrial-design"
                  textPosition="bottom"
                  textColor="dark"
                  className="w-full h-full"
                  bgColor="bg-gray-100"
                  viewDetailsText={t.viewDetails}
                />
              </div>

              {/* Right Column - Two Medium Cards */}
              <div className="w-full grid grid-rows-2 gap-4">
                {/* Top Right Card - AIGC Design */}
                <div className="w-full aspect-[2/1]">
                  <FeaturedCard
                    title={t.aigcDesign}
                    description={t.aigcDesignDesc}
                    href="/projects/aigc-design"
                    textPosition="bottom"
                    textColor="dark"
                    className="w-full h-full"
                    bgColor="bg-gray-100"
                    viewDetailsText={t.viewDetails}
                  />
                </div>

                {/* Bottom Right Card - Motion Design */}
                <div className="w-full aspect-[2/1]">
                  <FeaturedCard
                    title={t.motionDesign}
                    description={t.motionDesignDesc}
                    href="/projects/motion-design"
                    textPosition="right"
                    textColor="dark"
                    className="w-full h-full"
                    bgColor="bg-gray-100"
                    viewDetailsText={t.viewDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-section" className="w-full py-16 mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">{t.aboutMe}</h2>
            <p className="text-black/60">{t.designerCreator}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile */}
            <div className="md:col-span-1">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-6">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="April's profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-black/50">{t.name}</h3>
                  <p className="text-black font-medium">April</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black/50">{t.location}</h3>
                  <p className="text-black">Shenzhen, China</p>
                </div>

                <div className="pt-4">
                  <Button className="w-full flex items-center justify-center gap-2 bg-black hover:bg-black/80 text-white">
                    <Download className="w-4 h-4" />
                    {t.downloadResume}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Bio and Skills */}
            <div className="md:col-span-2">
              <div className="prose max-w-none mb-12">
                <h2 className="text-2xl font-bold mb-4">{t.biographyTitle}</h2>
                <p>{t.biographyP1}</p>
                <p>{t.biographyP2}</p>
                <p>{t.biographyP3}</p>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-2xl font-bold mb-6">{t.skills}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                  {skills.map((skillGroup) => (
                    <div
                      key={skillGroup.category}
                      className={`p-6 rounded-2xl ${skillGroup.color} transition-colors duration-300`}
                    >
                      <h3 className={`text-lg font-medium mb-4 ${skillGroup.textColor}`}>{skillGroup.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <motion.span
                            key={skill}
                            className={`px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-sm cursor-pointer ${skillGroup.textColor}`}
                            whileHover={{ scale: 1.05 }}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Skill description tooltip */}
                  <AnimatePresence>
                    {hoveredSkill && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-16 left-0 right-0 bg-black text-white p-3 rounded-lg text-sm z-10"
                      >
                        {skillDescriptions[hoveredSkill] || `Skilled in ${hoveredSkill}`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="w-full py-16 mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">{t.contactMeSection}</h2>
            <p className="text-black/60">{t.letsWork}</p>
          </div>

          <div className="max-w-md mx-auto bg-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black/60">{t.email}</p>
                  <p className="font-medium">Aprildesign@163.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black/60">{t.phone}</p>
                  <p className="font-medium">17857133360</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zoomed Image Modal */}
        <AnimatePresence>
          {zoomedSlide !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setZoomedSlide(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-7xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setZoomedSlide(null)}
                  className="absolute top-4 right-4 z-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white"
                >
                  <X className="h-6 w-6" />
                </Button>

                <img
                  src={heroImages[zoomedSlide] || "/placeholder.svg"}
                  alt={`Zoomed slide ${zoomedSlide + 1}`}
                  className="w-full h-auto max-h-[90vh] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-12 flex justify-center space-x-4 pb-8">
          <span className="text-sm text-black/60">{t.copyright}</span>
        </div>
      </div>
    </main>
  )
}

