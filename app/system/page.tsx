"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SystemControlCard } from "@/components/system-control-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  FolderOpen,
  Camera,
  Battery,
  Wifi,
  Power,
  RotateCcw,
  HardDrive,
  Cpu,
  MemoryStick,
  Thermometer,
} from "lucide-react"

export default function SystemPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [systemStats, setSystemStats] = useState({
    cpu: 23,
    memory: 67,
    storage: 45,
    temperature: 42,
    battery: 85,
  })
  const router = useRouter()

  // useEffect(() => {
  //   const auth = localStorage.getItem("Swastik-auth")
  //   if (!auth) {
  //     router.push("/login")
  //     return
  //   }
  //   setIsAuthenticated(true)

  //   // Simulate real-time system stats updates
  //   const interval = setInterval(() => {
  //     setSystemStats((prev) => ({
  //       cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
  //       memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
  //       storage: prev.storage,
  //       temperature: Math.max(35, Math.min(65, prev.temperature + (Math.random() - 0.5) * 3)),
  //       battery: Math.max(20, Math.min(100, prev.battery + (Math.random() - 0.5) * 2)),
  //     }))
  //   }, 3000)

  //   return () => clearInterval(interval)
  // }, [router])

  useEffect(() => {
  const auth = localStorage.getItem("Swastik-auth")
  if (!auth) {
    router.push("/login")
    return
  }
  setIsAuthenticated(true)

  // Fetch system info every few seconds
  const fetchSystemStats = async () => {
    const res = await fetch("/api/system")
    const data = await res.json()
    setSystemStats({
      cpu: Number(data.cpu),
      memory: Number(data.memory),
      storage: Number(data.storage),
      temperature: Number(data.temperature),
      battery: Number(data.battery),
    })
  }

  fetchSystemStats()
  const interval = setInterval(fetchSystemStats, 5000)

  return () => clearInterval(interval)
}, [router])


  const systemActions = [
    // {
    //   icon: FolderOpen,
    //   title: "File Explorer",
    //   description: "Browse files and folders",
    //   status: "Ready",
    //   statusColor: "green" as const,
    //   action: () => {
    //     // In a real app, this would open the file explorer
    //     alert("File Explorer would open here")
    //   },
    // },
    {
  icon: Camera,
  title: "Camera",
  description: "Access camera device",
  status: "Available",
  statusColor: "green" as const,
  action: async () => {
    try {
      // Ask user for camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Create a popup window with the camera stream
      const videoWindow = window.open("", "CameraPreview", "width=640,height=480");
      if (videoWindow) {
        videoWindow.document.write(`
          <html>
            <body style="margin:0; background:black; display:flex; align-items:center; justify-content:center;">
              <video id="cameraFeed" autoplay playsinline style="width:100%; height:100%; object-fit:cover;"></video>
            </body>
          </html>
        `);
        const video = videoWindow.document.getElementById("cameraFeed") as HTMLVideoElement;
        if (video) {
          video.srcObject = stream;
        }
      }
    } catch (error) {
      alert("Camera access denied or unavailable.");
      console.error(error);
    }
  },
},
    {
      icon: Battery,
      title: "Battery Status",
      description: "Monitor power levels",
      status: `${systemStats.battery}%`,
      statusColor:
        systemStats.battery > 50
          ? ("green" as const)
          : systemStats.battery > 20
            ? ("yellow" as const)
            : ("red" as const),
      action: () => {
        alert(`Battery level: ${systemStats.battery}%`)
      },
    },
    // {
    //   icon: Wifi,
    //   title: "Wi-Fi Control",
    //   description: "Manage network connections",
    //   status: "Connected",
    //   statusColor: "green" as const,
    //   action: () => {
    //     alert("Wi-Fi settings would open here")
    //   },
    // },
    {
  icon: Wifi,
  title: "Network Info",
  description: "Check network connectivity",
  status: navigator.onLine ? "Online" : "Offline",
  statusColor: navigator.onLine ? ("green" as const) : ("red" as const),
  action: () => {
    const connection = (navigator as any).connection || {};
    const type = connection.effectiveType || "unknown";
    const downlink = connection.downlink || "?";

    alert(
      navigator.onLine
        ? `✅ You are online\nConnection type: ${type}\nSpeed: ${downlink} Mbps`
        : "❌ You are offline"
    );
  },
},

    // {
    //   icon: Power,
    //   title: "Shutdown",
    //   description: "Power off the system",
    //   status: "Ready",
    //   statusColor: "red" as const,
    //   action: () => {
    //     if (confirm("Are you sure you want to shutdown?")) {
    //       alert("System would shutdown here")
    //     }
    //   },
    // },
    // {
    //   icon: RotateCcw,
    //   title: "Restart",
    //   description: "Reboot the system",
    //   status: "Ready",
    //   statusColor: "yellow" as const,
    //   action: () => {
    //     if (confirm("Are you sure you want to restart?")) {
    //       alert("System would restart here")
    //     }
    //   },
    // },
  ]

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
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2 text-primary neon-text">System Control</h1>
            <p className="text-lg text-muted-foreground">Monitor and control system functions</p>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Cpu size={16} className="text-primary" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current</span>
                    <span className="text-primary">{Math.round(systemStats.cpu)}%</span>
                  </div>
                  <Progress value={systemStats.cpu} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MemoryStick size={16} className="text-secondary" />
                  Memory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used</span>
                    <span className="text-secondary">{Math.round(systemStats.memory)}%</span>
                  </div>
                  <Progress value={systemStats.memory} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <HardDrive size={16} className="text-accent" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used</span>
                    <span className="text-accent">{systemStats.storage}%</span>
                  </div>
                  <Progress value={systemStats.storage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Thermometer size={16} className="text-orange-400" />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Temp</span>
                    <span className="text-orange-400">{Math.round(systemStats.temperature)}°C</span>
                  </div>
                  <Progress value={(systemStats.temperature / 80) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Actions */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-secondary">System Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemActions.map((action, index) => (
                <SystemControlCard
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  status={action.status}
                  statusColor={action.statusColor}
                  onClick={action.action}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
