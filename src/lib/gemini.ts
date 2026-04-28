export async function getVoiceResponse(userMessage: string, history: any[] = []) {
  try {
    const response = await fetch('/api/voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history })
    });

    if (!response.ok) {
      throw new Error(`Server status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "I'm sorry, I didn't quite catch that. Could you repeat it?";
  } catch (error) {
    console.error("Gemini Voice Client Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Can you try again in a moment?";
  }
}

export async function getTTSAudio(text: string) {
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.audio || null;
  } catch (error) {
    console.error("Gemini TTS Client Error:", error);
    return null;
  }
}
