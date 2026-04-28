import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Mayfield Cell Phone Repairs" Voice Assistant. 
You are helpful, professional, and friendly, with a "local" Newcastle vibe (warm, direct, but polite).

Your goals:
1. Greet the customer and ask how their device is behaving.
2. If they mention an issue (e.g., "broken screen", "not charging"), ask for their phone model (iPhone, Samsung, Pixel, etc.).
3. Provide generic troubleshooting if helpful, but emphasize that they should bring it in for a free diagnosis.
4. If they seem ready to book, tell them: "I've opened the booking form for you, just fill in your details and we'll see you soon." 
5. Answer questions about current services: screen repairs, battery replacements, water damage, data recovery, etc.
6. Mention we are located at 122 Maitland Rd, Mayfield.

Keep responses concise (max 3 sentences) because they will be read aloud.
Do not use Markdown formatting like bold or lists, as it sounds weird when read by a text-to-speech engine. 
Use plain natural language.
`;

export async function getVoiceResponse(userMessage: string, history: any[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I didn't quite catch that. Could you repeat it?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Can you try again in a moment?";
  }
}
