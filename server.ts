import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import twilio from "twilio";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";

dotenv.config();

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Gemini AI Voice Endpoint
  app.post("/api/voice", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key not configured on server" });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash", // Using stable model for production
        contents: [
          ...history,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini Voice Server Error:", error);
      res.status(500).json({ error: "AI failed to respond" });
    }
  });

  // Gemini TTS Endpoint
  app.post("/api/tts", async (req, res) => {
    try {
      const { text } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) return res.status(500).json({ error: "API key missing" });

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash", // Using 1.5 flash for TTS if possible or fallback
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
      if (base64Audio) {
        res.json({ audio: `data:audio/wav;base64,${base64Audio}` });
      } else {
        res.status(404).json({ error: "No audio generated" });
      }
    } catch (error) {
      console.error("Gemini TTS Server Error:", error);
      res.status(500).json({ error: "TTS failed" });
    }
  });
  
  // Twilio SMS Endpoint
  app.post("/api/notify", async (req, res) => {
    try {
      const { type, data } = req.body;
      
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_FROM_NUMBER;
      let adminNumber = process.env.ADMIN_PHONE_NUMBER || "0431618100";

      // Format Australian phone numbers to E.164 if they start with 04 or 02
      const formatToE164 = (num: string) => {
        const clean = num.replace(/\s+/g, '');
        if (clean.startsWith('0') && !clean.startsWith('00')) {
          return '+61' + clean.substring(1);
        }
        return clean.startsWith('+') ? clean : `+61${clean}`;
      };

      if (!accountSid || !authToken || !fromNumber) {
        console.warn("Twilio credentials not configured. SMS not sent.");
        return res.json({ success: false, message: "Twilio not configured" });
      }

      const client = twilio(accountSid, authToken);
      
      let message = "";
      if (type === "booking") {
        message = `NEW BOOKING: ${data.customerName} (${data.phone}) - ${data.service || 'Repair'} on ${data.date} at ${data.time}. Details: ${data.details || 'None'}`;
      } else if (type === "quote") {
        message = `NEW QUOTE: ${data.name} (${data.phone}) - ${data.details}.`;
      } else if (type === "corporate") {
        message = `NEW CORP LEAD: ${data.companyName} - ${data.contactName} (${data.phone})`;
      }

      const response = await client.messages.create({
        body: message,
        from: formatToE164(fromNumber),
        to: formatToE164(adminNumber)
      });

      console.log("SMS sent successfully:", response.sid);
      res.json({ success: true, sid: response.sid });
    } catch (error) {
      console.error("Twilio SMS Error:", error);
      // We return 200 even on error so the frontend doesn't crash, but log the error
      res.status(500).json({ success: false, error: "Failed to send SMS" });
    }
  });

  // Legacy SEO Redirects (301 Permanent)
  const legacyRedirects: Record<string, string> = {
    '/book-repair': '/#contact',
    '/products': '/accessories',
    '/tag/cost-of-screen-repairs/': '/blog',
    '/contact': '/#contact',
    '/about': '/about',
    '/apple-repair/macbook-repair': '/service/laptop-macbook-repair',
    '/newcastle-phone-repair': '/newcastle',
    '/phone-repair-adamstown-nsw': '/service/iphone-screen-repair/adamstown',
    '/maitland-phone-repair': '/maitland',
    '/hamilton-north-phone-repair': '/hamilton-north',
    '/shop-accessories': '/accessories',
    '/services/charging-port-repair-mayfield': '/service/charging-port-repair/mayfield',
    '/broadmeadow-phone-repair': '/broadmeadow',
    '/camera-replacement': '/service/camera-replacement',
    '/services/phone-battery-replacement-mayfield': '/service/battery-replacement/mayfield',
    '/services': '/#services',
    '/services/iphone-screen-repair-mayfield': '/service/iphone-screen-repair/mayfield',
    '/laptop-macbook-repair': '/service/laptop-macbook-repair',
    '/new-lambton-phone-repair': '/new-lambton',
    '/services/water-damage-repair-mayfield': '/service/water-damage-repair/mayfield',
    '/the-complete-guide-to-iphone-back-glass/': '/blog'
  };

  Object.entries(legacyRedirects).forEach(([oldPath, newPath]) => {
    app.get(oldPath, (req, res) => {
      res.redirect(301, newPath);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
