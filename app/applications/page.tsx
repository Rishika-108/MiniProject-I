"use client"

import { AppCard } from "@/components/app-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Input } from "@/components/ui/input"
import {
  Calculator,
  Calendar,
  Camera,
  FileText,
  Globe,
  Grid3X3,
  Map,
  MessageCircle,
  Music,
  Search,
  ShoppingCart,
  Youtube,
  Zap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Apps grouped by categories
const appCategories = [
  {
    category: "Social",
    apps: [
      { icon: Camera, name: "Instagram", description: "Photo sharing", url: "https://instagram.com", color: "purple" },
      { icon: MessageCircle, name: "WhatsApp", description: "Messaging app", url: "https://web.whatsapp.com", color: "green" },
      { icon: Globe, name: "Twitter", description: "Social network", url: "https://twitter.com", color: "blue" },
      { icon: Camera, name: "Snapchat", description: "Photo & video sharing", url: "https://www.snapchat.com", color: "yellow" },
      { icon: Globe, name: "Facebook", description: "Social network", url: "https://facebook.com", color: "blue" },
      { icon: Camera, name: "Pinterest", description: "Image discovery", url: "https://www.pinterest.com", color: "red" },
      { icon: Music, name: "TikTok", description: "Short video platform", url: "https://www.tiktok.com", color: "black" },
    ],
  },
  {
    category: "Productivity",
    apps: [
      { icon: FileText, name: "Google Docs", description: "Document editor", url: "https://docs.google.com", color: "blue" },
      { icon: Calendar, name: "Google Calendar", description: "Schedule events", url: "https://calendar.google.com", color: "blue" },
      { icon: Grid3X3, name: "Trello", description: "Project management", url: "https://trello.com", color: "blue" },
      { icon: Grid3X3, name: "Slack", description: "Team collaboration", url: "https://slack.com", color: "purple" },
      { icon: Zap, name: "Zoom", description: "Video conferencing", url: "https://zoom.us", color: "blue" },
      { icon: FileText, name: "Notion", description: "Notes & productivity", url: "https://www.notion.so", color: "black" },
      { icon: FileText, name: "Evernote", description: "Note-taking app", url: "https://evernote.com", color: "green" },
      { icon: FileText, name: "Microsoft Word", description: "Word processor", url: "https://office.com", color: "blue" },
      { icon: FileText, name: "Microsoft Excel", description: "Spreadsheet tool", url: "https://office.com", color: "green" },
      { icon: FileText, name: "Microsoft PowerPoint", description: "Presentation tool", url: "https://office.com", color: "orange" },
    ],
  },
  {
    category: "Media & Streaming",
    apps: [
      { icon: Youtube, name: "YouTube", description: "Watch videos", url: "https://youtube.com", color: "red" },
      { icon: Music, name: "Spotify", description: "Stream music", url: "https://spotify.com", color: "green" },
      { icon: Music, name: "SoundCloud", description: "Stream & share music", url: "https://soundcloud.com", color: "orange" },
      { icon: Youtube, name: "Netflix", description: "Streaming movies & shows", url: "https://www.netflix.com", color: "red" },
      { icon: Youtube, name: "Prime Video", description: "Amazon video streaming", url: "https://www.primevideo.com", color: "blue" },
      { icon: Youtube, name: "Disney+ Hotstar", description: "Stream movies & sports", url: "https://www.hotstar.com", color: "blue" },
    ],
  },
  {
    category: "Shopping & E-commerce",
    apps: [
      { icon: ShoppingCart, name: "Amazon", description: "Online shopping", url: "https://amazon.com", color: "orange" },
      { icon: ShoppingCart, name: "Flipkart", description: "Indian online shopping", url: "https://www.flipkart.com", color: "blue" },
      { icon: ShoppingCart, name: "Myntra", description: "Fashion & lifestyle", url: "https://www.myntra.com", color: "pink" },
      { icon: ShoppingCart, name: "BigBasket", description: "Grocery shopping", url: "https://www.bigbasket.com", color: "green" },
    ],
  },
  {
    category: "Food & Delivery",
    apps: [
      { icon: Map, name: "Swiggy", description: "Food delivery", url: "https://www.swiggy.com", color: "orange" },
      { icon: Map, name: "Zomato", description: "Restaurant & food delivery", url: "https://www.zomato.com", color: "red" },
    ],
  },
  {
    category: "Finance & Payments",
    apps: [
      { icon: Calculator, name: "Paytm", description: "Digital wallet & payments", url: "https://paytm.com", color: "blue" },
      { icon: Calculator, name: "Google Pay", description: "Send & receive money", url: "https://pay.google.com", color: "blue" },
      { icon: Calculator, name: "PhonePe", description: "Digital payments app", url: "https://www.phonepe.com", color: "purple" },
    ],
  },
  {
    category: "Travel & Navigation",
    apps: [
      { icon: Map, name: "Google Maps", description: "Navigation & maps", url: "https://maps.google.com", color: "green" },
      { icon: Map, name: "Uber", description: "Ride-hailing service", url: "https://www.uber.com", color: "black" },
      { icon: Map, name: "Ola", description: "Indian taxi service", url: "https://www.olacabs.com", color: "green" },
    ],
  },
  {
    category: "Utilities",
    apps: [
      { icon: Calculator, name: "Calculator", description: "Perform calculations", url: "https://calculator.net", color: "orange" },
      { icon: Globe, name: "Wikipedia", description: "Online encyclopedia", url: "https://www.wikipedia.org", color: "gray" },
    ],
  },
]

export default function ApplicationsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(appCategories)
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const auth = localStorage.getItem("Swastik-auth")
    if (!auth) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  // Filter apps based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCategories(appCategories)
      return
    }
    const filtered = appCategories
      .map((cat) => ({
        ...cat,
        apps: cat.apps.filter(
          (app) =>
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((cat) => cat.apps.length > 0)
    setFilteredCategories(filtered)
  }, [searchQuery])

  // Voice search function
  const startVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Your browser does not support voice search.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.start()

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setSearchQuery(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full mx-auto neon-glow"></div>
            <div className="animate-ping absolute inset-0 w-12 h-12 border border-primary/20 rounded-full mx-auto"></div>
            <Grid3X3 className="absolute inset-0 w-6 h-6 text-primary m-auto animate-pulse" />
          </div>
          <p className="mt-6 text-muted-foreground neon-text">Loading Application Matrix...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/6 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse floating opacity-30"></div>
        <div
          className="absolute top-1/3 right-1/6 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse floating opacity-40"
          style={{ animationDelay: "1.8s" }}
        ></div>
        <div
          className="absolute bottom-1/5 left-1/6 w-1 h-1 bg-accent rounded-full animate-pulse floating opacity-35"
          style={{ animationDelay: "3.2s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse floating opacity-25"
          style={{ animationDelay: "0.7s" }}
        ></div>
      </div>

      <DashboardSidebar />

      <div className="flex-1 flex flex-col relative z-10">
        <DashboardHeader />

        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-6 lg:pb-8">
          {/* Header */}
          <div className="mb-6 md:mb-8 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl blur-xl"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Grid3X3 className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
                <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary neon-text holographic-text">
                  Application Matrix
                </h1>
              </div>
              <p className="text-base md:text-lg text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent animate-pulse" />
                Launch neural-linked applications and services
              </p>
            </div>
          </div>

          {/* Search input with voice recognition */}
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-full md:max-w-md flex items-center">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search neural applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 glass-ultra bg-input/20 border-border/30 focus:border-primary focus:ring-primary/50 hover:border-primary/40 transition-all duration-500 h-12 md:h-10 hover-glow"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors"
                onClick={startVoiceSearch}
              >
                🎤
              </button>
            </div>
          </div>

          {/* Display categories */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-ultra p-8 rounded-2xl neon-glow holographic max-w-md mx-auto">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground neon-text">No applications found in neural matrix.</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Try adjusting your search parameters.</p>
              </div>
            </div>
          )}

          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">{cat.category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {cat.apps.map((app, index) => (
                  <div key={index} className="floating hover-lift" style={{ animationDelay: `${index * 0.05}s` }}>
                    <AppCard
                      icon={app.icon}
                      name={app.name}
                      description={app.description}
                      url={app.url}
                      color={app.color}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  )
}
