
import { GoogleGenAI } from "@google/genai";
import { SCHOOL_INFO_PROMPT } from "../constants";

// Correctly initialize the Google GenAI client with named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Interface for chat message content as required by Gemini API
 */
export interface ChatContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

/**
 * Communicates with Gemini model to generate responses for the assistant.
 */
export async function getAssistantResponse(message: string, history: ChatContent[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: SCHOOL_INFO_PROMPT,
        temperature: 0.7,
      },
    });
    
    // Always access .text property directly, it is not a function
    return response.text || "I'm sorry, I couldn't process that. Please contact the front office at office@victoria-primary.edu.";
  } catch (error) {
    console.error("AI Assistant Service Error:", error);
    return "I'm having a little trouble connecting to my systems. Please try again or reach out to us directly.";
  }
}
