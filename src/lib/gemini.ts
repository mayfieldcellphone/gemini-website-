export async function getVoiceResponse(userMessage: string, history: any[] = []) {
  try {
    const response = await fetch('/api/voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history })
    });

    if (!response.ok) {
      throw new Error('Server returned an error');
    }

    const data = await response.json();
    return data.text || "I'm sorry, I didn't quite catch that. Could you repeat it?";
  } catch (error) {
    console.error("Gemini Frontend Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Can you try again in a moment?";
  }
}
