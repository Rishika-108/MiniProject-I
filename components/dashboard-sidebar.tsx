"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SwastikLogo } from "@/components/Swastik-logo"
import { Home, MessageCircle, Grid3X3, BookOpen, Settings, Zap, LogOut, Menu, X } from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: MessageCircle, label: "Assistant Chat", href: "/chat" },
  { icon: Grid3X3, label: "Applications", href: "/applications" },
  { icon: BookOpen, label: "Knowledge", href: "/knowledge" },
  { icon: Settings, label: "System Control", href: "/system" },
  { icon: Zap, label: "Settings", href: "/settings" },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("Swastik-auth")
    localStorage.removeItem("Swastik-username")
    router.push("/login")
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo and Title */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <SwastikLogo className="w-10 h-10" animated />
          {(!isCollapsed || isMobileOpen) && (
            <div>
              <h2 className="font-serif text-xl font-bold text-primary neon-text">SWASTIK</h2>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Button
              key={item.href}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 glass-card transition-all duration-300 ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground neon-glow"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => {
                router.push(item.href)
                setIsMobileOpen(false)
              }}
            >
              <Icon size={20} />
              {(!isCollapsed || isMobileOpen) && <span>{item.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 glass-card hover:bg-destructive/20 hover:text-destructive transition-all duration-300"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <div
        className={`hidden md:flex flex-col bg-sidebar glass-card border-r border-sidebar-border transition-all duration-300 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } md:w-20 lg:w-64`}
      >
        <div className="absolute top-4 right-4 hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:text-primary"
          >
            <Menu size={16} />
          </Button>
        </div>
        <SidebarContent />
      </div>

      {/* Mobile Menu Button - only visible on mobile */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50 glass-card neon-glow"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Mobile Sidebar Overlay - only on mobile */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-full w-64 bg-sidebar glass-card border-r border-sidebar-border">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
