"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface SystemControlCardProps {
  icon: LucideIcon
  title: string
  description: string
  status?: string
  statusColor?: "green" | "red" | "yellow" | "blue"
  onClick: () => void
}

export function SystemControlCard({
  icon: Icon,
  title,
  description,
  status,
  statusColor = "green",
  onClick,
}: SystemControlCardProps) {
  const getStatusColor = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-400"
      case "red":
        return "text-red-400"
      case "yellow":
        return "text-yellow-400"
      case "blue":
        return "text-blue-400"
      default:
        return "text-green-400"
    }
  }

  return (
    <Card
      className="glass-card hover:neon-glow transition-all duration-300 cursor-pointer group h-full"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
            <Icon size={24} className="text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              {status && <span className={`text-xs font-medium ${getStatusColor(statusColor)}`}>{status}</span>}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
