"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send } from "lucide-react"
import { useRef, useState } from "react"

type MessageObj = { role: "user" | "assistant"; text: string };

interface ChatInputProps {
  onMessage: (message: MessageObj) => void
  disabled?: boolean
}

export function ChatInput({ onMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMessage = async () => {
    if (!message.trim() || disabled) return;
    const userText = message.trim();
    // show user message in UI
    onMessage({ role: "user", text: userText });
    setMessage("");
    inputRef.current?.focus();

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      if (data.reply) {
        onMessage({ role: "assistant", text: data.reply });
      } else {
        onMessage({ role: "assistant", text: "Error: no reply from backend" });
      }
    } catch (err) {
      onMessage({ role: "assistant", text: "Could not reach backend." });
      console.error("fetch error", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      if (isListening) {
        recognition.stop()
        setIsListening(false)
        return
      }

      recognition.start()
      setIsListening(true)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }
    } else {
      alert("Speech recognition is not supported in your browser")
    }
  }

  return (
    <div className="border-t border-border bg-card/50 glass backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask Swastik anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
            className="glass bg-input/50 border-border/50 focus:border-primary focus:ring-primary/50 transition-all duration-300 pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleVoiceInput}
            disabled={disabled}
            className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 transition-all duration-300 ${
              isListening
                ? "text-destructive hover:text-destructive/80 neon-glow"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </Button>
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 neon-glow transition-all duration-300"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  )
}
