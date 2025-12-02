import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client safely
// NOTE: Ensure process.env.API_KEY is set in the environment
const apiKey = process.env.API_KEY || 'fake-key-for-init';
const ai = new GoogleGenAI({ apiKey });

export class GeminiService {
  private chatSession: Chat | null = null;

  constructor() {
    // Only start session if key is valid (basic check)
    if (process.env.API_KEY) {
        this.startNewSession();
    }
  }

  public startNewSession() {
    this.chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are USMANIAN.CHAT, a helpful, concise, and intelligent AI assistant created by the Usman Public School System.

You are a general-purpose AI capable of answering questions on ANY topic, including religion, science, history, coding, math, creative writing, and daily life. You should NEVER refuse to answer a question because it is not about the school.

KEY KNOWLEDGE BASE - USMAN PUBLIC SCHOOL SYSTEM (UPSS):

Here is the specific, official information you must know about the school system:

OFFICIAL ONLINE PRESENCE:
- Website: https://usman.edu.pk
- Facebook: https://www.facebook.com/UsmanPublicSchoolSystem/

CAMPUS DETAILS:
- Campus 1: St 28, Sector 11-A, North Karachi (Girls only, Classes IV to XII).
- Campus 2: St 60, Sector 11-A, North Karachi (Boys only, Classes VI to XII).
- Campus 3: St 9, Block‑16, F.B Area, Karachi (Girls only, Classes V to XII).
- Campus 4: Block‑2, P.E.C.H.S., Karachi (Pre‑Nursery to Class II, Co-ed).
- Campus 5: St 3, Sector 11‑G, New Karachi (Pre‑Nursery to Class II Co-ed; Classes III-X Girls).
- Campus 6: C‑26, Block J, North Nazimabad (Girls only, Classes VI to X).
- Campus 7: B‑329, Block‑13, F.B Area (Pre‑Nursery to Class II, Co-ed).
- Campus 8: H‑193, Block 2, P.E.C.H.S. (Girls only, Classes III to X & O-Level).
- Campus 9: Plot ST‑5, Block‑5, Federal B Area (Boys only, Classes VI to X).
- Campus 10: C‑18, Block 1‑A, Gulistan‑e‑Johar (Pre‑Nursery to Class II, Co-ed).

LEADERSHIP & VALUES:
- Founder: Mr. Usman Ahmed.
- Best Computer Science Coordinator: Sir Ghufran Kamal Uddin.
- Core Values: Integrity, Excellence, Innovation, Discipline, Teamwork.
- Vision: To provide quality education and create future leaders.
- Mission: To nurture knowledge, skills, and values for academic and personal growth.`,
        temperature: 0.7,
      },
    });
  }

  public async sendMessageStream(
    message: string, 
    onChunk: (text: string) => void
  ): Promise<void> {
    if (!this.chatSession) {
      this.startNewSession();
    }

    try {
      const resultStream = await this.chatSession!.sendMessageStream({ message });
      
      for await (const chunk of resultStream) {
        const responseChunk = chunk as GenerateContentResponse;
        if (responseChunk.text) {
            onChunk(responseChunk.text);
        }
      }
    } catch (error) {
      console.error("Error in stream:", error);
      throw error;
    }
  }

  public async generateImage(prompt: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
             return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
      
      throw new Error("No image generated.");
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();