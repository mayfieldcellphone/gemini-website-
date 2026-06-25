import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { brands } from "./src/data/brands";
import { servicesData } from "./src/data/services";

dotenv.config();

// Email transporter (configured by user in .env)
const createTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Hostinger and some providers need this for self-signed or specific certs
    tls: {
      rejectUnauthorized: false
    }
  });
};

// CRM Integration Utility (Charla / RepairBill Pro / Zapier)
const syncLeadToCRM = async (type: string, data: any) => {
  const charlaApiKey = process.env.CHARLA_API_KEY;
  const repairBillApiKey = process.env.REPAIRBILL_API_KEY;
  const repairBillEndpoint = process.env.REPAIRBILL_API_ENDPOINT;
  const repairBillConnectionId = process.env.REPAIRBILL_CONNECTION_ID || "rb_pnmbf4k93gnxlr3501rw9";
  const webhookUrl = process.env.WEBHOOK_URL;
  
  const apiKey = repairBillApiKey || charlaApiKey;
  
  // If no API key and no connection ID and no webhook, we can't sync
  if (!apiKey && !webhookUrl && !repairBillConnectionId) return;

  // Determine endpoint: prefer Webhook if set, else RepairBill Connection, else RepairBill API, else Charla
  const rawApiBase = process.env.REPAIRBILL_API_BASE || "https://repairbill-erp-302106920849.asia-southeast1.run.app";
  // Ensure apiBase is a valid URL starting with http
  const apiBase = rawApiBase.startsWith("http") ? rawApiBase.replace(/\/$/, "") : "https://repairbill-erp-302106920849.asia-southeast1.run.app";

  let endpoint = webhookUrl 
    ? webhookUrl
    : repairBillConnectionId
    ? `${apiBase}/api/web-connection/${repairBillConnectionId}`
    : repairBillApiKey 
    ? (repairBillEndpoint || `${apiBase}/api/leads`)
    : "https://app.charla.com/api/leads";

  // Override if specifically requested for repairbill.shop / ERP
  if (repairBillConnectionId && !webhookUrl) {
    endpoint = `${apiBase}/api/web-connection/${repairBillConnectionId}`;
  }

  try {
    const formattedMessage = type === 'booking' 
      ? `Booking: ${data.brand} ${data.model} for ${data.service} on ${data.date} at ${data.time}. Info: ${data.details || 'None'}`
      : type === 'quote'
      ? `Quote Request: ${data.details}`
      : type === 'corporate'
      ? `Corporate Inquiry from ${data.companyName}: ${data.message}`
      : type === 'voice_message'
      ? `Voice Message from ${data.customerName} (${data.duration}s). Listen in Dashboard.`
      : `Lead from ${type}: ${JSON.stringify(data)}`;

    const payload = {
      name: data.customerName || data.name || data.contactName,
      email: data.email,
      phone: data.phone,
      message: formattedMessage,
      source: "mayfield_repair_website",
      connectionId: repairBillConnectionId,
      metadata: {
        type,
        origin: "AI Studio Build",
        timestamp: new Date().toISOString(),
        ...data
      }
    };

    console.log(`Syncing lead [${type}] to CRM/Webhook (${endpoint})`);
    
    // If it's a generic webhook (like Make/Zapier), it might not need Bearer auth
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (apiKey && !webhookUrl) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CRM/Webhook Sync Failed (${response.status}):`, errorText);
    } else {
      console.log(`CRM/Webhook Sync Successful!`);
    }
  } catch (err) {
    console.error("CRM/Webhook Sync Error:", err);
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Consolidated Notification Endpoint (SMS + Email)
  app.post("/api/notify", async (req, res) => {
    try {
      const { type, data } = req.body;
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "support@mayfieldphonerepair.com.au";
      const ragAdviseEmail = process.env.RAGADVISE_EMAIL;
      
      // Combine recipients
      const recipients = [adminEmail];
      if (ragAdviseEmail) recipients.push(ragAdviseEmail);
      
      const to = recipients.join(", ");
      
      let adminNumber = process.env.ADMIN_PHONE_NUMBER || "0431618100";

      let message = "";
      let subject = "";
      let htmlContent = "";

      if (type === "booking") {
        subject = `📅 NEW BOOKING: ${data.customerName}`;
        message = `NEW BOOKING: ${data.customerName} (${data.phone}) - ${data.service || 'Repair'} on ${data.date} at ${data.time}. Details: ${data.details || 'None'}`;
        htmlContent = `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #2563eb;">New Online Booking</h2>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
            <p><strong>Service:</strong> ${data.brand || ''} ${data.model || ''} - ${data.service || 'General'}</p>
            <p><strong>Time:</strong> ${data.date} at ${data.time}</p>
            <p><strong>Details:</strong> ${data.details || 'No extra info'}</p>
          </div>
        `;
      } else if (type === "quote") {
        subject = `💰 NEW REPAIR QUOTE: ${data.name}`;
        message = `NEW QUOTE: ${data.name} (${data.phone}) - ${data.details}.`;
        htmlContent = `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #2563eb;">New Quote Request</h2>
            <p><strong>Customer:</strong> ${data.name}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Details:</strong> ${data.details}</p>
          </div>
        `;
      } else if (type === "corporate") {
        subject = `🏢 NEW CORPORATE LEAD: ${data.organization || data.companyName}`;
        message = `NEW CORP LEAD: ${data.organization || data.companyName} - ${data.contactName} (${data.phone})`;
        htmlContent = `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #6366f1;">New B2B Lead</h2>
            <p><strong>Company:</strong> ${data.organization || data.companyName}</p>
            <p><strong>Contact:</strong> ${data.contactName}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Message:</strong> ${data.message}</p>
          </div>
        `;
      } else if (type === "chat") {
        subject = `💬 NEW CHAT STARTED: ${data.customerName}`;
        message = `NEW CHAT: ${data.customerName} has just started a live chat session.`;
        htmlContent = `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #0ea5e9;">New Live Chat Session</h2>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p>Someone is waiting for a response in the Admin Dashboard!</p>
          </div>
        `;
      } else if (type === "voice_message") {
        subject = `🎙️ NEW VOICE MESSAGE: ${data.customerName}`;
        message = `NEW VOICE MESSAGE: ${data.customerName} (${data.phone}) has left a recorded message for you.`;
        htmlContent = `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #f59e0b;">New Voice Message Received</h2>
            <p><strong>Customer:</strong> ${data.customerName}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Duration:</strong> ${data.duration} seconds</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p>You can listen to this recording in your <strong>RepairBill Pro Dashboard</strong>.</p>
          </div>
        `;
      }

      // 1. Send SMS (Removed)
      
      // 2. Send Email (if configured)
      if (process.env.SMTP_USER && process.env.SMTP_PASS && htmlContent) {
        try {
          const transporter = createTransporter();
          await transporter.sendMail({
            from: `"Mayfield Repair System" <${process.env.SMTP_USER}>`,
            to: to,
            subject: subject,
            html: htmlContent
          });
          console.log("Email notification sent for", type);
        } catch (err) {
          console.error("Email notification error:", err);
        }
      }

      res.json({ success: true });
      
      // Async sync to CRM
      syncLeadToCRM(type, data);
    } catch (error) {
      console.error("Notification Error:", error);
      res.status(500).json({ success: false, error: "Failed to send notifications" });
    }
  });

  // Lead Capture API for AI Agents
  app.post("/api/ai-leads", async (req, res) => {
    const { name, contact, device, issue, message } = req.body;

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "mayfieldcellphonerepairs@gmail.com";
    const ragAdviseEmail = process.env.RAGADVISE_EMAIL;
    const to = ragAdviseEmail ? `${adminEmail}, ${ragAdviseEmail}` : adminEmail;

    try {
      const transporter = createTransporter();
      const mailOptions = {
        from: process.env.SMTP_USER || "noreply@mayfieldphonerepair.com.au",
        to: to,
        subject: `New AI Agent Lead: ${name}`,
        html: `
          <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2563eb;">New Repair Lead from AI Assistant</h2>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Contact Info:</strong> ${contact}</p>
            <p><strong>Device:</strong> ${device || "Not specified"}</p>
            <p><strong>Issue:</strong> ${issue || "Not specified"}</p>
            <p><strong>Summary/Message:</strong> ${message || "N/A"}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">This lead was captured by your ElevenLabs AI Agent.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      
      // Sync to CRM
      syncLeadToCRM('ai-lead', { name, contactName: name, phone: contact, brand: device, issue, message });
      
      res.json({ success: true, message: "Lead sent to inbox" });
    } catch (error) {
      console.error("Error sending AI lead:", error);
      res.status(500).json({ error: "Failed to send lead" });
    }
  });

  app.post("/api/voice-lead", async (req, res) => {
    const { name, phone, email, brand, model, issue, dateTime } = req.body;

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "mayfieldcellphonerepairs@gmail.com";
    const ragAdviseEmail = process.env.RAGADVISE_EMAIL;
    const to = ragAdviseEmail ? `${adminEmail}, ${ragAdviseEmail}` : adminEmail;

    try {
      const transporter = createTransporter();
      const mailOptions = {
        from: process.env.SMTP_USER || "noreply@mayfieldphonerepair.com.au",
        to: to,
        subject: `🎙️ Voice Booking: ${name}`,
        html: `
          <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 10px; background-color: #f8fafc;">
            <h2 style="color: #2563eb;">Captured Voice Booking</h2>
            <p><strong>Customer:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || "N/A"}</p>
            <p><strong>Device:</strong> ${brand} ${model}</p>
            <p><strong>Issue:</strong> ${issue}</p>
            <p><strong>Preferred Time:</strong> ${dateTime}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 10px; color: #94a3b8; font-style: italic;">Transcribed and synced by Mayfield Gemini Assistant</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      
      // Sync to CRM
      syncLeadToCRM('booking', { customerName: name, phone, email, brand, model, issue, dateTime });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending voice lead:", error);
      res.status(500).json({ error: "Failed to send voice lead" });
    }
  });

  // Repair Facts API for AI Agents
  app.get("/api/repair-facts", (req, res) => {
    res.json({
      shopName: "Mayfield Phone Repair",
      location: "Mayfield, Newcastle, NSW",
      address: "276 Maitland Rd, Mayfield NSW 2304",
      turnaround: "30-60 minutes for most repairs",
      warranty: "90-day guarantee on all parts and labor",
      afterHours: "Strictly via Text: 0431 618 100",
      quoteProcess: "Text 0431 618 100 for direct quotes",
      brands: brands.map(b => ({
        name: b.name,
        startingPriceScreen: b.startingPrice.screen,
        startingPriceBattery: b.startingPrice.battery,
        models: b.deviceCategories.flatMap(cat => cat.models).slice(0, 10) // Small sample for context
      })),
      services: servicesData.map(s => ({
        title: s.title,
        description: s.shortDesc
      }))
    });
  });

  // Explicitly serve sitemap.xml and robots.txt
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'public', 'sitemap.xml');
    res.header('Content-Type', 'application/xml');
    res.sendFile(sitemapPath);
  });

  app.get('/robots.txt', (req, res) => {
    const robotsPath = path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'public', 'robots.txt');
    res.header('Content-Type', 'text/plain');
    res.sendFile(robotsPath);
  });

  // Legacy SEO Redirects (301 Permanent)
  const legacyRedirects: Record<string, string> = {
    '/book-repair': '/quote',
    '/products': '/accessories',
    '/tag/cost-of-screen-repairs/': '/blog',
    '/contact': '/quote',
    '/contact-us': '/quote',
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
