import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { blogPosts } from '../src/data/blogs';

dotenv.config();

const TARGET_EMAIL = 'engrkhalil77@gmail.com';
const TODAY = new Date().toISOString().split('T')[0];
const LOG_FILE = path.join(process.cwd(), 'notified-blogs.json');

async function runNotifier() {
  console.log(`🔍 Checking for newly published blog posts up to ${TODAY}...`);

  let notifiedIds: string[] = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      notifiedIds = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
    } catch {
      notifiedIds = [];
    }
  }

  const newlyPublished = blogPosts.filter(
    post => post.date <= TODAY && !notifiedIds.includes(post.id)
  );

  if (newlyPublished.length === 0) {
    console.log(`✅ No new unnotified published blogs found for ${TODAY}.`);
    return;
  }

  console.log(`📩 Found ${newlyPublished.length} newly published blog post(s) to notify.`);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false }
  });

  const newlyNotified: string[] = [];

  for (const post of newlyPublished) {
    const liveUrl = `https://mayfieldphonerepair.com.au/blog/${post.slug}`;
    console.log(`📧 Sending notification for: "${post.title}" (${liveUrl}) to ${TARGET_EMAIL}`);

    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@mayfieldphonerepair.com.au',
      to: TARGET_EMAIL,
      subject: `🚀 New Blog Published: ${post.title}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="background-color: #2563eb; padding: 16px 24px; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800;">Mayfield Repair Blog Update</h1>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 0;">A new scheduled blog post is now published and live on your website:</p>
          
          <h2 style="font-size: 22px; color: #0f172a; margin: 16px 0 8px 0; font-weight: 700;">${post.title}</h2>
          <p style="font-size: 12px; color: #3b82f6; font-weight: 700; text-transform: uppercase; tracking: 1px; margin-bottom: 16px;">Published Date: ${post.date}</p>
          
          <p style="font-size: 15px; color: #334155; line-height: 1.6; background-color: #f8fafc; padding: 16px; border-left: 4px solid #2563eb; border-radius: 6px; margin-bottom: 24px;">${post.excerpt}</p>
          
          <div style="margin-bottom: 24px;">
            <strong style="font-size: 13px; color: #475569;">Targeted SEO Tags:</strong>
            <p style="margin: 4px 0 0 0;">
              ${post.tags.map(t => `<span style="display: inline-block; background-color: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; margin-right: 6px;">#${t}</span>`).join('')}
            </p>
          </div>

          <div style="text-align: center; margin: 32px 0 16px 0;">
            <a href="${liveUrl}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 14px;">View Live Article</a>
          </div>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">Automated publication notification sent to ${TARGET_EMAIL} | Mayfield Phone Repair SEO Engine</p>
        </div>
      `
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${TARGET_EMAIL}`);
      } catch (err) {
        console.error(`❌ Error sending email for ${post.id}:`, err);
      }
    } else {
      console.log(`ℹ️ SMTP credentials not detected in .env. Email dispatch simulated.`);
    }

    newlyNotified.push(post.id);
  }

  const updatedList = Array.from(new Set([...notifiedIds, ...newlyNotified]));
  fs.writeFileSync(LOG_FILE, JSON.stringify(updatedList, null, 2));
  console.log(`🎉 Logged ${newlyNotified.length} blog post(s) into ${LOG_FILE}.`);
}

runNotifier().catch(err => {
  console.error("❌ Notifier crashed:", err);
});
