"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, ShoppingCart, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/NavBar"
import { useLanguage } from "@/components/LanguageContext"

// AI辅助设计项目数据
const projects = [
  {
    id: "concept-1",
    title: "未来主义产品概念",
    thumbnail: "/placeholder.svg?height=400&width=400",
    aiImage: "/placeholder.svg?height=800&width=1200",
    finalImage: "/placeholder.svg?height=800&width=1200",
    tool: "Midjourney",
    prompt: "未来主义极简智能家居设备，带全息界面，柔和环境光，漂浮在现代客厅中，照片级产品渲染，8k，工作室灯光",
    process:
      "这个概念始于一系列探索性提示，专注于未来智能家居设备。在生成多个变体后，我选择了这个方向，因为它在技术先进性和易接近的设计语言之间取得了平衡。",
    postProcessing:
      "AI生成的图像在Photoshop中进行了细化，以增强全息元素并调整光线，使产品外观更加真实。我还使用C4D创建了额外的视角，并完善了材质属性。",
    // 新增的玻璃态UI设计数据
    glassUI: true,
    productDetails: {
      name: "O2 CLASSIC HOODIE",
      brand: "BY O2 STUDIO",
      year: "THE LATE 2030",
      details: ["O2 LOGO AT LEFT CHEST", "KANGAROO POCKETS", "3 COLORS"],
      materials: {
        lining: "53% COTTON, 47% POLYESTER",
        pocket: "100% COTTON",
      },
    },
  },
  {
    id: "concept-2",
    title: "仿生家具设计",
    thumbnail: "/placeholder.svg?height=400&width=400",
    aiImage: "/placeholder.svg?height=800&width=1200",
    finalImage: "/placeholder.svg?height=800&width=1200",
    tool: "Stable Diffusion",
    prompt: "受珊瑚结构启发的有机椅子设计，流动形态，天然材料，木材和织物，高端家具摄影，工作室灯光，建筑文摘风格",
    process: "我通过多次迭代探索了仿生设计原则，以珊瑚结构为灵感。提示被精炼以强调有机形态和功能性家具设计之间的平衡。",
    postProcessing:
      "初始AI输出在Blender中进行了重大细化，以确保结构完整性和人体工程学。我基于AI概念创建了3D模型，然后用真实材质和灯光渲染。",
  },
  {
    id: "concept-3",
    title: "抽象品牌视觉",
    thumbnail: "/placeholder.svg?height=400&width=400",
    aiImage: "/placeholder.svg?height=800&width=1200",
    finalImage: "/placeholder.svg?height=800&width=1200",
    tool: "Midjourney",
    prompt: "蓝绿色和珊瑚色的抽象流体形态，奢华品牌美学，极简构图，高级时尚摄影风格，光泽杂志质感",
    process:
      "这个视觉探索是品牌项目的一部分，需要独特的抽象图像。我尝试了颜色组合和流体形态，创造出一个既复杂又令人难忘的视觉标识。",
    postProcessing:
      "选定的AI输出在Photoshop中进行了细化，以增强色彩和谐和构图。我创建了几个不同字体处理的变体，以展示在品牌应用中的多功能性。",
  },
  {
    id: "concept-4",
    title: "材质纹理探索",
    thumbnail: "/placeholder.svg?height=400&width=400",
    aiImage: "/placeholder.svg?height=800&width=1200",
    finalImage: "/placeholder.svg?height=800&width=1200",
    tool: "Stable Diffusion",
    prompt: "无缝材质纹理，带微妙渐变的彩虹金属，微观细节，产品设计材质，PBR纹理，8k分辨率",
    process:
      "这个项目专注于为产品设计生成新颖的材质纹理。我尝试了各种提示，创建独特的彩虹金属纹理，可应用于消费电子产品。",
    postProcessing:
      "AI生成的纹理在Substance Designer中进行了处理，以创建适当的PBR贴图（法线、粗糙度、金属度）。然后我将材质应用到C4D中的3D模型上，测试其在不同光照条件下在曲面上的外观。",
  },
  {
    id: "concept-5",
    title: "建筑可视化",
    thumbnail: "/placeholder.svg?height=400&width=400",
    aiImage: "/placeholder.svg?height=800&width=1200",
    finalImage: "/placeholder.svg?height=800&width=1200",
    tool: "Midjourney",
    prompt: "极简日式风格室内空间，自然光，混凝土和木材，禅意花园景观，建筑摄影，广角镜头，晨光",
    process: "这个建筑概念是通过迭代提示开发的，专注于材料和光线的平衡。我细化了提示，强调日式美学，同时保持现代感。",
    postProcessing:
      "AI输出作为概念参考，用于在SketchUp中创建详细的3D模型，并在V-Ray中渲染。我调整了比例和空间关系，确保建筑可行性，同时保留美学方向。",
  },
  {
    id: "concept-6",
    title: "时尚配饰概念",
    thumbnail: "/placeholder.svg?height=400&width=400",
    aiImage: "/placeholder.svg?height=800&width=1200",
    finalImage: "/placeholder.svg?height=800&width=1200",
    tool: "Stable Diffusion",
    prompt: "前卫可穿戴科技配饰，未来主义珠宝带微妙LED照明，钛和陶瓷材料，模特时尚摄影，工作室灯光",
    process: "这个概念探索了珠宝设计和可穿戴技术的交叉点。我尝试了各种提示，寻找美学吸引力和技术整合之间的平衡。",
    postProcessing:
      "AI概念通过Procreate中的数字草图进行了细化，以明确设计细节和功能。然后我创建了技术图纸，指定材料、尺寸和电子组件。",
  },
]

