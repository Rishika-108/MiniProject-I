// services/api.js

// 🌐 Base API URL
const BASE_URL = "http://127.0.0.1:8000"; // Match your FastAPI backend

//
// 🔐 LOGIN
//
export const login = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || "Login failed");
    }

    return await res.json(); // Expected: { access_token, token_type, username }
  } catch (error) {
    console.error("Login error:", error);
    return { detail: error.message || "Error connecting to backend" };
  }
};

//
// 🧾 SIGNUP
//
export const signup = async (email, username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }), // ✅ match FastAPI model
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || "Registration failed");
    }

    return await res.json(); // Expected: { message: "Account created successfully" }
  } catch (error) {
    console.error("Signup error:", error);
    return { detail: error.message || "Error connecting to backend" };
  }
};

//
// 👤 GET USER PROFILE (optional, if backend supports it)
//
export const getProfile = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || "Failed to fetch profile");
    }

    return await res.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    return { detail: error.message || "Error connecting to backend" };
  }
};

//
// 🚪 LOGOUT (optional if you implement it later)
//
export const logout = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || "Logout failed");
    }

    return await res.json();
  } catch (error) {
    console.error("Logout error:", error);
    return { detail: error.message || "Error connecting to backend" };
  }
};
