"use client"

interface SkillsCardProps {
  category: string
  skills: string[]
  color?: "blue" | "white" | "gray"
  className?: string
}

export default function SkillsCard({ category, skills, color = "white", className = "" }: SkillsCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-[#1a4bff] text-white"
      case "white":
        return "bg-white text-black"
      case "gray":
        return "bg-[#f2f2f2] text-black"
      default:
        return "bg-white text-black"
    }
  }

  return (
    <div className={`rounded-3xl p-4 sm:p-6 ${getColorClasses()} ${className}`}>
      <div className="h-full flex flex-col">
        <div className="mb-2 sm:mb-4">
          <span className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/10">{category}</span>
        </div>
        <div className="flex-1 flex flex-wrap gap-1 sm:gap-2 content-center justify-center">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/10 text-xs sm:text-sm inline-block"
              style={{
                transform: `rotate(${Math.random() * 6 - 3}deg)`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

