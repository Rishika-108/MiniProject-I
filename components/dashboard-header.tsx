"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Bell } from "lucide-react"

export function DashboardHeader() {
  const [username, setUsername] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const storedUsername = localStorage.getItem("Swastik-username") || "User"
    setUsername(storedUsername)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="h-16 border-b border-border bg-card/50 glass backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Ask Swastik anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass bg-input/50 border-border/50 focus:border-primary focus:ring-primary/50 transition-all duration-300"
            />
          </form>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative glass-card hover:neon-glow transition-all duration-300">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
          </Button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border-2 border-primary/50">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">{username}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
