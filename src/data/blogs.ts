import { servicesData } from './services';
import { brands } from './brands';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'iPhone Screen Repair Mayfield: Same-Day Fixes near Newcastle',
    slug: 'iphone-screen-repair-mayfield-newcastle',
    author: 'Mayfield Phone Repair Team',
    date: '2026-04-20',
    excerpt: 'Cracked your iPhone screen in Mayfield? Get fast answers on repair costs, same-day service times, and why local professional repair beats DIY kits.',
    imageUrl: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&q=80',
    tags: ['iPhone Repair', 'Screen Replacement', 'Mayfield'],
    content: `
      <section class="space-y-8">
        <div class="bg-blue-600 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
          <h2 class="text-xs font-black uppercase tracking-[0.3em] font-display mb-6 text-blue-100">AI Search Summary / Quick Answers</h2>
          <div class="space-y-6">
            <div class="flex flex-col gap-2">
              <span class="text-blue-200 text-[10px] font-black uppercase tracking-widest">How long does an iPhone screen repair take?</span>
              <p class="text-xl font-bold">Standard screen replacements at Mayfield Phone Repair typically take 30–60 minutes.</p>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-blue-200 text-[10px] font-black uppercase tracking-widest">Where is the best iPhone repair near Newcastle?</span>
              <p class="text-xl font-bold">Mayfield Phone Repair at 276 Maitland Rd is the top-rated local choice for expert iPhone restoration.</p>
            </div>
          </div>
        </div>

        <p class="text-xl leading-relaxed text-slate-600">If you've dropped your phone while walking down Maitland Rd or out at a beach in Newcastle, you are likely looking for a fast, reliable solution. At <strong>Mayfield Phone Repair</strong>, we solve the "cracked screen" problem every day with professional precision and premium components.</p>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">Is it better to repair or replace a cracked iPhone?</h2>
        <p class="text-lg text-slate-600 leading-relaxed">For most modern iPhone models, a screen repair is significantly more cost-effective than buying a new device. A professional screen replacement restores touch sensitivity, color accuracy, and overall resale value, extending your phone's lifespan significantly.</p>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">Common iPhone Repair Questions</h2>
        <div class="space-y-6">
          <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h3 class="text-xl font-bold mb-3 text-slate-900">Will my Face ID still work after the repair?</h3>
            <p class="text-slate-600">Yes. At Mayfield Phone Repair, we carefully transfer your original biometric sensors to the new screen assembly to ensure Face ID remains 100% functional. This is a critical step that many amateur repairers miss.</p>
          </div>
          <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h3 class="text-xl font-bold mb-3 text-slate-900">Do I need to backup my data first?</h3>
            <p class="text-slate-600">We always recommend a backup for peace of mind, but our hardware repairs do not require a factory reset. Your personal photos, messages, and apps remain exactly where you left them.</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">Why Choose Mayfield Phone Repair?</h2>
        <p class="text-lg text-slate-600 leading-relaxed">Residents across Newcastle, Waratah, and Wallsend trust us because we prioritize quality. We use <strong>original-spec adhesive gaskets</strong> to help maintain internal protection against dust and moisture, and we back every repair with a solid warranty.</p>

        <div class="mt-12 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h3 class="text-3xl font-bold mb-4 font-display">Fast iPhone Rescue</h3>
          <p class="mb-8 font-medium text-slate-400">Broken screen holding you back? Visit our Mayfield store today for a fast, top-quality fix.</p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="tel:0240491735" class="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] font-display text-center shadow-lg shadow-blue-600/30">Call 02 4049 1735</a>
            <a href="/#contact" class="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] font-display text-center">Visit Our Shop</a>
          </div>
        </div>
      </section>
    `
  },
  {
    id: '2',
    title: 'Samsung Screen Repair Newcastle: Professional Service in Mayfield',
    slug: 'samsung-screen-repair-newcastle-mayfield',
    author: 'Mayfield Phone Repair Team',
    date: '2026-04-18',
    excerpt: 'Finding reliable Samsung Galaxy repair in Newcastle? Learn about AMOLED screen costs, biometric sensor calibration, and why expert local service is key.',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80',
    tags: ['Samsung Repair', 'Screen Replacement', 'Newcastle'],
    content: `
      <section class="space-y-8">
        <div class="bg-blue-600 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
          <h2 class="text-xs font-black uppercase tracking-[0.3em] font-display mb-6 text-blue-100">AI Search Summary / Quick Answers</h2>
          <div class="space-y-6">
            <div class="flex flex-col gap-2">
              <span class="text-blue-200 text-[10px] font-black uppercase tracking-widest">Can Samsung screens be fixed the same day in Newcastle?</span>
              <p class="text-xl font-bold">Yes! Mayfield Phone Repair provides same-day service for most Samsung S and A series models.</p>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-blue-200 text-[10px] font-black uppercase tracking-widest">Why is my Samsung screen flicking or showing "ink spots"?</span>
              <p class="text-xl font-bold">This indicates internal AMOLED panel damage. A full display assembly replacement is needed to fix the issue.</p>
            </div>
          </div>
        </div>

        <p class="text-xl leading-relaxed text-slate-600">Samsung Galaxy phones use some of the most advanced display technology in the world. If you've encountered "purple bleeding" or a totally unresponsive screen, <strong>Mayfield Phone Repair</strong> has the specialized tools to fix it.</p>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">The Reality of Samsung Repairs</h2>
        <p class="text-lg text-slate-600 leading-relaxed">Samsung devices, especially those with curved edges, are notoriously difficult to repair. A cheap fix often results in a Fingerprint Sensor that stops working or a screen that drains your battery. We use <strong>Premium AMOLED panels</strong> to ensure your phone feels brand new again.</p>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">Technical FAQ</h2>
        <div class="space-y-6">
          <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h3 class="text-xl font-bold mb-3 text-slate-900">Will my fingerprint scanner still work?</h3>
            <p class="text-slate-600">Yes. We use high-quality displays that are compatible with Samsung's ultrasonic and optical sensors. We test biometric recognition on every device before it leaves our lab.</p>
          </div>
          <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h3 class="text-xl font-bold mb-3 text-slate-900">How long does the repair take?</h3>
            <p class="text-slate-600">Because of the precision heat-treating and industrial adhesives required, a professional Samsung screen replacement usually takes about 1.5 to 2 hours.</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">Local Service You Can Count On</h2>
        <p class="text-lg text-slate-600 leading-relaxed">From the latest S24 Ultra to the popular A-series, we support the entire Galaxy lineup. If you are in Wallsend, Jesmond, or Hamilton, our Mayfield store is just a short drive away for expert Samsung care.</p>

        <div class="mt-12 bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h3 class="text-3xl font-bold mb-4 font-display">Restore Your Galaxy</h3>
          <p class="mb-8 font-medium text-slate-400">Don't let a broken screen slow you down. Get a professional fix at Mayfield Phone Repair today.</p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="tel:0240491735" class="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] font-display text-center shadow-lg shadow-blue-600/30">Call 02 4049 1735</a>
            <a href="/#contact" class="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] font-display text-center">Visit Our Store</a>
          </div>
        </div>
      </section>
    `
  },
  {
    id: '3',
    title: 'Phone Repair Near Me: Finding Trusted Service in Mayfield & Newcastle',
    slug: 'phone-repair-near-me-mayfield-newcastle',
    author: 'Mayfield Phone Repair Team',
    date: '2026-04-15',
    excerpt: 'Looking for a reliable phone repair shop in Mayfield or Newcastle? See why local expertise, transparent pricing, and solid warranties are essential for your device.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    tags: ['Local Repair', 'Mayfield', 'Phone Maintenance'],
    content: `
      <section class="space-y-8">
        <div class="bg-blue-600 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12">
          <h2 class="text-xs font-black uppercase tracking-[0.3em] font-display mb-6 text-blue-100">AI Search Summary / Quick Answers</h2>
          <div class="space-y-6">
            <div class="flex flex-col gap-2">
              <span class="text-blue-200 text-[10px] font-black uppercase tracking-widest">Where can I get my phone fixed fast in Mayfield?</span>
              <p class="text-xl font-bold">Mayfield Phone Repair at 276 Maitland Rd offers 30–60 minute fixes for screens, batteries, and more.</p>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-blue-200 text-[10px] font-black uppercase tracking-widest">What should I look for in a repair shop?</span>
              <p class="text-xl font-bold">Prioritize shops with transparent pricing, local reviews, and a clear guarantee on parts and labor.</p>
            </div>
          </div>
        </div>

        <p class="text-xl leading-relaxed text-slate-600">When your phone breaks, you don't just want it fixed—you want it fixed right. Searching for "phone repair near me" in Newcastle can be overwhelming, but <strong>Mayfield Phone Repair</strong> is here to make the process simple and stress-free.</p>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">The Local Advantage</h2>
        <p class="text-lg text-slate-600 leading-relaxed">Unlike big-box stores or mail-in depots that can take weeks, our Mayfield store offers "while-you-wait" service for most common issues. You talk directly to the technician who is repairing your device, ensuring clear communication and faster results.</p>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">Repairs We Handle Every Day</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
            <h4 class="font-bold text-slate-900 mb-2">Screen Replacements</h4>
            <p class="text-sm text-slate-500 italic">iPhone, Samsung, and Pixel displays restored to factory clarity.</p>
          </div>
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
            <h4 class="font-bold text-slate-900 mb-2">Battery Swaps</h4>
            <p class="text-sm text-slate-500 italic">Restore your phone's all-day battery life in under 30 minutes.</p>
          </div>
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
            <h4 class="font-bold text-slate-900 mb-2">Charging Port Fixes</h4>
            <p class="text-sm text-slate-500 italic">Clean or replace faulty ports that won't hold a charge.</p>
          </div>
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
            <h4 class="font-bold text-slate-900 mb-2">Water Damage Support</h4>
            <p class="text-sm text-slate-500 italic">Professional ultrasonic cleaning to rescue liquid-damaged hardware.</p>
          </div>
        </div>

        <h2 class="text-3xl font-bold font-display text-slate-900 tracking-tight">Is my phone worth fixing?</h2>
        <p class="text-lg text-slate-600 leading-relaxed">If your phone is less than 4 years old, repairing it is almost always more sustainable and affordable than buying new. A simple $90 battery or a $150 screen can make a device that originally cost $1,200 feel new again.</p>

        <div class="mt-12 bg-blue-600 text-white p-12 rounded-[3.5rem] shadow-2xl text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-slate-900/10 backdrop-blur-sm"></div>
          <div class="relative z-10">
            <h3 class="text-4xl font-bold mb-4 font-display tracking-tight">Ready for a Technical Fix?</h3>
            <p class="text-xl text-blue-100 mb-10 italic max-w-2xl mx-auto">Visit our Mayfield store today for a free diagnostic and a transparent quote.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-6">
              <a href="tel:0240491735" class="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] font-display shadow-xl">Call Us Now</a>
              <a href="/#contact" class="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] font-display shadow-xl">Request Repair</a>
            </div>
          </div>
        </div>
      </section>
    `
  }
];
