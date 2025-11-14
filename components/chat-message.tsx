"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { JarvisLogo } from "@/components/jarvis-logo"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
  profileCard?: {
    name: string
    image: string
    bio: string
    link: string
  }
}

export function ChatMessage({ message, isUser, timestamp, profileCard }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-end gap-3 max-w-[70%]">
          <div className="space-y-1">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl rounded-br-md neon-glow">
              <p className="text-primary-foreground">{message}</p>
            </div>
            <p className="text-xs text-muted-foreground text-right">{formatTime(timestamp)}</p>
          </div>
          <Avatar className="w-8 h-8 border-2 border-primary/50">
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-3 max-w-[70%]">
        <JarvisLogo className="w-8 h-8" animated />
        <div className="space-y-1">
          <div className="glass-card p-4 rounded-2xl rounded-bl-md border border-primary/30">
            <p className="text-card-foreground">{message}</p>
          </div>
          {profileCard && (
            <Card className="glass-card border border-accent/30 mt-2">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={profileCard.image || "/placeholder.svg"}
                    alt={profileCard.name}
                    className="w-16 h-16 rounded-lg object-cover border border-accent/30"
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-accent">{profileCard.name}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">{profileCard.bio}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-accent hover:text-accent/80 p-0 h-auto"
                      onClick={() => window.open(profileCard.link, "_blank")}
                    >
                      Learn more <ExternalLink size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <p className="text-xs text-muted-foreground">{formatTime(timestamp)}</p>
        </div>
      </div>
    </div>
  )
}
