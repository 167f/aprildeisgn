"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PortfolioItem } from "./PortfolioItem"
import { PortfolioModal } from "./PortfolioModal"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

// Portfolio data
const portfolioItems = [
  {
    id: 1,
    title: "品牌设计 - 现代简约",
    description:
      "这是一个为科技初创公司设计的品牌识别系统。项目包括标志设计、色彩系统、排版规范和应用指南。\n\n设计理念源于公司的核心价值观：创新、简洁和可靠性。通过简约的几何形状和现代的色彩方案，我创造了一个既前卫又实用的视觉系统，能够在各种媒介上保持一致性和辨识度。\n\n该项目获得了2023年度设计奖的提名，并帮助客户成功吸引了新一轮融资。",
    category: "品牌设计",
    year: "2023",
    client: "科技初创公司",
    thumbnail: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-1-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-1-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-1-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
  },
  {
    id: 2,
    title: "Web GL 交互体验",
    description:
      "这是一个利用WebGL技术创建的沉浸式网站体验。项目目标是通过创新的3D交互方式展示客户的产品系列。\n\n我负责整个项目的视觉设计和交互概念，与开发团队紧密合作将创意转化为现实。通过精心设计的动画和过渡效果，用户可以以前所未有的方式探索产品。\n\n该项目大大提高了网站的停留时间和转化率，为客户带来了显著的商业价值。",
    category: "交互设计",
    year: "2023",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-2-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-2-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-2-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_hori_update.png",
  },
  {
    id: 3,
    title: "动态海报设计",
    description:
      "这是一系列为艺术展览设计的动态海报。项目挑战在于创造既能在静态印刷品上吸引眼球，又能在数字平台上通过动画增强表现力的设计。\n\n我开发了一套基于网格系统的设计语言，使海报在不同媒介间保持视觉一致性。动态版本通过精心编排的动画，赋予设计更深层次的叙事性和情感共鸣。\n\n这些海报成功吸引了目标观众，展览的参观人数超过了预期的150%。",
    category: "动态设计",
    year: "2022",
    client: "艺术画廊",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-3-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-3-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-3-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Vert_update.png",
  },
  {
    id: 4,
    title: "响应式网站设计",
    description:
      "这是一个为奢侈品牌设计的响应式电子商务网站。项目目标是创造一个既能展示产品高端品质，又能提供无缝购物体验的平台。\n\n我负责从用户研究到最终设计的整个过程，创建了详细的用户旅程图和线框图，然后开发了高保真原型。设计强调了品牌的奢华感，同时确保了跨设备的一致体验。\n\n该网站上线后的前三个月内，转化率提高了35%，移动端用户参与度增加了40%。",
    category: "网页设计",
    year: "2023",
    client: "奢侈品牌",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-4-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-4-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-4-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_vert_update.png",
  },
  {
    id: 5,
    title: "标志动画",
    description:
      "这是为一家媒体公司设计的品牌标志动画。项目挑战在于创造一个既能在静态形式下保持辨识度，又能通过动画展现品牌个性的标志。\n\n我从品牌核心价值观出发，设计了一个简洁而富有表现力的标志，然后开发了一系列动画变体，用于不同的应用场景，如公司网站、社交媒体和视频内容。\n\n这个动态标志成功提升了品牌在数字平台上的辨识度，并获得了多个设计奖项的认可。",
    category: "动画设计",
    year: "2022",
    client: "媒体公司",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-5-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-5-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-5-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_verti_update.png",
  },
  {
    id: 6,
    title: "UI 动效设计",
    description:
      "这是为一款移动应用设计的UI动效系统。项目目标是通过精心设计的微交互和过渡动画，提升用户体验和情感连接。\n\n我创建了一套全面的动效指南，包括导航转场、按钮反馈、列表动画和加载状态等。每个动效都经过精心调校，以确保流畅性和一致性，同时增强用户对应用功能的理解。\n\n这套动效系统显著提高了应用的用户满意度评分，并成为公司其他产品的设计标准。",
    category: "UI/UX设计",
    year: "2023",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-6-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-6-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-6-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner-1.png",
    edgeVertical: "https://static.cdn-luma.com/files/1199340587e8da1d/6_vert.png",
  },
  {
    id: 7,
    title: "插画系列",
    description:
      "这是为一本儿童教育书籍创作的插画系列。项目挑战在于创造既有教育价值又能吸引年轻读者的视觉内容。\n\n我开发了一套独特的插画风格，结合了简约的线条和丰富的色彩，使复杂的概念变得易于理解和记忆。每幅插画都经过精心构思，以支持文本内容并激发孩子们的想象力。\n\n这本书获得了多个教育出版奖项，并被翻译成了12种语言在全球发行。",
    category: "插画设计",
    year: "2022",
    client: "教育出版社",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-7-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-7-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-7-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_vert.png",
  },
  {
    id: 8,
    title: "艺术指导",
    description:
      "这是为一个时尚品牌的季度广告活动提供艺术指导的项目。我负责整体视觉概念的开发，包括摄影风格、场景设计、模特选择和后期处理。\n\n我创建了一个融合复古元素和现代美学的视觉世界，通过精心策划的色彩方案和构图原则，确保了整个系列的一致性和品牌辨识度。\n\n这个广告活动在社交媒体上获得了广泛传播，显著提升了品牌知名度和季度销售业绩。",
    category: "艺术指导",
    year: "2023",
    client: "时尚品牌",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-8-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-8-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-8-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/8_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/8_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/8_verticle.png",
  },
  {
    id: 9,
    title: "产品视频",
    description:
      "这是为一款创新科技产品制作的宣传视频。项目目标是通过视觉叙事展示产品功能和价值，同时传达品牌理念。\n\n我负责从概念开发到最终制作的整个过程，包括故事板创作、场景设计、拍摄指导和后期编辑。通过结合实景拍摄和动画效果，我创造了一个既信息丰富又富有情感共鸣的视频。\n\n这个视频在产品发布会上获得了热烈反响，并在各大社交平台上累计获得了超过百万的观看量。",
    category: "视频制作",
    year: "2023",
    client: "科技公司",
    thumbnail: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-9-1-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-9-2-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio-9-3-Rl9Yd9Iy9Yd9Iy9Yd9Iy.jpg",
    ],
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/9_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/9_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/9_vert.png",
  },
]