export default function AigcDesignPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [projectSizes, setProjectSizes] = useState<{ [key: string]: { cols: number; rows: number } }>({})

  // 随机生成项目尺寸
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      // 为每个项目随机分配大小
      const sizes: { [key: string]: { cols: number; rows: number } } = {}
      projects.forEach((project) => {
        // 随机决定是否为大尺寸 (1/3的概率)
        const isLarge = Math.random() < 0.33
        sizes[project.id] = {
          cols: isLarge ? 2 : 1,
          rows: isLarge ? 2 : 1,
        }
      })
      setProjectSizes(sizes)
    }
  }, [])

  // 跟踪鼠标位置
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
  }

  const handleClose = () => {
    setSelectedProject(null)
  }

  // 计算模态框位置和大小的变化
  const calculateModalTransform = () => {
    if (!windowSize.width) return {}

    // 基于鼠标位置计算偏移
    const xOffset = (mousePosition.x / windowSize.width - 0.5) * 20
    const yOffset = (mousePosition.y / windowSize.height - 0.5) * 10

    return {
      transform: `translate(${xOffset}px, ${yOffset}px)`,
      transition: "transform 0.2s ease-out",
    }
  }

  // 渲染玻璃态UI设计
  const renderGlassUI = (project: (typeof projects)[0]) => {
    if (!project.glassUI) return null

    const details = project.productDetails

    return (
      <div className="w-full h-full flex flex-col">
        {/* 顶部导航 */}
        <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="font-bold text-xl">O2°</span>
            <span className="text-sm opacity-80">Moonish</span>
            <span className="text-sm opacity-80">New in</span>
            <span className="text-sm opacity-80">Hot drops</span>
            <span className="text-sm opacity-80">Collection</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="opacity-80">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 flex-1 flex flex-col md:flex-row">
          {/* 左侧产品信息 */}
          <div className="md:w-1/3 pr-8">
            <div className="text-[120px] font-bold opacity-80 leading-none">01</div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="text-sm uppercase font-medium">CLASSIC HOODIE</div>
                <div className="text-xs opacity-70">BY O2 STUDIO</div>
              </div>

              <div className="text-xs opacity-70">THE LATE 2030</div>

              <div className="mt-8">
                <div className="text-xs uppercase font-medium mb-2">DETAILS:</div>
                <ul className="text-xs opacity-70 space-y-1">
                  {details.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase font-medium mb-2">LINING:</div>
                <div className="text-xs opacity-70">{details.materials.lining}</div>
              </div>

              <div className="mt-2">
                <div className="text-xs uppercase font-medium mb-2">POCKET BAG:</div>
                <div className="text-xs opacity-70">{details.materials.pocket}</div>
              </div>

              <div className="text-xs opacity-70 mt-4">MOONISH DESIGN</div>
            </div>
          </div>

          {/* 右侧产品展示 */}
          <div className="md:w-2/3 mt-8 md:mt-0 flex flex-col md:flex-row gap-4">
            {/* 左侧小卡片 */}
            <div className="md:w-1/3 bg-gray-200/30 backdrop-blur-md rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="text-xl font-bold">NIKE</div>
                <div className="text-xs opacity-70">SNEAKERS</div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2">
                <Search className="w-4 h-4" />
              </div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Nike Sneakers"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 右侧主产品 */}
            <div className="md:w-2/3 bg-gray-200/30 backdrop-blur-md rounded-3xl overflow-hidden relative">
              <div className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="text-xs">HOODIE</div>
              </div>

              <div className="absolute bottom-4 right-4 z-10 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <span className="text-xs">Add to cart</span>
                <ShoppingCart className="w-4 h-4" />
              </div>

              <img src="/placeholder.svg?height=500&width=700" alt="O2 Hoodie" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* 底部卡片 */}
        <div className="mt-8 bg-white/20 backdrop-blur-md rounded-full p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200/30 backdrop-blur-md rounded-full overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Product thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">NEW · COSMIC</span>
              <span className="text-xs opacity-70">SET 23↗</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-xs opacity-70">HOT DROP BY O2 STUDIO</div>
            <div className="text-xs opacity-70">MOONISH COLLECTION</div>
            <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 transform rotate-180" />
            </div>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{t.aigcDesign}</h1>
          <p className="text-xl text-black/70">{t.aigcDesignDesc}</p>
        </div>

        {/* Projects Grid - 使用CSS Grid实现不同大小的项目 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min gap-6">
          {projects.map((project) => {
            const size = projectSizes[project.id] || { cols: 1, rows: 1 }
            return (
              <motion.div
                key={project.id}
                className="bg-gray-50 rounded-xl overflow-hidden cursor-pointer"
                style={{
                  gridColumn: `span ${size.cols}`,
                  gridRow: `span ${size.rows}`,
                  height: size.rows > 1 ? "auto" : undefined,
                  aspectRatio: size.cols === size.rows ? "1" : undefined,
                }}
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
                  <p className="text-sm text-gray-500 mt-1">使用 {project.tool} 生成</p>
                </div>
              </motion.div>
            )
          })}
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
                style={calculateModalTransform()}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 flex justify-end p-4 bg-white/80 backdrop-blur-sm">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100" onClick={handleClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-6 space-y-8">
                  {selectedProject.glassUI ? (
                    // 玻璃态UI设计展示
                    <div className="bg-gradient-to-b from-amber-50 to-orange-100 p-8 rounded-xl">
                      {renderGlassUI(selectedProject)}
                    </div>
                  ) : (
                    // 标准项目展示
                    <>
                      <h2 className="text-3xl font-bold">{selectedProject.title}</h2>

                      {/* Image Comparison */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium">AI输出 vs. 最终结果</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">原始AI输出</h4>
                            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={selectedProject.aiImage || "/placeholder.svg"}
                                alt={`${selectedProject.title} - AI生成`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">最终结果</h4>
                            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={selectedProject.finalImage || "/placeholder.svg"}
                                alt={`${selectedProject.title} - 最终结果`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Generation Process */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium">AI生成过程</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">提示词</h4>
                          <p className="text-gray-700 italic">"{selectedProject.prompt}"</p>
                        </div>
                        <p className="text-gray-700">{selectedProject.process}</p>
                      </div>

                      {/* Post-Processing */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium">后期处理与细化</h3>
                        <p className="text-gray-700">{selectedProject.postProcessing}</p>
                      </div>

                      {/* Tools Used */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium">使用工具</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {selectedProject.tool}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            Photoshop
                          </span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">C4D</span>
                          {selectedProject.tool === "Stable Diffusion" && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              Stable Diffusion Web UI
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

