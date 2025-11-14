"use client";

import { JarvisLogo } from "@/components/jarvis-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, signup } from "../services/api"; // adjust path

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await signup(formData.email, formData.name, formData.password);
      if (res.message === "Account created successfully") {
        alert("Account created successfully! Please login.");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setMode("login");
      } else {
        alert(res.detail || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleLogin = async () => {
  //   if (!formData.email || !formData.password) {
  //     alert("Please enter email and password");
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const res = await login(formData.email, formData.password);
  //     if (res.access_token) {
  //       localStorage.setItem("jarvis-auth", "true");
  //       localStorage.setItem("jarvis-email", formData.email);
  //       localStorage.setItem("token", res.access_token);
  //       router.push("/dashboard");
  //     } else {
  //       alert(res.detail || "Login failed");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error connecting to backend");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async () => {
  if (!formData.email || !formData.password) {
    alert("Please enter email and password");
    return;
  }

  setIsLoading(true);

  try {
    // 🔒 Hardcoded login validation
    if (formData.email === "rishi@gmail.com" && formData.password === "123456") {
      // Simulate login success
      localStorage.setItem("jarvis-auth", "true");
      localStorage.setItem("jarvis-email", formData.email);
      localStorage.setItem("token", "dummy-token-123456");
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  } catch (err) {
    console.error(err);
    alert("Unexpected error during login");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
      <div className="w-full max-w-sm md:max-w-md space-y-6 md:space-y-8 relative z-10">
        {/* Logo & heading */}
        <div className="text-center space-y-4">
          <JarvisLogo className="mx-auto" animated />
          <h1 className="font-serif text-3xl md:text-4xl font-bold neon-text text-primary">
            SWASTIK
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Neural Interface System
          </p>
        </div>

        {/* Card */}
        <Card className="glass-ultra neon-glow holographic hover-lift">
          <CardHeader className="text-center pb-4 md:pb-6">
            <CardTitle className="font-serif text-xl md:text-2xl neon-text">
              {mode === "login" ? "System Access" : "Create Account"}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <div className="space-y-4 md:space-y-6">
              {mode === "register" && (
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="glass-ultra bg-input/20 border-border/30 focus:border-primary focus:ring-primary/50 transition-all duration-500 h-12 md:h-10 text-base hover-glow"
                  required
                />
              )}

              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="glass-ultra bg-input/20 border-border/30 focus:border-primary focus:ring-primary/50 transition-all duration-500 h-12 md:h-10 text-base hover-glow"
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="glass-ultra bg-input/20 border-border/30 focus:border-primary focus:ring-primary/50 transition-all duration-500 pr-12 h-12 md:h-10 text-base hover-glow"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all duration-300 p-1 hover:scale-110"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {mode === "register" && (
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="glass-ultra bg-input/20 border-border/30 focus:border-primary focus:ring-primary/50 transition-all duration-500 pr-12 h-12 md:h-10 text-base hover-glow"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-all duration-300 p-1 hover:scale-110"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}

              <Button
                type="button"
                onClick={mode === "login" ? handleLogin : (e) => handleRegister(e as any)}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90 neon-glow holographic transition-all duration-500 font-semibold h-12 md:h-10 text-base hover:scale-105 hover:shadow-2xl"
              >
                {isLoading
                  ? mode === "login"
                    ? "Initializing Neural Link..."
                    : "Creating Account..."
                  : mode === "login"
                  ? "Initialize System"
                  : "Create Account"}
              </Button>

              <p className="text-center text-sm mt-2">
                {mode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      className="text-accent hover:text-accent/80"
                      onClick={() => setMode("register")}
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="text-accent hover:text-accent/80"
                      onClick={() => setMode("login")}
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
