import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Twilio SMS Endpoint
  app.post("/api/notify", async (req, res) => {
    try {
      const { type, data } = req.body;
      
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_FROM_NUMBER;
      const adminNumber = process.env.ADMIN_PHONE_NUMBER || "0431618100";

      if (!accountSid || !authToken || !fromNumber) {
        console.warn("Twilio credentials not configured. SMS not sent.");
        return res.json({ success: false, message: "Twilio not configured" });
      }

      const client = twilio(accountSid, authToken);
      
      let message = "";
      if (type === "booking") {
        message = `NEW BOOKING: ${data.customerName} (${data.phone}) - ${data.serviceType} on ${data.date} at ${data.time}. Details: ${data.details || 'None'}`;
      } else if (type === "quote") {
        message = `NEW QUOTE: ${data.name} (${data.phone}) - ${data.details}. Brand: ${data.brand || 'N/A'}`;
      } else if (type === "corporate") {
        message = `NEW CORP LEAD: ${data.companyName} - ${data.contactName} (${data.phone})`;
      }

      const response = await client.messages.create({
        body: message,
        from: fromNumber,
        to: adminNumber
      });

      console.log("SMS sent successfully:", response.sid);
      res.json({ success: true, sid: response.sid });
    } catch (error) {
      console.error("Twilio SMS Error:", error);
      // We return 200 even on error so the frontend doesn't crash, but log the error
      res.status(500).json({ success: false, error: "Failed to send SMS" });
    }
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
