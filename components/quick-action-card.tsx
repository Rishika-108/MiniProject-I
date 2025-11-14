"use client"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface QuickActionCardProps {
  icon: LucideIcon
  title: string
  description: string
  onClick: () => void
}

export function QuickActionCard({ icon: Icon, title, description, onClick }: QuickActionCardProps) {
  return (
    <Card
      className="glass-ultra hover:neon-glow holographic hover-lift transition-all duration-500 cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 w-1 h-1 bg-primary/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div
        className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-accent/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <CardContent className="p-4 md:p-6 relative z-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 group-hover:from-primary/20 group-hover:via-secondary/15 group-hover:to-accent/20 transition-all duration-500 flex-shrink-0 border border-primary/20 group-hover:border-primary/40">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon
              size={20}
              className="md:w-6 md:h-6 text-primary group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(8,145,178,0.6)] transition-all duration-300 relative z-10"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-card-foreground text-sm md:text-base truncate group-hover:neon-text transition-all duration-300">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 md:line-clamp-1 group-hover:text-muted-foreground/90 transition-all duration-300">
              {description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </CardContent>
    </Card>
  )
}
