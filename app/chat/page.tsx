"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { JarvisLogo } from "@/components/jarvis-logo"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Brain, Zap, Activity } from "lucide-react"

interface Message {
  id: string
  message: string
  isUser: boolean
  timestamp: Date
  profileCard?: {
    name: string
    image: string
    bio: string
    link: string
  }
}

export default function ChatPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("jarvis-auth")
    if (!auth) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)

    // Add welcome message
    setMessages([
      {
        id: "welcome",
        message: "Hello! I'm Swastik, your AI personal assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ])
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

//   const handleSendMessage = async (messageText: string) => {
//   const userMessage: Message = {
//     id: Date.now().toString(),
//     message: messageText,
//     isUser: true,
//     timestamp: new Date(),
//   };
//   setMessages(prev => [...prev, userMessage]);

//   setIsTyping(true);

//   try {
//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: messageText }),
//     });

//     const data = await res.json();

//     const aiMessage: Message = {
//       id: (Date.now() + 1).toString(),
//       message: data.reply || "Error: No response",
//       isUser: false,
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, aiMessage]);
//   } catch (error) {
//     const aiMessage: Message = {
//       id: (Date.now() + 2).toString(),
//       message: "Error reaching AI model",
//       isUser: false,
//       timestamp: new Date(),
//     };
//     setMessages(prev => [...prev, aiMessage]);
//   }

//   setIsTyping(false);
// };
const handleSendMessage = async (messageText: string) => {
  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    message: messageText,
    isUser: true,
    timestamp: new Date(),
  };
  setMessages(prev => [...prev, userMessage]);

  setIsTyping(true);

  try {
    // Call backend
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText }),
    });

    const data = await res.json();

    // Add assistant message (ONLY here)
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      message: data.reply || "Error: No response from AI",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);

  } catch (error) {
    // Error fallback
    const aiMessage: Message = {
      id: (Date.now() + 2).toString(),
      message: "Error reaching AI model",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);
  }

  setIsTyping(false);
};



  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full mx-auto neon-glow"></div>
            <div className="animate-ping absolute inset-0 w-12 h-12 border border-primary/20 rounded-full mx-auto"></div>
            <Brain className="absolute inset-0 w-6 h-6 text-primary m-auto animate-pulse" />
          </div>
          <p className="mt-6 text-muted-foreground neon-text">Establishing Neural Connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/5 left-1/6 w-1 h-1 bg-primary rounded-full animate-pulse floating opacity-40"></div>
        <div
          className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse floating opacity-30"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-accent rounded-full animate-pulse floating opacity-50"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse floating opacity-25"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <DashboardSidebar />

      <div className="flex-1 flex flex-col relative z-10">
        <DashboardHeader />

        <div className="flex-1 flex flex-col">
          <div className="border-b border-border/30 bg-card/20 glass-ultra backdrop-blur-xl p-4 neon-glow-accent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <JarvisLogo className="w-8 md:w-10 h-8 md:h-10 floating" animated />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-serif text-lg md:text-xl font-bold text-primary neon-text holographic-text">
                  Neural Chat Interface
                </h1>
                <div className="flex items-center gap-2">
                  {isTyping ? (
                    <>
                      <Activity className="w-3 h-3 text-accent animate-pulse" />
                      <p className="text-xs md:text-sm text-accent neon-text">Processing neural patterns...</p>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-primary animate-pulse" />
                      <p className="text-xs md:text-sm text-muted-foreground">AI Consciousness Active</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 md:pb-4 relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(8, 145, 178, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(8, 145, 178, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              ></div>
            </div>

            {messages.map((message, index) => (
              <div key={message.id} className="floating hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <ChatMessage
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  profileCard={message.profileCard}
                />
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-end gap-3 floating">
                  <div className="relative">
                    <JarvisLogo className="w-8 h-8" animated />
                    <div className="absolute -inset-1 bg-primary/30 rounded-full blur-sm animate-pulse"></div>
                  </div>
                  <div className="glass-ultra p-4 rounded-2xl rounded-bl-md border border-primary/30 neon-glow holographic">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce neon-glow"></div>
                      <div
                        className="w-2 h-2 bg-secondary rounded-full animate-bounce neon-glow-purple"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-accent rounded-full animate-bounce neon-glow-accent"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-primary/70 font-mono">Neural processing...</div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* <ChatInput onMessage={handleSendMessage} disabled={isTyping} /> */}
          <ChatInput
  onMessage={(msgObj) => handleSendMessage(msgObj.text)}
  disabled={isTyping}
/>

        </div>
      </div>

      <MobileBottomNav />
    </div>
  )
}
