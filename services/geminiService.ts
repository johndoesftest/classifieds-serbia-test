import { GoogleGenAI } from "@google/genai";

// Refactor: Align Gemini API initialization with coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDescription = async (keywords: string): Promise<string> => {
  const prompt = `
    You are an expert copywriter for a Serbian classifieds website.
    Your task is to write a compelling, clear, and professional-sounding ad description in Serbian (latin script).
    The description should be well-structured, easy to read, and highlight the key features of the item.
    Use paragraphs for structure. Do not use markdown.

    Based on the following keywords, create a great ad description:
    Keywords: "${keywords}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 300,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    throw new Error("Failed to generate description.");
  }
};