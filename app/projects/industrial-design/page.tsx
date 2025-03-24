"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/NavBar"
import { useLanguage } from "@/components/LanguageContext"

// 工业设计项目数据
const projects = [
  {
    id: "white-noise",
    title: "白噪音机",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    description:
      "为现代家居设计的简约白噪音机。该设备具有直观的触控控制和可定制的声音配置，为睡眠、工作或放松创造完美的环境氛围。",
    concept:
      "设计理念专注于创造一个能与现代室内环境无缝融合的非侵入性物体，同时提供卓越的声音质量。圆柱形设计允许360°声音扩散。",
    features: ["可定制声音配置", "触控感应控制", "定时功能", "USB-C充电", "便携设计"],
    useCases: ["睡眠辅助", "工作/学习专注力提升", "冥想与放松", "掩盖环境噪音"],
  },
  {
    id: "car-fragrance",
    title: "车载香薰扩散器",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    description:
      "一款优雅的车载香薰扩散器，结合了精致的设计和先进的扩散技术。该设备可夹在空调出风口上，提供持续、可调节的香气体验。",
    concept:
      "设计灵感来自汽车空气动力学，创造出一种不仅在豪华车辆中看起来很协调，而且还能优化气流以实现高效香气扩散的形态。",
    features: ["可调节强度", "可更换香薰盒系统", "通用出风口夹", "持久香气", "优质材料"],
    useCases: ["豪华车辆", "共享出行服务", "长途通勤", "消除异味"],
  },
  {
    id: "car-box",
    title: "车载收纳盒",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    description: "专为汽车内饰设计的模块化存储解决方案。该收纳盒具有可定制的隔层，并能牢固固定以防止行驶过程中移动。",
    concept: "设计解决了在不影响美观的情况下在车辆中创建有组织存储空间的挑战。模块化方法允许用户根据特定需求配置空间。",
    features: ["模块化隔层", "防滑底座", "防水材料", "可折叠设计", "集成杯架"],
    useCases: ["日常通勤者", "公路旅行", "家庭车辆", "专业司机"],
  },
  {
    id: "fireplace",
    title: "现代壁炉",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    description: "为现代生活空间重新构想传统壁炉的当代设计。该设计结合了高效加热技术和雕塑形态，为任何房间创造焦点。",
    concept: "该概念探索了功能性加热设备和艺术品之间的平衡，创造了一个即使不使用时也能提升空间美感的作品。",
    features: ["高效燃烧系统", "360°视角", "温度控制", "低排放", "安全功能"],
    useCases: ["现代住宅", "开放式生活空间", "户外露台", "商业空间"],
  },
  {
    id: "cassette-stove",
    title: "卡带式炉灶",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    description: "受卡带播放器启发的紧凑型便携烹饪解决方案。该炉灶具有独特的燃料盒系统，可折叠平整以便于运输和存储。",
    concept: "该设计通过怀旧技术的视角重新构想便携烹饪设备，创造情感连接的同时提供现代性能。",
    features: ["卡带燃料系统", "可折叠设计", "热量调节", "防风保护", "集成点火装置"],
    useCases: ["露营和徒步", "应急准备", "户外用餐", "小型生活空间"],
  },
  {
    id: "fidget-spinner",
    title: "指尖陀螺",
    thumbnail: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    description:
      "采用精密工程和高品质材料设计的高端指尖陀螺。该陀螺具有优化的重量分布，可延长旋转时间并提供令人满意的触感体验。",
    concept: "该设计通过精心的材料选择和工程精度，将简单的减压玩具提升为精致的桌面配件。",
    features: ["陶瓷轴承", "平衡重量分布", "优质材料", "可定制重量", "人体工学设计"],
    useCases: ["减压", "注意力辅助", "桌面配件", "收藏品"],
  },
]

export default function IndustrialDesignPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const handleClose = () => {
    setSelectedProject(null)
  }

  const handlePrevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
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
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{t.industrialDesign}</h1>
          <p className="text-xl text-black/70">{t.industrialDesignDesc}</p>
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
              <div className="aspect-square overflow-hidden">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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

                <div className="flex flex-col p-6">
                  {/* Image Carousel - Now larger and full width */}
                  <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden mb-8 w-full">
                    <img
                      src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${selectedProject.title} - view ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />

                    {/* Navigation Controls */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePrevImage()
                        }}
                        className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNextImage()
                        }}
                        className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-black"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
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

                  {/* Project Details - Now below the carousel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                      <p className="text-gray-700">{selectedProject.description}</p>

                      <div>
                        <h3 className="text-lg font-medium mb-2">设计理念</h3>
                        <p className="text-gray-700">{selectedProject.concept}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">功能特点</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">使用场景</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {selectedProject.useCases.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                          ))}
                        </ul>
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

