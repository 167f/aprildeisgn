"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/NavBar"

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

export default function AboutPage() {
  const router = useRouter()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

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

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12">
        {/* Back button */}
        <button onClick={() => router.push("/")} className="flex items-center text-black/70 hover:text-black mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to portfolio
        </button>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">About Me</h1>
          <p className="text-xl text-black/70">Designer, creator, and technology enthusiast</p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                <h3 className="text-sm font-medium text-black/50">Name</h3>
                <p className="text-black font-medium">April</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-black/50">Location</h3>
                <p className="text-black">Shanghai, China</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-black/50">Experience</h3>
                <p className="text-black">5+ years in industrial and digital design</p>
              </div>

              <div className="pt-4">
                <Button className="w-full flex items-center justify-center gap-2 bg-black hover:bg-black/80 text-white">
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Bio and Skills */}
          <div className="md:col-span-2">
            <div className="prose max-w-none mb-12">
              <h2 className="text-2xl font-bold mb-4">Biography</h2>
              <p>
                I'm a multidisciplinary designer with a passion for creating innovative products and experiences that
                blend form and function. With a background in industrial design and a growing expertise in digital and
                AI-assisted design, I bring a unique perspective to every project.
              </p>
              <p>
                My design philosophy centers on creating meaningful connections between people and products. I believe
                that good design should be intuitive, accessible, and bring joy to everyday experiences. I'm constantly
                exploring new technologies and methodologies to push the boundaries of what's possible in design.
              </p>
              <p>
                When I'm not designing, you can find me exploring art exhibitions, experimenting with new creative
                tools, or seeking inspiration in nature and architecture.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Skills</h2>

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

        {/* Contact Section */}
        <section id="contact-section" className="w-full py-16 mt-12 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Contact Me</h2>
            <p className="text-black/60">Let's work together</p>
          </div>

          <div className="max-w-md mx-auto bg-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black/60">Email</p>
                  <p className="font-medium">April.design2025@163.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-black/60">Phone</p>
                  <p className="font-medium">17857133360</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

