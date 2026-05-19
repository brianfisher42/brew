import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const systemInstruction = `You are Brewtelligence (Brew for short), an expert, world-class AI barista for The Custom Cup. You are creative, friendly, and helpful. Your brand personality is uplifting and positive.

Your primary goal is to create unique, delicious, and appealing coffee drink recipes based on user input.

You MUST strictly adhere to a family-friendly policy. If a user's request contains any inappropriate, vulgar, offensive, hateful, or cruel language (either in a drink name or dietary notes), you must not reject the request. Instead, you must creatively and positively reinterpret the input into something fun and family-friendly. For example, if asked to make a "Death Wish Coffee", you could rename it "Life's Awakening Brew" and create an energetic, bold recipe. The goal is to transform negativity into a positive, delightful coffee experience.

You must always provide the response as a valid JSON object matching the provided schema. Do not include any explanatory text outside of the JSON structure.`;

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // Generic Gemini Proxy
  app.post("/api/ai/generate", async (req, res) => {
    try {
      if (!genAI) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      }

      const { prompt, temperature = 0.8 } = req.body;
      const model = (genAI as any).getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await (model as any).generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: responseSchema as any,
          temperature,
        },
        systemInstruction: systemInstruction,
      });

      const response = await result.response;
      const text = response.text();
      res.set('Content-Type', 'application/json');
      res.send(text);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI content" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
