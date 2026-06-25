# AI Training Guide - Mayfield Phone Repair

This guide explains how to train your AI agents (Charla Chat Widget and ElevenLabs Voice Assistant).

## 💬 1. Training Charla (Chat Widget)
Charla is trained by providing a **Knowledge Base** in the Charla Dashboard.

1. **Log in** to your Charla Dashboard: [https://app.charla.com](https://app.charla.com)
2. **Go to "Knowledge" or "Training"** section.
3. **Upload Data:** You can paste text or upload documents (PDF/CSV).
4. **Recommended Training Content:**
   - Your current Price List (iPhone screen prices, etc.)
   - Common FAQ (Do you fix iPads? How long does it take?)
   - Store policies (90-day warranty, data safety).

**Can I help?**
Yes! If you provide me with a list of your prices and services, I can generate a structured **FAQ.txt** file for you that you can simply copy-paste into the Charla dashboard.

---

## 🎙️ 2. Training ElevenLabs (Voice Assistant)
The voice assistant is trained via its **System Prompt** and **Tools**.

1. **Instructions:** Currently, your most up-to-date instructions are in `ELEVENLABS_INSTRUCTIONS.md`. 
2. **Dashboard:** Log in to [https://elevenlabs.io](https://elevenlabs.io) to update the agent's behavior.
3. **Voice Selection:** You can choose a different voice or adjust the "Alex" persona stability.

---

## 🛠️ 3. RepairBill Pro Integration
If your leads are still going to the old admin dashboard, please ensure you have configured the following in your **AI Studio Settings (Secrets)**:

1. `REPAIRBILL_API_KEY`: Your API key from RepairBill Pro.
2. `ADMIN_NOTIFICATION_EMAIL`: Set this to `leads@repairbill.app` (or your specific RepairBill lead email).

Once these are set, the new website will automatically start POSTing leads to the RepairBill Pro dashboard instead of just sending them to your old admin email.
