"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { QuickActionCard } from "@/components/quick-action-card"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Globe, Cloud, Music, Mail, Calendar, Cpu, Zap, Activity, Wifi } from "lucide-react"

export default function DashboardPage() {
  const [username, setUsername] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [systemStats, setSystemStats] = useState({
    cpu: 23,
    memory: 67,
    network: "Online",
    commands: 47,
    apps: 12,
    uptime: "2h 34m",
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("Swastik-auth")
    const storedUsername = localStorage.getItem("Swastik-username")

    if (!auth) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setUsername(storedUsername || "User")

    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 15,
        memory: Math.floor(Math.random() * 20) + 60,
        commands: prev.commands + Math.floor(Math.random() * 3),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [router])

  const quickActions = [
    {
      icon: Globe,
      title: "Open Google",
      description: "Search the web",
      action: () => window.open("https://google.com", "_blank"),
      color: "primary",
    },
    {
      icon: Cloud,
      title: "Check Weather",
      description: "Current conditions",
      action: () => router.push("/weather"),
      color: "secondary",
    },
    {
      icon: Music,
      title: "Play Music",
      description: "Open Spotify",
      action: () => window.open("https://spotify.com", "_blank"),
      color: "accent",
    },
    {
      icon: Mail,
      title: "Check Email",
      description: "Open Gmail",
      action: () => window.open("https://gmail.com", "_blank"),
      color: "primary",
    },
    {
      icon: Calendar,
      title: "Calendar",
      description: "View schedule",
      action: () => router.push("/calendar"),
      color: "secondary",
    },
    {
      icon: Cpu,
      title: "System Status",
      description: "Monitor performance",
      action: () => router.push("/system"),
      color: "accent",
    },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full mx-auto neon-glow"></div>
            <div className="animate-ping absolute inset-0 w-12 h-12 border border-primary/20 rounded-full mx-auto"></div>
          </div>
          <p className="mt-6 text-muted-foreground neon-text">Initializing Neural Interface...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/6 left-1/5 w-1 h-1 bg-primary rounded-full animate-pulse floating opacity-60"></div>
        <div
          className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse floating opacity-40"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-accent rounded-full animate-pulse floating opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-primary rounded-full animate-pulse floating opacity-30"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>

      <DashboardSidebar />

      <div className="flex-1 flex flex-col relative z-10">
        <DashboardHeader />

        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-6 lg:pb-8">
          <div className="mb-6 md:mb-8 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-xl"></div>
            <div className="relative">
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-balance">
                Neural Interface Active, <span className="text-primary neon-text holographic-text">{username}</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground text-pretty flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent animate-pulse" />
                How may I assist your digital operations today?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {quickActions.map((action, index) => (
              <div key={index} className="floating hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <QuickActionCard
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onClick={action.action}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="glass-ultra neon-glow holographic hover-lift p-4 md:p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="font-semibold text-primary neon-text">Neural Core Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Processing Power</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-background/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 rounded-full"
                        style={{ width: `${systemStats.cpu}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-accent font-mono">{systemStats.cpu}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Memory Banks</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-background/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-1000 rounded-full"
                        style={{ width: `${systemStats.memory}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-accent font-mono">{systemStats.memory}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Network Link</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm text-primary font-semibold">{systemStats.network}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-ultra neon-glow-purple holographic hover-lift p-4 md:p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-secondary animate-pulse" />
                <h3 className="font-semibold text-secondary neon-text">Recent Neural Activity</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <p className="text-muted-foreground">Accessed web interface</p>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/5 border border-secondary/20">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <p className="text-muted-foreground">Analyzed weather patterns</p>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/5 border border-accent/20">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <p className="text-muted-foreground">Synchronized audio systems</p>
                </div>
              </div>
            </div>

            <div className="glass-ultra neon-glow-accent holographic hover-lift p-4 md:p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent animate-pulse" />
                <h3 className="font-semibold text-accent neon-text">Performance Metrics</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Commands Processed</span>
                  <span className="text-sm text-primary font-mono font-bold">{systemStats.commands}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Applications Launched</span>
                  <span className="text-sm text-secondary font-mono font-bold">{systemStats.apps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Session Duration</span>
                  <span className="text-sm text-accent font-mono font-bold">{systemStats.uptime}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  )
}
