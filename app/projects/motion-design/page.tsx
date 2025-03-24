"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, Pause, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/NavBar"
import { useLanguage } from "@/components/LanguageContext"

// 动态设计项目数据
const projects = [
  {
    id: "white-noise-ad",
    title: "白噪音机广告",
    thumbnail: "/placeholder.svg?height=400&width=400",
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    description: "一个15秒的白噪音机产品广告，展示其简洁设计和环境声音功能。",
    concept:
      "动画概念专注于声音的转化力量，将从设备发出的声波可视化，创造一个宁静的环境。视觉语言使用微妙的颜色过渡来唤起放松的感觉。",
    software: ["After Effects", "C4D", "DaVinci Resolve"],
    process:
      "产品在C4D中建模和渲染，使用真实材质和灯光。声波可视化在After Effects中使用particular插件创建。最终的色彩分级和音频混合在DaVinci Resolve中完成。",
  },
  {
    id: "car-fragrance-ad",
    title: "车载香薰扩散器广告",
    thumbnail: "/placeholder.svg?height=400&width=400",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    description: "车载香薰扩散器的动态产品展示，突出其优雅设计和与车辆内饰的融合。",
    concept: "动画使用粒子效果来可视化香气扩散，色彩搭配唤起香气特性。相机移动强调产品的空气动力学形态。",
    software: ["C4D", "Octane Render", "After Effects"],
    process:
      "汽车内饰和产品在C4D中建模，使用Octane进行照片级渲染。粒子模拟在C4D中创建并在After Effects中增强。声音设计与视觉节奏相配合。",
  },
  {
    id: "ui-animation",
    title: "未来主义UI动画",
    thumbnail: "/placeholder.svg?height=400&width=400",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    description: "带有全息元素和手势控制的未来用户界面概念动画。",
    concept:
      "UI设计探索人机交互的新范式，使用深度、透明度和动态创造直观且沉浸式的体验。动画展示了用户如何在三维空间中导航复杂信息。",
    software: ["After Effects", "Illustrator", "Blender"],
    process:
      "UI元素在Illustrator中设计，在After Effects中使用表达式进行程序化动画。3D元素在Blender中创建，与2D元素在After Effects中合成。声音设计强调交互点。",
  },
  {
    id: "product-animation",
    title: "产品变形动画",
    thumbnail: "/placeholder.svg?height=400&width=400",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    description: "展示产品变形序列和内部机制的技术动画。",
    concept: "动画使用X光视图和分解图相结合，揭示产品功能。视觉风格平衡技术精确性和美学吸引力。",
    software: ["C4D", "After Effects", "Premiere Pro"],
    process:
      "产品在C4D中建模，包含精确的机械细节。动画使用关键帧和程序化技术相结合创建。After Effects中的后期处理为技术可视化增加了深度和清晰度。",
  },
  {
    id: "brand-animation",
    title: "品牌标识动画",
    thumbnail: "/placeholder.svg?height=400&width=400",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    description: "为科技品牌设计的动态标志动画，用于各种数字平台。",
    concept:
      "动画通过体现品牌创新和精确价值观的序列，为静态标志注入生命。动作语言经过精心设计，即使在短格式应用中也能被识别。",
    software: ["After Effects", "Illustrator", "Audition"],
    process:
      "标志在Illustrator中解构，在After Effects中使用形状图层和表达式组合进行动画处理。为不同应用创建了多个变体，从5秒介绍到2秒社交媒体片段。",
  },
  {
    id: "architectural-visualization",
    title: "建筑可视化",
    thumbnail: "/placeholder.svg?height=400&width=400",
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    description: "概念建筑空间的动画漫游，突出空间关系和灯光设计。",
    concept: "动画使用相机移动和灯光过渡，创造穿越空间的情感旅程。视觉风格强调材质和自然光与人工光之间的互动。",
    software: ["Blender", "V-Ray", "After Effects"],
    process:
      "建筑空间在Blender中建模，包含详细的材质和灯光设置。V-Ray用于照片级渲染。After Effects中的后期处理增强了氛围并添加了微妙的环境效果。",
  },
]

export default function MotionDesignPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsPlaying(false)
  }

  const handleClose = () => {
    setSelectedProject(null)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12">
        {/* Back button */}
        <button onClick={() => router.push("/")} className="flex items-center text-black/70 hover:text-black mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToPortfolio}
        </button>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{t.motionDesign}</h1>
          <p className="text-xl text-black/70">{t.motionDesignDesc}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="aspect-video overflow-hidden relative group">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 flex justify-end p-4 bg-white/80 backdrop-blur-sm">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100" onClick={handleClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-6 space-y-8">
                  <h2 className="text-3xl font-bold">{selectedProject.title}</h2>

                  {/* Video Player - Now larger and full width */}
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden w-full">
                    <video
                      ref={videoRef}
                      src={selectedProject.video}
                      className="w-full h-full object-contain"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      playsInline
                    />

                    {/* Play/Pause Button */}
                    <button
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePlay()
                      }}
                    >
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
                      </div>
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium">描述</h3>
                      <p className="text-gray-700">{selectedProject.description}</p>

                      <h3 className="text-xl font-medium">概念</h3>
                      <p className="text-gray-700">{selectedProject.concept}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-medium">制作过程</h3>
                      <p className="text-gray-700">{selectedProject.process}</p>

                      <h3 className="text-xl font-medium">使用软件</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.software.map((software, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {software}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

