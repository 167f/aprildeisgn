"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage, type Language } from "@/components/LanguageContext"

// Update the navigation items and add contact button
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "EN", name: "English" },
    { code: "CN", name: "简体中文" },
    { code: "TW", name: "繁體中文" },
  ]

  const changeLanguage = (code: Language) => {
    setLanguage(code)
    // Close the dropdown after selection
    setIsLanguageOpen(false)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    {
      name: t.home,
      action: () => {
        router.push("/")
        setTimeout(() => {
          const homeSection = document.getElementById("home-section")
          if (homeSection) {
            homeSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      },
    },
    {
      name: t.works,
      action: () => {
        router.push("/")
        setTimeout(() => {
          const worksSection = document.getElementById("works-section")
          if (worksSection) {
            worksSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      },
    },
    {
      name: t.about,
      action: () => {
        router.push("/")
        setTimeout(() => {
          const aboutSection = document.getElementById("about-section")
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      },
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdown = document.getElementById("language-dropdown")
      if (dropdown && !dropdown.contains(target)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-white/90 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-black">
          {language === "EN" ? "APRIL'S DESIGN PORTFOLIO" : "April的作品集"}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button key={item.name} onClick={item.action} className="text-black/80 hover:text-black transition-colors">
              {item.name}
            </button>
          ))}
        </nav>

        {/* Language Selector */}
        <div className="hidden md:block relative mr-4">
          <div className="relative">
            <button
              className="flex items-center space-x-1 text-black/80 hover:text-black"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <span>{language}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLanguageOpen && (
              <div
                id="language-dropdown"
                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => changeLanguage(lang.code as Language)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="rounded-full px-6 border-black text-black hover:bg-black hover:text-white"
            onClick={() => router.push("/#contact-section")}
          >
            {t.contactMe}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-black">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
            <nav className="flex flex-col space-y-6 mt-12">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action()
                    setIsOpen(false)
                  }}
                  className="text-xl font-medium text-black/80 hover:text-black transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
              <Button
                variant="outline"
                className="rounded-full px-6 border-black text-black hover:bg-black hover:text-white w-fit"
                onClick={() => {
                  router.push("/#contact-section")
                  setIsOpen(false)
                }}
              >
                {t.contactMe}
              </Button>

              {/* Mobile Language Selector */}
              <div className="pt-4">
                <p className="text-sm text-black/60 mb-2">Language / 语言</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`px-3 py-1 rounded-full text-sm ${
                        language === lang.code ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
                      }`}
                      onClick={() => changeLanguage(lang.code as Language)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

