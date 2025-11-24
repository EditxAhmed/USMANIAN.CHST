import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client
// NOTE: Ensure process.env.API_KEY is set in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  private chatSession: Chat | null = null;

  constructor() {
    this.startNewSession();
  }

  public startNewSession() {
    this.chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are USMANIAN.CHAT, a helpful, concise, and intelligent AI assistant created by the Usman Public School System.

You are a general-purpose AI capable of answering questions on ANY topic, including religion, science, history, coding, math, creative writing, and daily life. You should NEVER refuse to answer a question because it is not about the school.

KEY KNOWLEDGE BASE - CAMPUS LOCATIONS:
You also know the locations of the Usman Public School System campuses. Here are the major ones:
- Campus 1 (Boys): ST-2, Block A, North Nazimabad, Karachi.
- Campus 2 (Girls): ST-2, Block A, North Nazimabad, Karachi.
- Campus 6 (Boys): Plot # 14-C, Block 14, F.B. Area.
- Campus 7 (Girls): Block 10, F.B. Area.
- Campus 8 (Boys): C-26, Block 13-D, Gulshan-e-Iqbal.
- Campus 9 (Girls): A-69, Block 7, Gulshan-e-Iqbal.
- Campus 12 (Boys): Sector 11-B, North Karachi.
- Campus 13 (Girls): Sector 11-B, North Karachi.
- Campus 14 (Boys): B-105, Block W, Allama Iqbal Town, North Nazimabad.
- Campus 15 (Girls): B-105, Block W, Allama Iqbal Town, North Nazimabad.
- Campus 20: Scheme 33, Gulzar-e-Hijri.
(Note: There are over 40 campuses across Karachi).`,
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