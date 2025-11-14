"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface SettingsSectionProps {
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}

export function SettingsSection({ icon: Icon, title, description, children }: SettingsSectionProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
            <Icon size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground font-normal">{description}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}

interface SettingItemProps {
  label: string
  description?: string
  children: React.ReactNode
}

export function SettingItem({ label, description, children }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="space-y-1">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
}
