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
