"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Star } from "lucide-react"

interface KnowledgeCardProps {
  title: string
  description: string
  image?: string
  category: string
  link?: string
  metadata?: {
    year?: string
    rating?: string
    genre?: string
  }
}

export function KnowledgeCard({ title, description, image, category, link, metadata }: KnowledgeCardProps) {
  return (
    <Card className="glass-card hover:neon-glow transition-all duration-300 h-full">
      <CardContent className="p-6">
        <div className="flex gap-4 h-full">
          {image && (
            <div className="flex-shrink-0">
              <img
                src={image || "/placeholder.svg"}
                alt={title}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg object-cover border border-border/50"
              />
            </div>
          )}
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">{category}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
            </div>

            {metadata && (
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                {metadata.year && (
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{metadata.year}</span>
                  </div>
                )}
                {metadata.rating && (
                  <div className="flex items-center gap-1">
                    <Star size={12} />
                    <span>{metadata.rating}</span>
                  </div>
                )}
                {metadata.genre && <span>{metadata.genre}</span>}
              </div>
            )}

            {link && (
              <Button
                variant="ghost"
                size="sm"
                className="text-accent hover:text-accent/80 p-0 h-auto"
                onClick={() => window.open(link, "_blank")}
              >
                Learn more <ExternalLink size={14} className="ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
