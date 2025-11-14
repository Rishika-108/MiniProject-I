export function JarvisLogo({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`w-16 h-16 rounded-full border-2 border-primary bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ${animated ? "animate-pulse" : ""}`}
      >
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <div className="w-full h-full rounded-full bg-background/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse"></div>
    </div>
  )
}
