"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import NavBar from "@/components/NavBar"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock project data
const projectsData = {
  "industrial-design": {
    title: "Industrial Design",
    description: "Showcasing product design projects with a focus on form and function",
    content:
      "Industrial design is a process of design applied to physical products that are to be manufactured by mass production. It is the creative act of determining and defining a product's form and features, which takes place in advance of the manufacture or production of the product. Industrial designers create and develop concepts and specifications that optimize the function, value, and appearance of products for the benefit of both the user and the manufacturer.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    details: [
      { label: "Client", value: "Various" },
      { label: "Year", value: "2023" },
      { label: "Role", value: "Lead Designer" },
      { label: "Tools", value: "Rhino, KEYSHOT, Fusion 360" },
    ],
  },
  "aigc-design": {
    title: "AIGC-Assisted Design",
    description: "Exploring the intersection of AI and creative design",
    content:
      "AI-generated content (AIGC) is revolutionizing the design process by enabling designers to explore vast design spaces quickly and efficiently. By leveraging generative AI tools, designers can rapidly prototype ideas, generate variations, and discover novel solutions that might not have been considered through traditional design methods. This approach combines human creativity with computational power to push the boundaries of what's possible in design.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    details: [
      { label: "Client", value: "Research Project" },
      { label: "Year", value: "2023" },
      { label: "Role", value: "AI Design Researcher" },
      { label: "Tools", value: "Midjourney, Stable Diffusion, DALL-E" },
    ],
  },
  "motion-design": {
    title: "Motion Design",
    description: "Dynamic visual experiences and animations",
    content:
      "Motion design is the art of bringing graphic design elements to life through animation and visual effects. It combines principles of graphic design, animation, and filmmaking to create engaging visual content that communicates ideas and evokes emotions. From UI animations to brand videos, motion design adds a temporal dimension to visual communication, making it more dynamic and impactful.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    details: [
      { label: "Client", value: "Multiple Brands" },
      { label: "Year", value: "2022-2023" },
      { label: "Role", value: "Motion Designer" },
      { label: "Tools", value: "After Effects, C4D, Blender" },
    ],
  },
  phantom: {
    title: "Phantom Speaker",
    description: "Award-winning speaker design",
    content:
      "The Phantom speaker represents a breakthrough in audio engineering and industrial design. Its distinctive spherical form houses advanced acoustic technology that delivers exceptional sound quality across the entire audible spectrum. The design challenge was to create a product that was both visually striking and acoustically superior, resulting in a speaker that has become an icon in the high-end audio market.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    details: [
      { label: "Client", value: "Devialet" },
      { label: "Year", value: "2022" },
      { label: "Role", value: "Product Designer" },
      { label: "Tools", value: "Rhino, KEYSHOT, SolidWorks" },
    ],
  },
  gemini: {
    title: "Gemini Wireless System",
    description: "Wireless audio system",
    content:
      "The Gemini wireless audio system was designed to deliver studio-quality sound in a portable, elegant package. The project involved extensive research into acoustic engineering, wireless technology, and user experience design. The result is a product that combines cutting-edge technology with refined aesthetics, offering users an uncompromising audio experience in any environment.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    details: [
      { label: "Client", value: "Devialet" },
      { label: "Year", value: "2023" },
      { label: "Role", value: "Lead Designer" },
      { label: "Tools", value: "Fusion 360, KEYSHOT, Adobe CC" },
    ],
  },
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const slug = params?.slug as string
  const project = projectsData[slug as keyof typeof projectsData]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!project) return <div>Project not found</div>

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12">
        {/* Back button */}
        <button onClick={() => router.push("/")} className="flex items-center text-black/70 hover:text-black mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to portfolio
        </button>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{project.title}</h1>
          <p className="text-xl text-black/70">{project.description}</p>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Project Details */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              {project.details.map((detail, index) => (
                <div key={index}>
                  <h3 className="text-sm font-medium text-black/50">{detail.label}</h3>
                  <p className="text-black">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Project Content */}
          <div className="md:col-span-2">
            <p className="text-black/80 mb-8 leading-relaxed">{project.content}</p>

            {/* Image Gallery */}
            <div className="relative mt-12 aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={project.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${project.title} - image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevImage}
                  className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextImage}
                  className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-white w-4" : "bg-white/40"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