// Filter categories
const categories = ["全部", ...Array.from(new Set(portfolioItems.map((item) => item.category)))]

export default function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [showFrames, setShowFrames] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof portfolioItems)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(8)

  const filteredItems =
    selectedCategory === "全部" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  const getRowSizes = () => {
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const handleItemClick = (item: (typeof portfolioItems)[0]) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <div className="w-full h-full">
      {/* Category filters */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={`text-sm ${
                selectedCategory === category
                  ? "bg-white text-black hover:bg-white/90"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="frame-toggle" checked={showFrames} onCheckedChange={setShowFrames} />
          <label htmlFor="frame-toggle" className="text-sm text-white/70">
            {showFrames ? "隐藏边框" : "显示边框"}
          </label>
        </div>
      </div>

      {/* Portfolio grid */}
      <div
        className="w-full h-[calc(100%-60px)]"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {filteredItems.map((item, index) => {
          const row = Math.floor(index / 3)
          const col = index % 3

          return (
            <motion.div
              key={item.id}
              className="relative"
              style={{
                transformOrigin: "center",
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PortfolioItem
                id={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                category={item.category}
                onClick={() => handleItemClick(item)}
                corner={item.corner}
                edgeHorizontal={item.edgeHorizontal}
                edgeVertical={item.edgeVertical}
                showFrame={showFrames}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Modal */}
      <PortfolioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
    </div>
  )
}

