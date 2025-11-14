"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, MessageCircle, Grid3X3, BookOpen, Settings, Zap } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: Grid3X3, label: "Apps", href: "/applications" },
  { icon: BookOpen, label: "Knowledge", href: "/knowledge" },
  { icon: Settings, label: "System", href: "/system" },
  { icon: Zap, label: "Settings", href: "/settings" },
]

export function MobileBottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar/95 glass backdrop-blur-md border-t border-sidebar-border">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 transition-all duration-300 ${
                isActive
                  ? "text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:text-sidebar-primary-foreground"
              }`}
              onClick={() => router.push(item.href)}
            >
              <Icon size={18} className={isActive ? "neon-glow" : ""} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
