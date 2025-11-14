"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface AppCardProps {
  icon: LucideIcon
  name: string
  description: string
  url: string
  color?: string
}

export function AppCard({ icon: Icon, name, description, url, color = "primary" }: AppCardProps) {
  const handleClick = () => {
    window.open(url, "_blank")
  }

  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case "red":
        return "from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30 text-red-400"
      case "green":
        return "from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30 text-green-400"
      case "blue":
        return "from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 text-blue-400"
      case "purple":
        return "from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 text-purple-400"
      case "orange":
        return "from-orange-500/20 to-orange-600/20 group-hover:from-orange-500/30 group-hover:to-orange-600/30 text-orange-400"
      default:
        return "from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 text-primary"
    }
  }

  return (
    <Card
      className="glass-card hover:neon-glow transition-all duration-300 cursor-pointer group h-full"
      onClick={handleClick}
    >
      <CardContent className="p-4 md:p-6 flex flex-col items-center text-center space-y-3 md:space-y-4 h-full">
        <div
          className={`p-3 md:p-4 rounded-2xl bg-gradient-to-br ${getColorClasses(color)} transition-all duration-300`}
        >
          <Icon size={24} className="md:w-8 md:h-8" />
        </div>
        <div className="space-y-1 md:space-y-2 flex-1 flex flex-col justify-center">
          <h3 className="font-semibold text-sm md:text-lg text-card-foreground line-clamp-1">{name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
