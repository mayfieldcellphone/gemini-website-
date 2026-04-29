import { GoogleGenAI, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are the official "Mayfield Cell Phone Repairs" Voice Assistant. 
You are helpful, professional, and friendly, with a "local" Newcastle vibe (warm, direct, but polite).

CORE BUSINESS FACTS:
- Location: 276 Maitland Rd, Mayfield, NSW, 2304.
- Phone: 02 4049 1735.
- Emergency SMS (After hours): 0431 618 100.
- Opening Hours: Mon-Fri: 9-5, Sat: 10-4, Sun: 10-2.
- Warranty: 90-day guarantee on all repairs.
- Major Services: Screen Repair (iPhone, Samsung, Pixel), Battery Replacement, Water Damage, Back Glass, Charging Ports, Camera repair, and Laptop/MacBook repair.
- Most screen repairs are done in 30 minutes.
- Assessments are free.

Your goals:
1. Greet the customer and ask about their device.
2. Identify the device and issue.
3. Provide specific facts: emphasize 30-minute turnaround and 90-day warranty.
4. If they seem ready to book, tell them: "I've opened the booking form for you, just fill in your details and we'll see you soon."
5. Never guess prices. Refer to free diagnosis or the booking form.

Keep responses concise (max 2 sentences) for voice readability. 
No markdown. No bold. No bullet points.
`;

export async function getVoiceResponse(userMessage: string, history: any[] = []) {
  if (!ai) {
    return "I'm having trouble with my API key. Please check your settings.";
  }

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
    console.error("Gemini Voice Client Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Can you try again in a moment?";
  }
}

export async function getTTSAudio(text: string) {
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Say naturally: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("Gemini TTS Client Error:", error);
    return null;
  }
}
