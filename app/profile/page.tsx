"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SwastikLogo } from "@/components/Swastik-logo"
import { Edit, Calendar, Clock, Activity } from "lucide-react"

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    joinedDate: new Date().toLocaleDateString(),
    lastActive: new Date().toLocaleString(),
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("Swastik-auth")
    if (!auth) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)

    const username = localStorage.getItem("Swastik-username") || "User"
    setProfile((prev) => ({
      ...prev,
      name: username,
      email: `${username.toLowerCase()}@Swastik.ai`,
    }))
  }, [router])

  const handleSaveProfile = () => {
    localStorage.setItem("Swastik-username", profile.name)
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2 text-primary neon-text">Profile</h1>
            <p className="text-lg text-muted-foreground">Manage your account information</p>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Profile Card */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-serif text-2xl">User Profile</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="glass hover:neon-glow"
                  >
                    <Edit size={16} className="mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-primary/50">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-bold text-2xl">
                        {profile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2">
                      <SwastikLogo className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        {isEditing ? (
                          <Input
                            value={profile.name}
                            onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                            className="mt-1 glass"
                          />
                        ) : (
                          <p className="text-lg font-semibold">{profile.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        {isEditing ? (
                          <Input
                            value={profile.email}
                            onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                            className="mt-1 glass"
                          />
                        ) : (
                          <p className="text-lg">{profile.email}</p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-3">
                        <Button
                          onClick={handleSaveProfile}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 neon-glow"
                        >
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="glass">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Joined</p>
                      <p className="font-semibold">{profile.joinedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20">
                      <Clock size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Active</p>
                      <p className="font-semibold">{profile.lastActive}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20">
                      <Activity size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">47</p>
                    <p className="text-sm text-muted-foreground">Commands Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">12</p>
                    <p className="text-sm text-muted-foreground">Apps Opened</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">2h 34m</p>
                    <p className="text-sm text-muted-foreground">Session Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-400">8</p>
                    <p className="text-sm text-muted-foreground">Knowledge Queries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
