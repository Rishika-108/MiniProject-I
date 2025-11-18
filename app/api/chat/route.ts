
// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req: Request) {
//   try {
//     const { message } = await req.json();

//     if (!message) {
//       return NextResponse.json({ reply: "No message provided" }, { status: 400 });
//     }

//     const genAI = new GoogleGenerativeAI("AIzaSyAXytjlkWqtEo6sd4juU3sm3XmnVnFPx_E");

//     const model = genAI.getGenerativeModel({
//       model: "gemini‑2.5‑flash",
//     });

//     const result = await model.generateContent(message);
//     const reply = result.response.text();

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return NextResponse.json({ reply: "Error contacting AI model" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// const API_KEY = "AIzaSyAXytjlkWqtEo6sd4juU3sm3XmnVnFPx_E"
const API_KEY = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);

// ------------------------------------------------------
// GET → List available models (REST API)
// ------------------------------------------------------
export async function GET() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    // Only show relevant info
    const models = data.models?.map((m: any) => ({
      name: m.name,
      displayName: m.displayName,
      supportedGenerationMethods: m.supportedGenerationMethods,
    }));

    return NextResponse.json({ models });
  } catch (error: any) {
    console.error("List Models Error:", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to list models" },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------
// POST → Generate response using Gemini
// ------------------------------------------------------
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "No message provided" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // ✅ valid model
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { reply: error.message ?? "Error contacting AI model" },
      { status: 500 }
    );
  }
}
