"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsSection, SettingItem } from "@/components/settings-section"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, User, Lock, Mic, Bell } from "lucide-react"

export default function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [settings, setSettings] = useState({
    theme: "dark",
    notifications: true,
    voiceEnabled: true,
    volume: [75],
    language: "en",
    autoSave: true,
    animations: true,
    privacy: true,
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("jarvis-auth")
    if (!auth) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    localStorage.setItem("jarvis-settings", JSON.stringify(settings))
    alert("Settings saved successfully!")
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
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2 text-primary neon-text">Settings</h1>
            <p className="text-lg text-muted-foreground">Customize your Jarvis experience</p>
          </div>

          <div className="space-y-6 max-w-4xl">
            {/* Theme Settings */}
            <SettingsSection
              icon={Palette}
              title="Appearance"
              description="Customize the look and feel of your interface"
            >
              <SettingItem label="Theme" description="Choose your preferred color scheme">
                <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                  <SelectTrigger className="w-32 glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem label="Animations" description="Enable smooth transitions and effects">
                <Switch
                  checked={settings.animations}
                  onCheckedChange={(checked) => updateSetting("animations", checked)}
                />
              </SettingItem>
            </SettingsSection>

            {/* Profile Settings */}
            <SettingsSection icon={User} title="Profile" description="Manage your account information">
              <SettingItem label="Display Name">
                <Input
                  defaultValue={localStorage.getItem("jarvis-username") || "User"}
                  className="w-48 glass"
                  placeholder="Enter your name"
                />
              </SettingItem>
              <SettingItem label="Language" description="Select your preferred language">
                <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                  <SelectTrigger className="w-32 glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </SettingItem>
              <SettingItem label="Update Profile">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass hover:neon-glow bg-transparent"
                  onClick={() => router.push("/profile")}
                >
                  Edit Profile
                </Button>
              </SettingItem>
            </SettingsSection>

            {/* Security Settings */}
            <SettingsSection icon={Lock} title="Security" description="Manage your account security">
              <SettingItem label="Change Password">
                <Button variant="outline" size="sm" className="glass hover:neon-glow bg-transparent">
                  Update
                </Button>
              </SettingItem>
              <SettingItem label="Privacy Mode" description="Enhanced privacy protection">
                <Switch checked={settings.privacy} onCheckedChange={(checked) => updateSetting("privacy", checked)} />
              </SettingItem>
            </SettingsSection>

            {/* Voice Settings */}
            <SettingsSection
              icon={Mic}
              title="Voice & Audio"
              description="Configure voice recognition and audio settings"
            >
              <SettingItem label="Voice Commands" description="Enable voice input">
                <Switch
                  checked={settings.voiceEnabled}
                  onCheckedChange={(checked) => updateSetting("voiceEnabled", checked)}
                />
              </SettingItem>
              <SettingItem label="System Volume" description="Adjust audio levels">
                <div className="w-32">
                  <Slider
                    value={settings.volume}
                    onValueChange={(value) => updateSetting("volume", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>{settings.volume[0]}%</span>
                    <span>100</span>
                  </div>
                </div>
              </SettingItem>
            </SettingsSection>

            {/* Notification Settings */}
            <SettingsSection icon={Bell} title="Notifications" description="Control how you receive updates">
              <SettingItem label="Enable Notifications" description="Receive system alerts">
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting("notifications", checked)}
                />
              </SettingItem>
              <SettingItem label="Auto-save" description="Automatically save your work">
                <Switch checked={settings.autoSave} onCheckedChange={(checked) => updateSetting("autoSave", checked)} />
              </SettingItem>
            </SettingsSection>

            {/* Save Button */}
            <div className="flex justify-end pt-6">
              <Button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 neon-glow transition-all duration-300"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
