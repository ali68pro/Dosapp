
import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export const startChatSession = (): Chat => {
    const client = getAIClient();
    const chat = client.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful and friendly assistant. Keep your responses concise and informative.',
        },
    });
    return chat;
};
