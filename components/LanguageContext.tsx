"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "EN" | "CN" | "TW"

// Define translations interface
export interface Translations {
  // Navigation
  home: string
  works: string
  about: string
  contactMe: string

  // Hero section
  heroTagline: string

  // Works section
  myWorks: string
  designPurestForm: string
  industrialDesign: string
  industrialDesignDesc: string
  aigcDesign: string
  aigcDesignDesc: string
  motionDesign: string
  motionDesignDesc: string

  // About section
  aboutMe: string
  designerCreator: string
  name: string
  location: string
  experience: string
  experienceValue: string
  downloadResume: string
  biography: string
  biographyTitle: string
  biographyP1: string
  biographyP2: string
  biographyP3: string
  skills: string

  // Contact section
  contactMeSection: string
  letsWork: string
  email: string
  phone: string

  // Footer
  copyright: string

  // Project pages
  backToPortfolio: string
  viewDetails: string
}

// Define translations for each language
const translations: Record<Language, Translations> = {
  EN: {
    // Navigation
    home: "HOME",
    works: "WORKS",
    about: "ABOUT",
    contactMe: "Contact Me",

    // Hero section
    heroTagline: "Get Your Design Fix. Where Creativity Meets Functionality.",

    // Works section
    myWorks: "MY WORKS",
    designPurestForm: "Design in its purest form",
    industrialDesign: "Industrial Design",
    industrialDesignDesc: "Showcasing product design projects with a focus on form and function",
    aigcDesign: "AIGC-Assisted Design",
    aigcDesignDesc: "Exploring the intersection of AI and creative design",
    motionDesign: "Motion Design",
    motionDesignDesc: "Dynamic visual experiences and animations",

    // About section
    aboutMe: "ABOUT ME",
    designerCreator: "Designer, creator, and technology enthusiast",
    name: "Name",
    location: "Location",
    experience: "Experience",
    experienceValue: "1 year of industrial and AI design",
    downloadResume: "Download Resume",
    biography: "Biography",
    biographyTitle: "Biography",
    biographyP1:
      "I'm a multidisciplinary designer with a passion for creating innovative products and experiences that blend form and function. With a background in industrial design and a growing expertise in digital and AI-assisted design, I bring a unique perspective to every project.",
    biographyP2:
      "My design philosophy centers on creating meaningful connections between people and products. I believe that good design should be intuitive, accessible, and bring joy to everyday experiences. I'm constantly exploring new technologies and methodologies to push the boundaries of what's possible in design.",
    biographyP3:
      "When I'm not designing, you can find me exploring art exhibitions, experimenting with new creative tools, or seeking inspiration in nature and architecture.",
    skills: "Skills",

    // Contact section
    contactMeSection: "CONTACT ME",
    letsWork: "Let's work together",
    email: "Email",
    phone: "Phone",

    // Footer
    copyright: "© 2025 April's Design Portfolio",

    // Project pages
    backToPortfolio: "Back to portfolio",
    viewDetails: "View details",
  },

  CN: {
    // Navigation
    home: "首页",
    works: "作品",
    about: "关于",
    contactMe: "联系我",

    // Hero section
    heroTagline: "获取你的设计灵感。创意与功能的完美结合。",

    // Works section
    myWorks: "我的作品",
    designPurestForm: "设计的纯粹形式",
    industrialDesign: "工业设计",
    industrialDesignDesc: "展示注重形式与功能的产品设计项目",
    aigcDesign: "AI辅助设计",
    aigcDesignDesc: "探索AI与创意设计的交叉领域",
    motionDesign: "动态设计",
    motionDesignDesc: "动态视觉体验和动画",

    // About section
    aboutMe: "关于我",
    designerCreator: "设计师、创作者和技术爱好者",
    name: "姓名",
    location: "所在地",
    experience: "经验",
    experienceValue: "1年工业和AI设计经验",
    downloadResume: "下载简历",
    biography: "个人简介",
    biographyTitle: "个人简介",
    biographyP1:
      "我是一名多学科设计师，热衷于创造融合形式和功能的创新产品和体验。凭借工业设计背景和不断增长的数字和AI辅助设计专业知识，我为每个项目带来独特的视角。",
    biographyP2:
      "我的设计理念以创造人与产品之间有意义的连接为中心。我相信好的设计应该是直观的、易于使用的，并能为日常体验带来乐趣。我不断探索新技术和方法，推动设计可能性的边界。",
    biographyP3: "当我不在设计时，你可以发现我在探索艺术展览，尝试新的创意工具，或在自然和建筑中寻找灵感。",
    skills: "技能",

    // Contact section
    contactMeSection: "联系我",
    letsWork: "让我们一起合作",
    email: "邮箱",
    phone: "电话",

    // Footer
    copyright: "© 2025 April的设计作品集",

    // Project pages
    backToPortfolio: "返回作品集",
    viewDetails: "查看详情",
  },

  TW: {
    // Navigation
    home: "首頁",
    works: "作品",
    about: "關於",
    contactMe: "聯繫我",

    // Hero section
    heroTagline: "獲取你的設計靈感。創意與功能的完美結合。",

    // Works section
    myWorks: "我的作品",
    designPurestForm: "設計的純粹形式",
    industrialDesign: "工業設計",
    industrialDesignDesc: "展示注重形式與功能的產品設計項目",
    aigcDesign: "AI輔助設計",
    aigcDesignDesc: "探索AI與創意設計的交叉領域",
    motionDesign: "動態設計",
    motionDesignDesc: "動態視覺體驗和動畫",

    // About section
    aboutMe: "關於我",
    designerCreator: "設計師、創作者和技術愛好者",
    name: "姓名",
    location: "所在地",
    experience: "經驗",
    experienceValue: "1年工業和AI設計經驗",
    downloadResume: "下載簡歷",
    biography: "個人簡介",
    biographyTitle: "個人簡介",
    biographyP1:
      "我是一名多學科設計師，熱衷於創造融合形式和功能的創新產品和體驗。憑藉工業設計背景和不斷增長的數字和AI輔助設計專業知識，我為每個項目帶來獨特的視角。",
    biographyP2:
      "我的設計理念以創造人與產品之間有意義的連接為中心。我相信好的設計應該是直觀的、易於使用的，並能為日常體驗帶來樂趣。我不斷探索新技術和方法，推動設計可能性的邊界。",
    biographyP3: "當我不在設計時，你可以發現我在探索藝術展覽，嘗試新的創意工具，或在自然和建築中尋找靈感。",
    skills: "技能",

    // Contact section
    contactMeSection: "聯繫我",
    letsWork: "讓我們一起合作",
    email: "郵箱",
    phone: "電話",

    // Footer
    copyright: "© 2025 April的設計作品集",

    // Project pages
    backToPortfolio: "返回作品集",
    viewDetails: "查看詳情",
  },
}

// Create context
interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Create provider
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("CN")

  // 确保语言上下文在整个应用中一致
  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.setAttribute("lang", language.toLowerCase())
  }, [language])

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Create hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

