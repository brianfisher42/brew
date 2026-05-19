/**
 * server.ts
 * 
 * Express server that provides the backend API for Brewtelligence.
 * Handles AI-powered drink recipe generation using Google's Gemini API
 * and serves the frontend application in both development and production modes.
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

/**
 * System instruction that defines Brewtelligence's AI personality and behavior.
 * The AI acts as a friendly, creative barista that:
 * - Creates unique coffee recipes based on user preferences
 * - Maintains a family-friendly atmosphere
 * - Transforms negative/inappropriate requests into positive alternatives
 */
const systemInstruction = `You are Brewtelligence (Brew for short), an expert, world-class AI barista for The Custom Cup. You are creative, friendly, and helpful. Your brand personality is uplifting and positive.

Your primary goal is to create unique, delicious, and appealing coffee drink recipes based on user input.

You MUST strictly adhere to a family-friendly policy. If a user's request contains any inappropriate, vulgar, offensive, hateful, or cruel language (either in a drink name or dietary notes), you must not reject the request. Instead, you must creatively and positively reinterpret the input into something fun and family-friendly. For example, if asked to make a "Death Wish Coffee", you could rename it "Life's Awakening Brew" and create an energetic, bold recipe. The goal is to transform negativity into a positive, delightful coffee experience.

You must always provide the response as a valid JSON object matching the provided schema. Do not include any explanatory text outside of the JSON structure.`;

/**
 * JSON schema that defines the structure of AI-generated drink recipes.
 * This schema is passed to Gemini to ensure consistent, structured responses.
 * Maps directly to the CoffeeDrink interface in types.ts.
 */
const responseSchema = {
  type: "object",
  properties: {
    recipeName: {
      type: "string",
      description: "A creative and appealing name for the coffee drink.",
    },
    description: {
      type: "string",
      description: "A short, cool, and enticing description of the drink, explaining its flavor profile and vibe.",
    },
    flavorProfile: {
      type: "string",
      description: "A short, fun, and descriptive summary of the drink's flavor profile (e.g., 'Sweet & Creamy', 'Bold & Nutty with a hint of spice')."
    },
    ingredients: {
      type: "array",
      items: {
        type: "string",
      },
      description: "A list of all ingredients required for the drink with their quantities.",
    },
    instructions: {
      type: "array",
      items: {
        type: "string",
      },
      description: "A list of step-by-step instructions to prepare the drink.",
    },
  },
  required: ["recipeName", "description", "flavorProfile", "ingredients", "instructions"],
};

/**
 * Initializes and starts the Express server.
 * Sets up API routes for AI generation and configures static file serving.
 */
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON body parsing for API requests
  app.use(express.json());

  // Initialize Google Gemini AI client (if API key is available)
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

  /**
   * POST /api/ai/generate
   * 
   * AI recipe generation endpoint that proxies requests to Google Gemini.
   * Accepts a prompt and optional temperature parameter, returns a structured
   * coffee drink recipe as JSON.
   * 
   * Request body:
   * - prompt: string - The user's drink request/preferences
   * - temperature: number (optional, default 0.8) - AI creativity level (0-1)
   * 
   * Response: CoffeeDrink JSON object
   */
  app.post("/api/ai/generate", async (req, res) => {
    try {
      // Check if Gemini API is configured
      if (!genAI) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      // Extract parameters from request body
      const { prompt, temperature = 0.8 } = req.body;
      
      // Get the Gemini 1.5 Flash model for fast, efficient generation
      const model = (genAI as any).getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content with structured JSON output
      const result = await (model as any).generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json", // Force JSON output
          responseSchema: responseSchema as any, // Enforce response structure
          temperature, // Control creativity/randomness
        },
        systemInstruction: systemInstruction, // AI personality and rules
      });

      // Extract and return the generated text response
      const response = await result.response;
      const text = response.text();
      res.set('Content-Type', 'application/json');
      res.send(text);
    } catch (error: any) {
      // Log and return any errors that occur during generation
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI content" });
    }
  });

  // Configure development vs production serving
  if (process.env.NODE_ENV !== "production") {
    /**
     * Development mode: Use Vite's middleware for hot module replacement (HMR)
     * This provides instant updates when source files change
     */
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    /**
     * Production mode: Serve the pre-built static files from /dist
     * All routes fall back to index.html for client-side routing
     */
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start the server and listen on all network interfaces
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Initialize the server
startServer();
