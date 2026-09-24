export interface ServicePricingItem {
  device: string;
  priceFrom: string;
  turnaround: string;
  warranty: string;
  features: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  badge: string;
  heroHeadline: string;
  heroSubheadline: string;
  techHighlightTitle: string;
  techHighlightDescription: string;
  pricingIntro: string;
  pricingItems: ServicePricingItem[];
  faqs: { question: string; answer: string }[];
  processSteps: { step: string; title: string; desc: string }[];
}

export const seoServiceDetails: Record<string, ServiceDetail> = {
  'phone-repair': {
    id: 'phone-repair',
    title: 'Phone Repair',
    badge: 'Express Diagnostics & Hardware Restoration',
    heroHeadline: 'Fast, Same-Day Phone Repairs for Newcastle & Greater Hunter Residents',
    heroSubheadline: 'Cracked screen? Dead battery? Water damage? Our senior technicians at 276 Maitland Rd Mayfield diagnose and repair most smartphone hardware faults in under 45 minutes.',
    techHighlightTitle: 'Comprehensive Multi-Point Hardware Inspection',
    techHighlightDescription: 'Every phone checked in at Mayfield Phone Repair undergoes an exhaustive diagnostic scan testing digitizer responsiveness, battery capacity, thermal behavior, charging current draw, microphone arrays, and proximity sensors before any repair begins.',
    pricingIntro: 'Transparent, upfront pricing with zero hidden diagnostic fees. All parts backed by our 90-day hardware guarantee.',
    pricingItems: [
      { device: 'Apple iPhone (11 through 17 Pro Max)', priceFrom: '$89', turnaround: '30–45 Mins', warranty: '90-Day Warranty', features: 'True Tone & Face ID retention' },
      { device: 'Samsung Galaxy (S21 to S26 Ultra / A-Series)', priceFrom: '$99', turnaround: '45–60 Mins', warranty: '90-Day Warranty', features: 'Dynamic AMOLED OEM-grade' },
      { device: 'Google Pixel (Pixel 7 to 10 Pro)', priceFrom: '$89', turnaround: '45 Mins', warranty: '90-Day Warranty', features: 'Factory display calibration' },
      { device: 'Apple iPad & Android Tablets', priceFrom: '$120', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Digitizer & LCD bonding' },
      { device: 'MacBook & Windows Laptops', priceFrom: '$149', turnaround: '24–48 Hours', warranty: '90-Day Warranty', features: 'Logic board & screen repairs' }
    ],
    faqs: [
      { question: 'How quickly can you fix my phone?', answer: 'Most standard screen repairs and battery replacements are completed within 30 to 45 minutes on-site while you wait at our 276 Maitland Rd Mayfield store.' },
      { question: 'Do I need to make an appointment?', answer: 'No appointment is necessary! We welcome walk-ins Monday to Saturday 9am–5pm and Sundays 10am–2pm.' },
      { question: 'Will I lose my photos, contacts, or data?', answer: 'For 99% of hardware repairs (screens, batteries, charging ports), your data remains completely intact and untouched. However, we always recommend regular device backups as best practice.' },
      { question: 'What warranty is provided on phone repairs?', answer: 'All parts and labor are backed by our comprehensive 90-day hardware warranty covering any manufacturing defects.' }
    ],
    processSteps: [
      { step: '01', title: 'Walk-In Diagnostic', desc: 'Bring your device to 276 Maitland Rd. We test touchscreen response, battery health, and logic board draw.' },
      { step: '02', title: '30-Min Precision Repair', desc: 'Our senior technicians perform the repair in our static-controlled clean bench using OEM-spec parts.' },
      { step: '03', title: 'Multi-Point Quality Test', desc: 'We verify camera focus, biometric sensors, charging speeds, and display colors before returning your device.' }
    ]
  },

  'iphone-repair': {
    id: 'iphone-repair',
    title: 'iPhone Repair',
    badge: 'Apple Specialist Diagnostics & OEM-Grade Parts',
    heroHeadline: 'Same-Day iPhone Repairs in Newcastle: Screens, Batteries & Logic Boards',
    heroSubheadline: 'Shattered front glass? Degraded battery life? Mayfield Phone Repair provides precision Apple repairs preserving True Tone color adaptation and Face ID security.',
    techHighlightTitle: 'True Tone Display Serialization & Face ID Protection',
    techHighlightDescription: 'When replacing an iPhone screen, mall kiosks often fail to transfer the original ambient light display serial code, permanently disabling Apple True Tone. We use specialized EEPROM micro-programmers to read original screen telemetry and flash it to your new display, preserving natural color adaptation and keeping Face ID functioning flawlessly.',
    pricingIntro: 'Upfront Apple repair rates with 90-day parts and labor warranty. Genuine OEM and Premium OLED options available.',
    pricingItems: [
      { device: 'iPhone 11 / 11 Pro / 11 Pro Max', priceFrom: '$89', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'High-contrast LCD / OLED' },
      { device: 'iPhone 12 / 12 Pro / 12 Pro Max / Mini', priceFrom: '$129', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'Super Retina XDR OLED' },
      { device: 'iPhone 13 / 13 Pro / 13 Pro Max / Mini', priceFrom: '$149', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'ProMotion 120Hz available' },
      { device: 'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max', priceFrom: '$169', turnaround: '35 Mins', warranty: '90-Day Warranty', features: 'Dynamic Island compatible' },
      { device: 'iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max', priceFrom: '$199', turnaround: '40 Mins', warranty: '90-Day Warranty', features: 'Ceramic Shield grade' },
      { device: 'iPhone 16 & iPhone 17 Series', priceFrom: '$249', turnaround: '45 Mins', warranty: '90-Day Warranty', features: 'OEM-spec Super Retina' },
      { device: 'iPhone Battery Replacement (All Models)', priceFrom: '$89', turnaround: '25 Mins', warranty: '90-Day Warranty', features: '0-cycle high-capacity cells' }
    ],
    faqs: [
      { question: 'Will Apple Face ID still work after a screen repair?', answer: 'Yes! Our technicians carefully transplant your original front-facing flood illuminator and infrared dot projector assembly, ensuring Face ID continues working seamlessly.' },
      { question: 'Will True Tone color adaptation be preserved?', answer: 'Yes. We program the EEPROM microchip on your replacement display with your iPhone’s unique factory matrix, restoring True Tone functionality.' },
      { question: 'How much does iPhone battery replacement cost?', answer: 'iPhone battery replacements start from $89 depending on your model. All battery replacements use fresh 0-cycle cells and take just 25–30 minutes.' },
      { question: 'Do you fix water-damaged iPhones?', answer: 'Yes. We perform ultrasonic isopropyl alcohol logic board cleanings to displace moisture, remove salt corrosion, and restore dead logic boards.' }
    ],
    processSteps: [
      { step: '01', title: 'Hardware Inspection', desc: 'We inspect frame alignment, digitizer sensitivity, and battery health cycle metrics.' },
      { step: '02', title: 'EEPROM Serialization', desc: 'We transfer True Tone and ambient light sensor code directly onto the new display.' },
      { step: '03', title: 'Dust & Water Reseal', desc: 'We install fresh OEM-grade perimeter adhesive gaskets to seal out Hunter humidity and dust.' }
    ]
  },

  'samsung-repair': {
    id: 'samsung-repair',
    title: 'Samsung Repair',
    badge: 'Samsung Galaxy Authorized-Grade Service',
    heroHeadline: 'Newcastle Samsung Galaxy Repairs: Dynamic AMOLED & Ultra Series Specialists',
    heroSubheadline: 'Cracked curved glass? Green vertical display lines? Fast Samsung screen and battery repairs for Galaxy S-Series, Z-Fold, Z-Flip, and Note devices at 276 Maitland Rd Mayfield.',
    techHighlightTitle: 'Dynamic AMOLED 2X Panels with Ultrasonic Fingerprint Support',
    techHighlightDescription: 'Samsung Galaxy devices use ultra-thin Dynamic AMOLED displays with in-display ultrasonic biometric fingerprint sensors. We install OEM-grade replacement displays that maintain factory touch polling rates (240Hz), full HDR10+ peak brightness, and instant fingerprint unlocking.',
    pricingIntro: 'Competitive pricing on Samsung Galaxy S, A, Note, and Foldable series with 90-day warranty.',
    pricingItems: [
      { device: 'Samsung Galaxy S21 / S21+ / S21 Ultra', priceFrom: '$149', turnaround: '45 Mins', warranty: '90-Day Warranty', features: '120Hz Dynamic AMOLED' },
      { device: 'Samsung Galaxy S22 / S22+ / S22 Ultra', priceFrom: '$179', turnaround: '45 Mins', warranty: '90-Day Warranty', features: 'Ultrasonic sensor ready' },
      { device: 'Samsung Galaxy S23 / S23+ / S23 Ultra', priceFrom: '$199', turnaround: '45 Mins', warranty: '90-Day Warranty', features: 'Corning Gorilla Victus 2' },
      { device: 'Samsung Galaxy S24 / S24+ / S24 Ultra', priceFrom: '$249', turnaround: '45 Mins', warranty: '90-Day Warranty', features: 'Armor Aluminum / Titanium frame' },
      { device: 'Samsung Galaxy S25 & S26 Series', priceFrom: '$299', turnaround: '50 Mins', warranty: '90-Day Warranty', features: 'Ultra-thin bezel OEM assembly' },
      { device: 'Samsung Galaxy A-Series (A14/A34/A54/A55)', priceFrom: '$99', turnaround: '35 Mins', warranty: '90-Day Warranty', features: 'Express same-day screen fix' },
      { device: 'Samsung Galaxy Battery Replacement', priceFrom: '$99', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'High-density Samsung cells' }
    ],
    faqs: [
      { question: 'Will my in-screen fingerprint sensor still work?', answer: 'Yes! We use OEM-spec Dynamic AMOLED screens that fully support Samsung ultrasonic and optical in-display fingerprint biometric sensors.' },
      { question: 'Can you fix the green line issue on Samsung displays?', answer: 'The green or pink vertical line on Samsung screens is caused by a fractured ribbon cable bond inside the OLED panel. A complete screen assembly replacement permanently fixes this issue.' },
      { question: 'How long does a Samsung screen repair take?', answer: 'Most Samsung Galaxy S-Series and A-Series screen replacements are completed in 45 to 60 minutes while you wait.' },
      { question: 'Do you replace shattered Samsung back glass?', answer: 'Yes, we replace cracked Samsung glass back covers with fresh factory-sealed adhesive panels.' }
    ],
    processSteps: [
      { step: '01', title: 'Thermal Disassembly', desc: 'Controlled heating removes the rear glass without compromising the NFC and wireless charging coils.' },
      { step: '02', title: 'AMOLED Replacement', desc: 'We install a precision Dynamic AMOLED panel and recalibrate touch controller responsiveness.' },
      { step: '03', title: 'Pressure-Sealed Reassembly', desc: 'Specialized clamps and waterproof adhesive cure the rear glass for durable everyday protection.' }
    ]
  },

  'screen-repair': {
    id: 'screen-repair',
    title: 'Screen Repair',
    badge: 'Same-Day Glass & Digitizer Restoration',
    heroHeadline: 'Phone Screen Repair Newcastle: Soft OLED, Hard OLED & Incell Glass Fixes',
    heroSubheadline: 'Cracked front glass, unresponsive touch, black bleed, or vertical lines? Walk into our Mayfield workshop for an express 30-minute display replacement with 90-day warranty.',
    techHighlightTitle: 'Understanding Screen Grades: Soft OLED vs. Hard OLED vs. Incell LCD',
    techHighlightDescription: 'We provide total transparency on the parts installed in your phone. Soft OLED panels replicate original Apple and Samsung flexibility, offering superior drop resilience, vibrant contrast, and perfect bezels. Incell LCD offers a budget-friendly option for older models, while Hard OLED provides vibrant color at a lower price point.',
    pricingIntro: 'Starting from $89. Transparent upfront rates, zero hidden fees, and rapid 30-minute turnarounds.',
    pricingItems: [
      { device: 'iPhone Budget Series (8, XR, 11, SE)', priceFrom: '$89', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'High-gamut Incell LCD' },
      { device: 'iPhone Flagship Series (12 through 17 Pro Max)', priceFrom: '$149', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'Soft OLED / Super Retina XDR' },
      { device: 'Samsung Galaxy A-Series', priceFrom: '$99', turnaround: '40 Mins', warranty: '90-Day Warranty', features: 'Factory Super AMOLED' },
      { device: 'Samsung Galaxy S-Series (S21 to S26 Ultra)', priceFrom: '$179', turnaround: '45 Mins', warranty: '90-Day Warranty', features: 'Dynamic AMOLED 2X 120Hz' },
      { device: 'Google Pixel 7 / 8 / 9 / 10 Pro', priceFrom: '$139', turnaround: '45 Mins', warranty: '90-Day Warranty', features: 'OLED with fingerprint sensor' }
    ],
    faqs: [
      { question: 'What is the difference between glass replacement and full screen repair?', answer: 'Modern phones have the outer glass, digitizer (touch sensor), and OLED/LCD display fused into a single laminated assembly. Replacing the full assembly ensures zero dust bubbles, factory touch accuracy, and long-term reliability.' },
      { question: 'How long does a screen replacement take?', answer: 'Over 90% of screen repairs are completed within 30 to 45 minutes at our 276 Maitland Rd workshop.' },
      { question: 'What does your 90-day screen warranty cover?', answer: 'Our warranty covers any touch unresponsiveness, ghost touching, dead pixels, or manufacturer defects in the display panel.' },
      { question: 'Do you offer a free screen diagnostic?', answer: 'Yes! If you are not sure whether your logic board or display is broken, bring it in for a free bench test.' }
    ],
    processSteps: [
      { step: '01', title: 'Display Diagnostics', desc: 'We test whether the internal digitizer or GPU display output is impaired.' },
      { step: '02', title: 'Micro-Removal', desc: 'Precision suction and heat tools remove the fractured glass without harming internal face sensors.' },
      { step: '03', title: 'Serialization & Testing', desc: 'Display code is flashed for color fidelity and tested across all touch axes.' }
    ]
  },

  'ipad-repair': {
    id: 'ipad-repair',
    title: 'iPad Repair',
    badge: 'Apple iPad & Tablet Restoration Specialists',
    heroHeadline: 'Newcastle iPad Screen & Battery Repairs: iPad Pro, Air, Mini & Standard',
    heroSubheadline: 'Cracked tablet glass or swollen battery? We fix Apple iPads and Android tablets for Newcastle students, businesses, and families with same-day turnaround.',
    techHighlightTitle: 'Precision Digitizer Glass Bonding & Chassis Realignment',
    techHighlightDescription: 'When an iPad is dropped, the aluminum chassis corners frequently bend inward, preventing a replacement screen from seating flush. Our technicians use specialized corner-straightening jigs and hydraulic clamps to restore frame geometry before fusing high-tensile digitizer glass.',
    pricingIntro: 'Affordable iPad repairs in Mayfield. Fast turnaround so your kids or business stay productive.',
    pricingItems: [
      { device: 'iPad Standard (7th, 8th, 9th, 10th, 11th Gen)', priceFrom: '$120', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Digitizer glass replacement' },
      { device: 'iPad Air (3rd, 4th, 5th, 6th Gen)', priceFrom: '$189', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Laminated True Tone Retina' },
      { device: 'iPad Mini (4th, 5th, 6th Gen)', priceFrom: '$159', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Express digitizer restoration' },
      { device: 'iPad Pro 11-inch & 12.9-inch (M1, M2, M4)', priceFrom: '$269', turnaround: '24 Hours', warranty: '90-Day Warranty', features: 'Liquid Retina XDR 120Hz' },
      { device: 'iPad Battery Replacement', priceFrom: '$139', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'High-capacity Apple cells' },
      { device: 'iPad Charging Port Micro-Soldering', priceFrom: '$110', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'USB-C / Lightning replacement' }
    ],
    faqs: [
      { question: 'Can you replace just the glass on my iPad?', answer: 'On standard entry-level iPads (7th–10th gen), the glass digitizer and LCD are separate, meaning we can replace just the glass to save you money. On iPad Air and Pro models, the display is fully laminated.' },
      { question: 'Will Apple Pencil work after iPad screen repair?', answer: 'Yes! We test palm rejection, pressure sensitivity, and Apple Pencil latency across the entire screen before handoff.' },
      { question: 'How long does an iPad repair take?', answer: 'Most standard iPad glass repairs are completed the same day within 2 to 4 hours to allow adhesive curing.' }
    ],
    processSteps: [
      { step: '01', title: 'Corner Chamfering', desc: 'We reshape dented aluminum corners so replacement glass sits completely flat.' },
      { step: '02', title: 'Dust-Free Assembly', desc: 'Glass and LCD assemblies are unified inside an ionized air booth to eliminate dust specks.' },
      { step: '03', title: 'Thermal Clamp Cure', desc: 'Pressure clamps maintain constant force while perimeter adhesive cures for maximum longevity.' }
    ]
  },

  'macbook-repair': {
    id: 'macbook-repair',
    title: 'MacBook Repair',
    badge: 'Apple Mac Logic Board & Screen Specialists',
    heroHeadline: 'Newcastle MacBook Repairs: Screens, Liquid Damage & Battery Replacements',
    heroSubheadline: 'MacBook won’t turn on, showing a black screen, or spilled coffee on the keyboard? Avoid Apple Store replacement fees with component-level micro-soldering in Mayfield.',
    techHighlightTitle: 'Component-Level Micro-Soldering vs. Costly Logic Board Swaps',
    techHighlightDescription: 'Official Apple repair centers usually quote $900+ by forcing you to replace the entire logic board for a single burnt capacitor or corroded power rail. Our Newcastle laboratory uses high-magnification trinocular microscopes and thermal cameras to identify and replace failed micro-components, saving you hundreds of dollars.',
    pricingIntro: 'Fast Mac repairs for MacBook Air, MacBook Pro, and iMac. 90-day warranty and free bench evaluation.',
    pricingItems: [
      { device: 'MacBook Air Retina Display Assembly', priceFrom: '$299', turnaround: '24–48 Hours', warranty: '90-Day Warranty', features: 'Original resolution & gamut' },
      { device: 'MacBook Pro Liquid Retina Display', priceFrom: '$389', turnaround: '24–48 Hours', warranty: '90-Day Warranty', features: 'Color-calibrated OEM' },
      { device: 'MacBook Battery Replacement (Air & Pro)', priceFrom: '$169', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Safe solvent removal' },
      { device: 'Logic Board Liquid Damage Ultrasonic Wash', priceFrom: '$199', turnaround: '24–48 Hours', warranty: '90-Day Warranty', features: 'Corrosion elimination' },
      { device: 'Keyboard & Trackpad Replacement', priceFrom: '$149', turnaround: '24 Hours', warranty: '90-Day Warranty', features: 'Fluid-resistant switches' }
    ],
    faqs: [
      { question: 'My MacBook had water spilled on it—what should I do right now?', answer: 'Turn it off immediately! Do NOT plug it into a charger, and do not put it in rice. Bring it directly to our shop at 276 Maitland Rd Mayfield so we can disconnect the battery and perform an ultrasonic board cleaning.' },
      { question: 'Can you recover data from a dead MacBook?', answer: 'Yes! In most cases, our technicians can bypass faulty power management circuits to access your onboard SSD and recover your files.' },
      { question: 'How long does a MacBook battery replacement take?', answer: 'MacBook battery replacements are typically completed on the same day within 2 to 3 hours.' }
    ],
    processSteps: [
      { step: '01', title: 'Thermal Diagnostic', desc: 'Infrared thermal imaging pinpoints shorted diodes, resistors, or power management ICs.' },
      { step: '02', title: 'Micro-Soldering', desc: 'Precision hot-air rework stations remove fried surface-mount devices and solder new components.' },
      { step: '03', title: 'Load & Thermal Stress Test', desc: 'We verify CPU thermals, sleep/wake sensors, and battery charging cycles under maximum workload.' }
    ]
  },

  'laptop-repair': {
    id: 'laptop-repair',
    title: 'Laptop Repair',
    badge: 'Windows & PC Hardware Diagnostic Hub',
    heroHeadline: 'Newcastle Laptop Repairs: Dell, HP, Lenovo, ASUS & Acer Specialists',
    heroSubheadline: 'Cracked laptop screen, broken hinges, failing hard drives, or charging port issues? Fast, affordable Windows laptop hardware fixes at Mayfield Phone Repair.',
    techHighlightTitle: 'Hinge Structural Reconstruction & DC Power Jack Micro-Soldering',
    techHeadlineDescription: 'Laptops frequently suffer from broken internal plastic screw standoffs that rip loose from display hinges. Rather than replacing the entire palmrest assembly, we reinforce structural stress points with industrial-grade epoxies and reconstruct hinge brackets for lasting durability.',
    pricingIntro: 'Reliable repair solutions for all Windows and Chromebook laptops in the Newcastle region.',
    pricingItems: [
      { device: 'Laptop Screen Replacement (13" to 17" FHD/IPS)', priceFrom: '$149', turnaround: 'Same Day / 24h', warranty: '90-Day Warranty', features: 'Anti-glare & high-refresh' },
      { device: 'Broken Hinge & Plastic Casing Repair', priceFrom: '$110', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Structural epoxy reinforcement' },
      { device: 'DC Power Jack & Charging Port Fix', priceFrom: '$99', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Micro-soldered connection' },
      { device: 'Battery Replacement (Internal & External)', priceFrom: '$119', turnaround: 'Same Day', warranty: '90-Day Warranty', features: 'Certified battery cells' },
      { device: 'SSD Upgrade & Windows OS Reinstallation', priceFrom: '$129', turnaround: 'Same Day', warranty: '90-Day Warranty', features: '10x faster startup speed' }
    ],
    faqs: [
      { question: 'Can you fix broken laptop hinges that crack the screen casing?', answer: 'Yes! Broken laptop hinges are one of our most frequent repairs. We rebuild the internal screw anchors using high-tensile epoxy and loosen tight hinge tension to prevent future cracking.' },
      { question: 'How long does a laptop screen replacement take?', answer: 'We stock common 14-inch and 15.6-inch 30-pin and 40-pin Full HD screens for same-day 1-hour replacement.' },
      { question: 'Can you speed up an older slow laptop?', answer: 'Yes! Upgrading an old mechanical hard drive to a blazing-fast Solid State Drive (SSD) will make your laptop feel brand new with sub-10 second boot times.' }
    ],
    processSteps: [
      { step: '01', title: 'Hardware Health Scan', desc: 'We test drive sector health, RAM stability, and battery degradation.' },
      { step: '02', title: 'Component Replacement', desc: 'We install high-grade replacement screens, hinges, or soldered DC jacks.' },
      { step: '03', title: 'Cooling & Dust Overhaul', desc: 'We blow out heatsink dust and apply fresh premium thermal paste to keep temperatures low.' }
    ]
  },

  'battery-replacement': {
    id: 'battery-replacement',
    title: 'Battery Replacement',
    badge: '0-Cycle Fresh Lithium-Ion Power Cells',
    heroHeadline: 'Phone Battery Replacement Newcastle: iPhones, Samsung & Pixel in 30 Mins',
    heroSubheadline: 'Phone draining rapidly, shutting down at 20%, or feeling hot? Restore all-day battery life with a fresh 0-cycle OEM-spec battery replacement at 276 Maitland Rd Mayfield.',
    techHighlightTitle: '0-Cycle Lithium Cells & Battery Management System (BMS) Calibration',
    techHighlightDescription: 'Smartphone lithium batteries naturally lose capacity after 500 charge cycles (typically 18–24 months), causing processor throttling, slow app launches, and unexpected shutdowns. We install freshly manufactured 0-cycle batteries with integrated over-current, over-voltage, and thermal runaway protection.',
    pricingIntro: 'Fast 25–30 minute battery swaps with 90-day warranty. Free battery diagnostic test upon arrival.',
    pricingItems: [
      { device: 'iPhone 8 / X / XR / 11 Series', priceFrom: '$89', turnaround: '25 Mins', warranty: '90-Day Warranty', features: '0-cycle, high-capacity' },
      { device: 'iPhone 12 / 13 / 14 Series', priceFrom: '$99', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'Full health calibration' },
      { device: 'iPhone 15 / 16 / 17 Series', priceFrom: '$119', turnaround: '30 Mins', warranty: '90-Day Warranty', features: 'OEM-grade thermal spec' },
      { device: 'Samsung Galaxy S-Series (S21–S26)', priceFrom: '$99', turnaround: '35 Mins', warranty: '90-Day Warranty', features: 'Fresh lithium polymer' },
      { device: 'Google Pixel & Oppo Phones', priceFrom: '$89', turnaround: '35 Mins', warranty: '90-Day Warranty', features: 'Quick charge certified' }
    ],
    faqs: [
      { question: 'When should I replace my smartphone battery?', answer: 'If your iPhone battery health percentage drops below 80%, or if your Samsung phone drains from full to empty in just a few hours or shuts down unexpectedly in cold weather, it is time for a fresh battery.' },
      { question: 'How long does a battery replacement take?', answer: 'Most battery replacements take just 25 to 35 minutes while you wait at our Mayfield store.' },
      { question: 'Is a swollen battery dangerous?', answer: 'Yes! A swollen battery is a critical fire hazard caused by gas buildup from damaged cells. If your screen or back cover is lifting, bring your phone to us immediately for safe disposal and replacement.' },
      { question: 'Do you dispose of old lithium batteries safely?', answer: 'Yes, we recycle all spent lithium-ion battery cells responsibly through certified Newcastle e-waste recycling programs.' }
    ],
    processSteps: [
      { step: '01', title: 'Cycle Count Scan', desc: 'We verify battery degradation, full charge capacity, and internal resistance.' },
      { step: '02', title: 'Adhesive Pull-Tab Extraction', desc: 'Old battery adhesive is safely removed without puncturing delicate lithium pouches.' },
      { step: '03', title: 'BMS Connection & Calibration', desc: 'Fresh battery is installed with thermal stretch tape and calibrated for accurate percentage readings.' }
    ]
  }
};
