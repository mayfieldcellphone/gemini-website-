export interface ModelRepairInfo {
  id: string;
  slug: string;
  brand: 'apple' | 'samsung' | 'google' | 'ipad';
  brandHubUrl: string;
  pillarGuideUrl: string;
  modelName: string;
  title: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubdeck: string;
  pricing: {
    glassOnlyPrice: string;
    fullAssemblyPrice: string;
    batteryPrice: string;
    chargingPortPrice: string;
    backGlassPrice?: string;
  };
  repairTime: string;
  warranty: string;
  commonIssues: {
    title: string;
    description: string;
  }[];
  specifications: {
    display: string;
    batteryCapacity: string;
    processor: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const modelRepairData: ModelRepairInfo[] = [
  // --- HIGH-VOLUME EVERYDAY IPHONE MODELS (65% of daily repairs) ---
  {
    id: 'iphone-11-repair-newcastle',
    slug: 'iphone-11-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'iPhone 11 / 11 Pro / 11 Pro Max',
    title: 'iPhone 11 Screen Repair & Battery Replacement Newcastle | Mayfield',
    metaDescription: 'Same-day iPhone 11, 11 Pro & 11 Pro Max repair in Newcastle. Screen fixes from $89, 0-cycle battery swaps $89. 30-min service, 90-day warranty.',
    heroHeadline: 'iPhone 11 Repair Newcastle: Fast Screens & Batteries from $89',
    heroSubdeck: 'Newcastle\'s most affordable, reliable repair service for iPhone 11, iPhone 11 Pro, and iPhone 11 Pro Max. High-gamut Liquid Retina & OLED screens, 30-minute turnarounds, fresh batteries, and 90-day warranty.',
    pricing: {
      glassOnlyPrice: '$89',
      fullAssemblyPrice: '$89 - $169',
      batteryPrice: '$89',
      chargingPortPrice: '$79',
      backGlassPrice: '$110'
    },
    repairTime: '30 Minutes',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: '6.1" Liquid Retina HD (iPhone 11) / Super Retina XDR OLED (Pro)',
      batteryCapacity: '3,110 mAh to 3,969 mAh Fresh 0-Cycle Lithium Cell',
      processor: 'Apple A13 Bionic Neural Engine'
    },
    commonIssues: [
      {
        title: 'Cracked Front Glass & Ghost Touch',
        description: 'Drop impact fractures the front glass, causing random app opens, typing errors, or blank black screens.'
      },
      {
        title: 'Degraded Battery & Unexpected Shutdowns',
        description: 'iPhone 11 battery health dropping under 80%, causing sudden shutdowns at 20% or sluggish performance.'
      },
      {
        title: 'Loose or Broken Lightning Charging Port',
        description: 'Charging cable falls out easily or only charges at a specific upward angle due to compacted lint or worn pins.'
      }
    ],
    faqs: [
      { question: 'How much does an iPhone 11 screen replacement cost in Newcastle?', answer: 'iPhone 11 screen replacement costs just $89 at Mayfield Phone Repair. iPhone 11 Pro and Pro Max OLED screens start from $149 to $169 with full True Tone restoration.' },
      { question: 'How long does an iPhone 11 battery replacement take?', answer: 'Our technicians replace iPhone 11 batteries in just 25 to 30 minutes while you wait at our 276 Maitland Rd workshop.' },
      { question: 'Do you keep iPhone 11 parts in stock?', answer: 'Yes! We keep high-volume iPhone 11 screens, batteries, and charging ports permanently stocked for immediate walk-in repairs.' }
    ]
  },
  {
    id: 'iphone-12-repair-newcastle',
    slug: 'iphone-12-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'iPhone 12 / 12 Pro / 12 Pro Max / 12 Mini',
    title: 'iPhone 12 Screen Repair & Battery Replacement Newcastle | Mayfield',
    metaDescription: 'Same-day iPhone 12, 12 Pro & Pro Max repair in Newcastle. Super Retina OLED screens from $129, battery replacement $89. 30-min fix, 90-day warranty.',
    heroHeadline: 'iPhone 12 Repair Newcastle: Super Retina OLED & Battery Fixes',
    heroSubdeck: 'Expert repairs for iPhone 12, iPhone 12 Mini, iPhone 12 Pro, and iPhone 12 Pro Max. Precision Ceramic Shield display fixes, MagSafe wireless charging coil realignment, and fresh 0-cycle batteries in Mayfield.',
    pricing: {
      glassOnlyPrice: '$110',
      fullAssemblyPrice: '$129 - $220',
      batteryPrice: '$89',
      chargingPortPrice: '$89',
      backGlassPrice: '$120'
    },
    repairTime: '30 Minutes',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: 'Super Retina XDR OLED with Ceramic Shield (5.4", 6.1", 6.7")',
      batteryCapacity: '2,227 mAh (Mini) to 3,687 mAh (Pro Max)',
      processor: 'Apple A14 Bionic 5G Architecture'
    },
    commonIssues: [
      {
        title: 'Ceramic Shield Cracking & Green Tint Flickering',
        description: 'Impact damage causing cracked outer glass, green vertical lines, or display flicker on the Super Retina OLED.'
      },
      {
        title: 'Ear Speaker Mesh Muffled Sound',
        description: 'Dust and skin oil clog the top ear speaker mesh, making phone calls hard to hear.'
      },
      {
        title: 'Battery Health Service Warning',
        description: 'iPhone 12 displays "Service" alert in Battery Health settings and struggles to last half a workday.'
      }
    ],
    faqs: [
      { question: 'How much does an iPhone 12 screen replacement cost in Newcastle?', answer: 'iPhone 12 and 12 Pro screen replacement starts from $129 for premium Incell or $179 for high-contrast Soft OLED. All options include a 90-day warranty.' },
      { question: 'Will Apple Face ID still work after iPhone 12 screen repair?', answer: 'Yes! We carefully transplant your original ear speaker flex cable containing the flood illuminator, ensuring Face ID remains 100% functional.' },
      { question: 'Can you fix iPhone 12 back glass?', answer: 'Yes, we remove shattered rear glass using specialized laser separation and fit a brand new factory-bonded rear panel.' }
    ]
  },
  {
    id: 'iphone-13-repair-newcastle',
    slug: 'iphone-13-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'iPhone 13 / 13 Pro / 13 Pro Max / 13 Mini',
    title: 'iPhone 13 Screen Repair & Battery Replacement Newcastle | Mayfield',
    metaDescription: 'Express iPhone 13, 13 Pro & Pro Max repair in Newcastle. Same-day OLED screen fix from $149, battery replacement $99. True Tone restored.',
    heroHeadline: 'iPhone 13 Repair Newcastle: 30-Min Screen & Battery Service',
    heroSubdeck: 'Specialized repairs for iPhone 13, iPhone 13 Mini, iPhone 13 Pro, and iPhone 13 Pro Max. 120Hz ProMotion screen replacements, 0-cycle battery swaps, and camera lens repairs at 276 Maitland Rd Mayfield.',
    pricing: {
      glassOnlyPrice: '$130',
      fullAssemblyPrice: '$149 - $260',
      batteryPrice: '$99',
      chargingPortPrice: '$99',
      backGlassPrice: '$130'
    },
    repairTime: '30 - 45 Minutes',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: 'Super Retina XDR OLED / 120Hz ProMotion on Pro Models',
      batteryCapacity: '2,406 mAh (Mini) to 4,352 mAh (Pro Max)',
      processor: 'Apple A15 Bionic 5-Core GPU'
    },
    commonIssues: [
      {
        title: 'White / Green Screen of Death on iPhone 13 Pro',
        description: 'Known display panel flex failure causing the entire screen to turn solid white or lime green after a drop or software update.'
      },
      {
        title: 'Cracked Diagonal Dual Camera Sapphire Lens',
        description: 'Rear camera glass shatters after a drop, causing blurry photos and auto-focus lens vibration.'
      },
      {
        title: 'Battery Degradation & Slow App Response',
        description: 'Lithium battery internal resistance spikes, causing CPU throttling and sluggish touch scrolling.'
      }
    ],
    faqs: [
      { question: 'Can you fix the solid white or green screen on iPhone 13 Pro?', answer: 'Yes! We repair the internal display power trace or replace the ProMotion OLED assembly with full 120Hz support.' },
      { question: 'How much is an iPhone 13 battery replacement in Newcastle?', answer: 'An iPhone 13 battery replacement costs $99 including installation, calibration, and 90-day warranty.' },
      { question: 'Do you test True Tone color calibration on iPhone 13?', answer: 'Yes, we reprogram the display chip so True Tone remains active and responsive to ambient room light.' }
    ]
  },
  {
    id: 'iphone-14-repair-newcastle',
    slug: 'iphone-14-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max',
    title: 'iPhone 14 Repair Newcastle — Screen, Battery & Back Glass Fix',
    metaDescription: 'Same-day iPhone 14, 14 Plus, 14 Pro & Pro Max repair in Newcastle. Dynamic Island OLED screens, battery swaps & laser back glass in Mayfield.',
    heroHeadline: 'iPhone 14 Repair Newcastle: Dynamic Island & OLED Specialists',
    heroSubdeck: 'Complete repair solutions for iPhone 14, 14 Plus, 14 Pro, and 14 Pro Max. Super Retina XDR OLED display replacements, removable rear glass fixes, and 0-cycle battery installations in 30 minutes.',
    pricing: {
      glassOnlyPrice: '$150',
      fullAssemblyPrice: '$169 - $320',
      batteryPrice: '$109',
      chargingPortPrice: '$109',
      backGlassPrice: '$140'
    },
    repairTime: '30 - 45 Minutes',
    warranty: '90-Day Comprehensive Warranty',
    specifications: {
      display: 'Super Retina XDR OLED with Dynamic Island (Pro) or Notch (Standard)',
      batteryCapacity: '3,279 mAh to 4,323 mAh Lithium-Ion Cell',
      processor: 'Apple A15 / A16 Bionic Neural Engine'
    },
    commonIssues: [
      {
        title: 'Shattered Front Screen & Black Ink Bleeding',
        description: 'Heavy impact damages the OLED substrate, causing purple or black ink spots to spread across the display.'
      },
      {
        title: 'Cracked Removable Back Glass',
        description: 'iPhone 14 features a removable rear panel design which we replace cleanly without opening the front screen.'
      },
      {
        title: 'Loose Lightning Port & Charging Interruption',
        description: 'Debris buildup in the charging port prevents full cable insertion and triggers slow charging.'
      }
    ],
    faqs: [
      { question: 'How much is an iPhone 14 screen replacement in Newcastle?', answer: 'iPhone 14 screen replacement starts from $169 for standard OLED and up to $320 for 14 Pro Max Dynamic Island assemblies.' },
      { question: 'How long does an iPhone 14 back glass replacement take?', answer: 'On standard iPhone 14 and 14 Plus models, rear glass replacements are completed in under 45 minutes.' },
      { question: 'Is my data safe during an iPhone 14 screen fix?', answer: 'Yes! Hardware repairs do not modify onboard NAND flash memory, keeping all your personal data intact.' }
    ]
  },

  // --- POPULAR SAMSUNG GALAXY EVERYDAY MODELS ---
  {
    id: 'galaxy-s24-repair-newcastle',
    slug: 'galaxy-s24-repair-newcastle',
    brand: 'samsung',
    brandHubUrl: '/brand/samsung',
    pillarGuideUrl: '/repair-guides/samsung-repair-newcastle',
    modelName: 'Samsung Galaxy S24 / S24+ / S24 Ultra',
    title: 'Samsung Galaxy S24 Screen Repair & Battery Newcastle | Mayfield',
    metaDescription: 'Same-day Samsung Galaxy S24, S24+ & S24 Ultra repair in Newcastle. Dynamic AMOLED 2X displays, flat titanium glass & battery swaps in Mayfield.',
    heroHeadline: 'Samsung Galaxy S24 Repair Newcastle: AMOLED & Ultra Specialists',
    heroSubdeck: 'Professional repairs for Galaxy S24, S24 Plus, and S24 Ultra. Dynamic AMOLED 2X 2600-nit screen fixes, flat glass restorations, ultrasonic fingerprint calibration, and battery replacements in under 60 minutes.',
    pricing: {
      glassOnlyPrice: '$170',
      fullAssemblyPrice: '$249 - $399',
      batteryPrice: '$119',
      chargingPortPrice: '$109',
      backGlassPrice: '$129'
    },
    repairTime: '45 - 60 Minutes',
    warranty: '90-Day Parts & Labor Warranty',
    specifications: {
      display: 'Dynamic AMOLED 2X 120Hz Flat Display (Gorilla Armor on Ultra)',
      batteryCapacity: '4,000 mAh (S24) to 5,000 mAh (S24 Ultra)',
      processor: 'Snapdragon 8 Gen 3 for Galaxy / Exynos 2400'
    },
    commonIssues: [
      {
        title: 'Fractured Gorilla Armor Front Glass',
        description: 'Cracked outer display glass or vertical pink/green lines across the 120Hz AMOLED panel.'
      },
      {
        title: 'Ultrasonic In-Display Fingerprint Failure',
        description: 'Improper screen installation by unqualified kiosks disabling ultrasonic biometric sensor response.'
      },
      {
        title: 'Rear Glass & Camera Lens Cracks',
        description: 'Shattered matte finish rear glass panel or scratched individual camera lens rings.'
      }
    ],
    faqs: [
      { question: 'Will my ultrasonic fingerprint reader work after S24 screen repair?', answer: 'Yes! We install genuine-spec Dynamic AMOLED assemblies that maintain factory biometric optical and ultrasonic transmission.' },
      { question: 'How much does a Samsung S24 screen replacement cost in Newcastle?', answer: 'Samsung Galaxy S24 screen replacement starts from $249 for standard S24 and up to $399 for the S24 Ultra.' },
      { question: 'How long does a Samsung S24 repair take at Mayfield?', answer: 'Most S24 screen and battery repairs take 45 to 60 minutes while you wait.' }
    ]
  },
  {
    id: 'galaxy-s23-repair-newcastle',
    slug: 'galaxy-s23-repair-newcastle',
    brand: 'samsung',
    brandHubUrl: '/brand/samsung',
    pillarGuideUrl: '/repair-guides/samsung-repair-newcastle',
    modelName: 'Samsung Galaxy S23 / S23+ / S23 Ultra',
    title: 'Samsung Galaxy S23 Screen Repair Newcastle | Mayfield Phone Repair',
    metaDescription: 'Fast Samsung Galaxy S23, S23+ & S23 Ultra repair in Newcastle. 120Hz Dynamic AMOLED screens, battery replacement & back glass fix in Mayfield.',
    heroHeadline: 'Samsung Galaxy S23 Repair Newcastle: Express Same-Day Fix',
    heroSubdeck: 'Expert repairs for Samsung Galaxy S23, S23+, and S23 Ultra. High-refresh Dynamic AMOLED display replacements, S-Pen digitizer fixes, fresh Samsung battery cells, and 90-day warranty at 276 Maitland Rd.',
    pricing: {
      glassOnlyPrice: '$150',
      fullAssemblyPrice: '$219 - $369',
      batteryPrice: '$109',
      chargingPortPrice: '$99',
      backGlassPrice: '$119'
    },
    repairTime: '45 - 60 Minutes',
    warranty: '90-Day Parts & Labor Warranty',
    specifications: {
      display: 'Dynamic AMOLED 2X 120Hz HDR10+ (Gorilla Glass Victus 2)',
      batteryCapacity: '3,900 mAh to 5,000 mAh Lithium-Ion Cell',
      processor: 'Qualcomm Snapdragon 8 Gen 2 for Galaxy'
    },
    commonIssues: [
      {
        title: 'Curved Edge Screen Fractures (S23 Ultra)',
        description: 'Corner drop damage shattering the curved edge glass and puncturing the flexible AMOLED panel underneath.'
      },
      {
        title: 'Moisture Detected in USB-C Charging Port',
        description: 'Corrosion or lint buildup triggering persistent "Moisture detected" alerts preventing cable charging.'
      },
      {
        title: 'Battery Life Depletion After Heavy Daily Use',
        description: 'Battery health drops below optimal threshold, causing quick drain and unexpected shutdowns.'
      }
    ],
    faqs: [
      { question: 'How much is a Samsung S23 screen replacement in Newcastle?', answer: 'Samsung S23 screen replacements range from $219 for standard S23 up to $369 for the curved S23 Ultra.' },
      { question: 'Can you fix the "Moisture detected" charging error on Samsung S23?', answer: 'Yes! We perform ultrasonic port deoxidization or solder a fresh OEM USB-C sub-board in under 45 minutes.' },
      { question: 'Does S-Pen work after S23 Ultra screen replacement?', answer: 'Yes, our replacement screens include full Wacom electromagnetic digitizer layers for 100% S-Pen accuracy.' }
    ]
  },
  {
    id: 'galaxy-a-series-repair-newcastle',
    slug: 'galaxy-a-series-repair-newcastle',
    brand: 'samsung',
    brandHubUrl: '/brand/samsung',
    pillarGuideUrl: '/repair-guides/samsung-repair-newcastle',
    modelName: 'Samsung Galaxy A-Series (A14, A15, A34, A54, A55)',
    title: 'Samsung Galaxy A-Series Screen Repair Newcastle (A14/A34/A54/A55)',
    metaDescription: 'Affordable Samsung Galaxy A14, A34, A54 & A55 screen repairs in Newcastle. Screens from $99, batteries $89. Express 35-min service, 90-day warranty.',
    heroHeadline: 'Samsung Galaxy A-Series Repair Newcastle: Fast & Affordable Fixes',
    heroSubdeck: 'The Hunter\'s favorite budget phone repair service. Same-day screen replacements, battery swaps, and charging port fixes for Samsung Galaxy A14, A15, A24, A34, A35, A54, and A55 at 276 Maitland Rd Mayfield.',
    pricing: {
      glassOnlyPrice: '$89',
      fullAssemblyPrice: '$99 - $179',
      batteryPrice: '$89',
      chargingPortPrice: '$79',
      backGlassPrice: '$89'
    },
    repairTime: '35 - 45 Minutes',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: 'FHD+ Super AMOLED 120Hz (A54/A55) / 90Hz PLS LCD (A14/A15)',
      batteryCapacity: '5,000 mAh High-Capacity Samsung Battery',
      processor: 'Exynos 1380 / MediaTek Dimensity Architecture'
    },
    commonIssues: [
      {
        title: 'Cracked Front Screen & Touch Unresponsiveness',
        description: 'Drop impacts shattering the front glass and causing black screen bleed on A-series devices.'
      },
      {
        title: 'Loose USB-C Sub-Board Charging Failure',
        description: 'Worn or broken internal charging pins preventing fast charging.'
      },
      {
        title: 'Degraded 5000mAh Battery Performance',
        description: 'Sluggish performance and rapid discharge after 18–24 months of daily charging.'
      }
    ],
    faqs: [
      { question: 'How much does it cost to fix a Samsung Galaxy A-series screen?', answer: 'Samsung A-series screen repairs start from just $99 for models like the A14/A15, and $149–$179 for Super AMOLED models like the A54 and A55.' },
      { question: 'How fast can you fix a Galaxy A54 or A55 screen?', answer: 'We complete most Samsung Galaxy A-series screen and battery repairs in just 35 to 45 minutes.' },
      { question: 'Is it worth repairing an A-series phone?', answer: 'Yes! For around $99–$149, you restore your phone to brand new condition, saving hundreds of dollars compared to buying a replacement handset.' }
    ]
  },

  // --- POPULAR IPAD EVERYDAY MODELS ---
  {
    id: 'ipad-9-10-repair-newcastle',
    slug: 'ipad-9-10-repair-newcastle',
    brand: 'ipad',
    brandHubUrl: '/service/ipad-repair',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'Apple iPad 9th & 10th Gen (10.2" & 10.9")',
    title: 'iPad 9th & 10th Gen Screen Repair Newcastle | Mayfield Phone Repair',
    metaDescription: 'Same-day iPad 9th & 10th Generation screen repair in Newcastle & Mayfield. Front glass digitizer fix from $120, battery swaps & child-proof cases.',
    heroHeadline: 'iPad 9th & 10th Gen Repair Newcastle: Glass & LCD Specialists',
    heroSubdeck: 'Newcastle\'s leading tablet repair center for schools, university students, and families. Express glass digitizer replacements, bent aluminum frame realignment, LCD repairs, and battery swaps in Mayfield.',
    pricing: {
      glassOnlyPrice: '$120',
      fullAssemblyPrice: '$120 - $210',
      batteryPrice: '$139',
      chargingPortPrice: '$110',
      backGlassPrice: 'N/A'
    },
    repairTime: 'Same Day (2–4 Hours)',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: '10.2" Retina Display (iPad 9) / 10.9" Liquid Retina (iPad 10)',
      batteryCapacity: '8,557 mAh to 7,606 mAh Lithium Polymer Cell',
      processor: 'Apple A13 Bionic (iPad 9) / A14 Bionic (iPad 10)'
    },
    commonIssues: [
      {
        title: 'Shattered Front Glass with Working LCD',
        description: 'Kids or students drop the iPad, shattering the outer touch digitizer glass while the internal LCD image remains intact.'
      },
      {
        title: 'Dented Aluminum Corners Preventing Glass Fit',
        description: 'Impacts bend the outer aluminum bezel, which must be reshaped with corner jigs so replacement glass sits flush.'
      },
      {
        title: 'Broken Lightning or USB-C Charging Port',
        description: 'Charging cable snapped off inside the port or worn pins failing to draw charge current.'
      }
    ],
    faqs: [
      { question: 'Can you replace just the glass on an iPad 9th or 10th Gen?', answer: 'Yes! On iPad 9th Gen, the glass digitizer is separate from the LCD, so we can replace just the glass for $120, saving you over 50% compared to official Apple pricing.' },
      { question: 'Will Apple Pencil work after iPad screen repair?', answer: 'Yes! We test palm rejection, pressure sensitivity, and Apple Pencil drawing response across the entire screen before collection.' },
      { question: 'How long does an iPad glass repair take?', answer: 'Most iPad repairs are completed on the same day within 2 to 4 hours to ensure the perimeter adhesive cures under thermal clamps.' }
    ]
  },

  // --- FLAGSHIP MODELS (EXISTING) ---
  {
    id: 'iphone-17-repair-newcastle',
    slug: 'iphone-17-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'iPhone 17 / 17 Pro / 17 Pro Max',
    title: 'iPhone 17 Screen Repair & Battery Replacement Newcastle',
    metaDescription: 'Same-day iPhone 17 screen repair & battery replacement in Newcastle & Mayfield. Ceramic Shield glass fix, True Tone restoration & 90-day warranty.',
    heroHeadline: 'iPhone 17 Repair Newcastle: Screen, Battery & Hardware Service',
    heroSubdeck: 'Specialist repairs for Apple’s flagships (iPhone 17, iPhone 17 Pro, iPhone 17 Pro Max, iPhone 17 Air). Same-day Ceramic Shield display replacements, genuine-spec battery swaps, True Tone transfer, and IP68 water seal restoration in Mayfield.',
    pricing: {
      glassOnlyPrice: '$240',
      fullAssemblyPrice: '$380 - $485',
      batteryPrice: '$139',
      chargingPortPrice: '$129',
      backGlassPrice: '$180'
    },
    repairTime: '30 - 45 Minutes',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: 'Super Retina XDR OLED / ProMotion 120Hz Ceramic Shield 2.0',
      batteryCapacity: 'High-Density Lithium-Ion Fast Charge Cell',
      processor: 'Apple A19 / A19 Pro Bionic Neural Engine'
    },
    commonIssues: [
      {
        title: 'Shattered Ceramic Shield Front Glass & OLED Lines',
        description: 'Hard drop impacts shatter the outer Ceramic Shield cover glass or cause vertical green lines on the Super Retina XDR display panel.'
      },
      {
        title: 'USB-C Port Debris & Charging Interruption',
        description: 'Pocket lint accumulation in the USB-C charging port prevents cable insertion or causes intermittent charge warnings.'
      },
      {
        title: 'Camera Glass Cracks & OIS Vibration',
        description: 'Rear camera sapphire lens fractures or mechanical motorcycle vibration damages the optical image stabilizer.'
      }
    ],
    faqs: [
      { question: 'How much does an iPhone 17 screen replacement cost in Newcastle?', answer: 'iPhone 17 screen replacement ranges from $240 for glass refurbishing up to $485 for complete iPhone 17 Pro Max Super Retina XDR OLED display assemblies.' },
      { question: 'Will True Tone and Face ID work after iPhone 17 repair?', answer: 'Yes! We use specialized hardware coders to transfer original display serials, preserving True Tone and Face ID functionality.' },
      { question: 'How long does an iPhone 17 repair take at Mayfield?', answer: 'Most iPhone 17 screen and battery repairs are completed in 30 to 45 minutes.' }
    ]
  },
  {
    id: 'iphone-16-repair-newcastle',
    slug: 'iphone-16-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max',
    title: 'iPhone 16 Repair Newcastle — Screen, Battery & More',
    metaDescription: 'Fast iPhone 16 repair in Newcastle & Mayfield. Screen replacement, battery swaps, camera lens fix & back glass repair. Walk-ins welcome.',
    heroHeadline: 'iPhone 16 Repair Newcastle: Professional Local Fix',
    heroSubdeck: 'Expert repairs for iPhone 16, 16 Plus, 16 Pro, and 16 Pro Max. Same-day screen replacement, fresh high-capacity battery swaps, laser back glass restoration, and USB-C port repairs in Mayfield.',
    pricing: {
      glassOnlyPrice: '$190',
      fullAssemblyPrice: '$280 - $420',
      batteryPrice: '$129',
      chargingPortPrice: '$119',
      backGlassPrice: '$160'
    },
    repairTime: '30 Minutes',
    warranty: '90-Day Comprehensive Warranty',
    specifications: {
      display: 'Super Retina XDR OLED 2000 nits Peak Brightness',
      batteryCapacity: '3,561 mAh to 4,685 mAh Fast Charge Lithium-Ion',
      processor: 'Apple A18 / A18 Pro Bionic'
    },
    commonIssues: [
      {
        title: 'Cracked Front Glass & Unresponsive Touchscreen',
        description: 'Shattered display glass with touch blackout or laggy digitizer scrolling.'
      },
      {
        title: 'Rapid Battery Drain & Excessive Heat',
        description: 'Battery health capacity drops below 80%, leading to rapid discharge and overheating.'
      },
      {
        title: 'Camera Control Button & USB-C Port Faults',
        description: 'Intermittent USB-C connection or unresponsive capacitive camera shutter key.'
      }
    ],
    faqs: [
      { question: 'How long does an iPhone 16 screen replacement take?', answer: 'iPhone 16 screen replacements take approximately 30 minutes at our Mayfield workshop.' },
      { question: 'How much is an iPhone 16 battery replacement in Newcastle?', answer: 'iPhone 16 battery replacements cost $129 including parts, installation, and 90-day warranty.' },
      { question: 'Do you re-apply water resistance seals on iPhone 16?', answer: 'Yes, we fit fresh perimeter water-resistant gaskets on every iPhone 16 service.' }
    ]
  },
  {
    id: 'iphone-15-pro-repair-newcastle',
    slug: 'iphone-15-pro-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'iPhone 15 Pro / 15 Pro Max',
    title: 'iPhone 15 Pro Repair Newcastle — Screen & Battery Service',
    metaDescription: 'Precision iPhone 15 Pro & Pro Max repair in Newcastle. Titanium frame realignment, Super Retina XDR screen replacement & battery swaps in Mayfield.',
    heroHeadline: 'iPhone 15 Pro Repair Newcastle: Titanium Chassis & Screen Specialists',
    heroSubdeck: 'Specialized local repairs for iPhone 15 Pro and 15 Pro Max. Super Retina XDR screen replacements, laser back glass repair, USB-C port fixes, and high-capacity battery installs in under 30 minutes.',
    pricing: {
      glassOnlyPrice: '$180',
      fullAssemblyPrice: '$260 - $380',
      batteryPrice: '$119',
      chargingPortPrice: '$109',
      backGlassPrice: '$150'
    },
    repairTime: '30 Minutes',
    warranty: '90-Day Parts & Labor Warranty',
    specifications: {
      display: 'Super Retina XDR OLED / ProMotion 120Hz Titanium Frame',
      batteryCapacity: '3,274 mAh (Pro) / 4,422 mAh (Pro Max)',
      processor: 'Apple A17 Pro Bionic'
    },
    commonIssues: [
      {
        title: 'Cracked Front Screen & Face ID Interruption',
        description: 'Damaged Super Retina OLED panel or dislodged front camera flex sensor.'
      },
      {
        title: 'USB-C Fast Charging Failure',
        description: 'Burnt CC pins or internal lint compaction preventing rapid charge.'
      }
    ],
    faqs: [
      { question: 'How much does an iPhone 15 Pro screen replacement cost in Newcastle?', answer: 'iPhone 15 Pro screen replacement starts from $260 for high-grade OEM OLED assemblies.' },
      { question: 'Can you fix iPhone 15 Pro back glass?', answer: 'Yes, we replace cracked matte titanium back glass with original precision.' }
    ]
  },
  {
    id: 'galaxy-s26-ultra-repair-newcastle',
    slug: 'galaxy-s26-ultra-repair-newcastle',
    brand: 'samsung',
    brandHubUrl: '/brand/samsung',
    pillarGuideUrl: '/repair-guides/samsung-repair-newcastle',
    modelName: 'Samsung Galaxy S26 Ultra',
    title: 'Samsung Galaxy S26 Ultra Screen Repair Newcastle',
    metaDescription: 'Flagship Samsung Galaxy S26 Ultra repair in Newcastle & Mayfield. Dynamic AMOLED 2X screen replacement, S-Pen digitizer fix & camera lens repair.',
    heroHeadline: 'Samsung Galaxy S26 Ultra Repair Newcastle: Flagship AMOLED Fix',
    heroSubdeck: 'Next-gen screen and hardware repairs for Samsung Galaxy S26 Ultra. 120Hz Dynamic AMOLED display replacements, S-Pen digitizer restoration, periscope zoom camera repairs, and battery swaps in Mayfield.',
    pricing: {
      glassOnlyPrice: '$220',
      fullAssemblyPrice: '$380 - $520',
      batteryPrice: '$139',
      chargingPortPrice: '$129',
      backGlassPrice: '$149'
    },
    repairTime: '60 Minutes',
    warranty: '90-Day Parts & Labor Warranty',
    specifications: {
      display: 'Dynamic AMOLED 2X 120Hz Corning Gorilla Armor Plus',
      batteryCapacity: '5,000 mAh Silicon-Carbon High-Density Cell',
      processor: 'Snapdragon 8 Elite for Galaxy'
    },
    commonIssues: [
      {
        title: 'Cracked Gorilla Armor Cover Glass',
        description: 'Fractured front glass layer or vertical line AMOLED failure.'
      },
      {
        title: 'S-Pen Digitizer Inaccuracy',
        description: 'Unresponsive stylus areas on damaged display assemblies.'
      }
    ],
    faqs: [
      { question: 'How much does a Samsung S26 Ultra screen repair cost?', answer: 'Galaxy S26 Ultra screen replacement costs range from $380 to $520 depending on AMOLED display panel grade.' },
      { question: 'Does S-Pen still work after screen replacement?', answer: 'Yes! Our OEM AMOLED display assemblies include integrated Wacom S-Pen digitizers.' }
    ]
  },
  {
    id: 'galaxy-s25-repair-newcastle',
    slug: 'galaxy-s25-repair-newcastle',
    brand: 'samsung',
    brandHubUrl: '/brand/samsung',
    pillarGuideUrl: '/repair-guides/samsung-repair-newcastle',
    modelName: 'Samsung Galaxy S25 / S25+ / S25 Ultra',
    title: 'Samsung Galaxy S25 Screen Repair Newcastle',
    metaDescription: 'Fast Samsung Galaxy S25, S25+ & Ultra repair in Newcastle & Mayfield. Screen replacement, battery swaps, charging port fix & same-day turnaround.',
    heroHeadline: 'Samsung Galaxy S25 Repair Newcastle: Same-Day Fix',
    heroSubdeck: 'Dedicated repair service for Samsung Galaxy S25, S25+, and S25 Ultra. Premium Dynamic AMOLED screen replacements, battery swaps, camera repairs, and USB-C port fixes in Mayfield.',
    pricing: {
      glassOnlyPrice: '$180',
      fullAssemblyPrice: '$280 - $440',
      batteryPrice: '$129',
      chargingPortPrice: '$119',
      backGlassPrice: '$130'
    },
    repairTime: '60 Minutes',
    warranty: '90-Day Parts & Labor Warranty',
    specifications: {
      display: 'Dynamic AMOLED 2X 120Hz LTPO Display',
      batteryCapacity: '4,000 mAh (S25) / 5,000 mAh (S25 Ultra)',
      processor: 'Snapdragon 8 Gen 4 / Galaxy AI Chip'
    },
    commonIssues: [
      {
        title: 'Cracked Front Screen & Bleeding Black Pixels',
        description: 'Impact damage causing black ink spots or unresponsive touch.'
      },
      {
        title: 'Rapid Battery Depletion',
        description: 'Battery health degradation causing sudden shutdowns.'
      }
    ],
    faqs: [
      { question: 'How long does a Samsung S25 screen replacement take?', answer: 'Samsung S25 screen repairs are completed in approximately 60 minutes.' },
      { question: 'Is my data safe during Samsung S25 repair?', answer: 'Yes, your files and photos remain completely safe.' }
    ]
  },
  {
    id: 'pixel-10-pro-repair-newcastle',
    slug: 'pixel-10-pro-repair-newcastle',
    brand: 'google',
    brandHubUrl: '/brand/google',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'Google Pixel 10 / 10 Pro / 10 Pro XL',
    title: 'Google Pixel 10 Pro Repair Newcastle — Screen & Battery',
    metaDescription: 'Expert Google Pixel 10 Pro & Pro XL repair in Newcastle & Mayfield. OLED display replacement, Tensor battery swaps & same-day service.',
    heroHeadline: 'Google Pixel 10 Pro Repair Newcastle: Pixel Specialists',
    heroSubdeck: 'Specialized repairs for Google Pixel 10, Pixel 10 Pro, and Pixel 10 Pro XL. OLED display replacements, Tensor battery swaps, camera lens fixes, and USB-C port repairs in Mayfield.',
    pricing: {
      glassOnlyPrice: '$180',
      fullAssemblyPrice: '$280 - $380',
      batteryPrice: '$129',
      chargingPortPrice: '$119',
      backGlassPrice: '$140'
    },
    repairTime: '45 - 60 Minutes',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: 'Super Actua LTPO OLED 120Hz 3000 nits Peak',
      batteryCapacity: '4,700 mAh to 5,060 mAh Fast Charge Cell',
      processor: 'Google Tensor G5 AI Processor'
    },
    commonIssues: [
      {
        title: 'Shattered Actua Display & Green Line Flickering',
        description: 'Dropped devices with shattered OLED cover glass or green vertical lines.'
      },
      {
        title: 'Tensor Overheating & Battery Drain',
        description: 'Heavy AI processing usage causing thermal throttling and degraded battery.'
      }
    ],
    faqs: [
      { question: 'How much does a Google Pixel 10 Pro screen repair cost?', answer: 'Pixel 10 Pro screen replacements range from $280 to $380 depending on screen size.' },
      { question: 'Do you use genuine-quality Google Pixel parts?', answer: 'Yes! We install OEM-grade Actua OLED display assemblies and high-capacity battery cells.' }
    ]
  },
  {
    id: 'pixel-9-repair-newcastle',
    slug: 'pixel-9-repair-newcastle',
    brand: 'google',
    brandHubUrl: '/brand/google',
    pillarGuideUrl: '/repair-guides/phone-screen-repair-newcastle',
    modelName: 'Google Pixel 9 / 9 Pro / 9 Pro XL / 9a',
    title: 'Google Pixel 9 Screen Repair Newcastle',
    metaDescription: 'Fast Google Pixel 9, 9 Pro & 9a repair in Newcastle & Mayfield. Actua OLED screen replacement, battery swap & camera lens fix.',
    heroHeadline: 'Google Pixel 9 Repair Newcastle: Fast Local Service',
    heroSubdeck: 'Reliable repair solutions for Google Pixel 9, Pixel 9 Pro, Pixel 9 Pro XL, and Pixel 9a. OLED screen replacements, battery swaps, camera glass repairs, and charging port fixes in Mayfield.',
    pricing: {
      glassOnlyPrice: '$160',
      fullAssemblyPrice: '$240 - $340',
      batteryPrice: '$119',
      chargingPortPrice: '$109',
      backGlassPrice: '$130'
    },
    repairTime: '45 Minutes',
    warranty: '90-Day Comprehensive Guarantee',
    specifications: {
      display: 'Actua OLED 120Hz Gorilla Glass Victus 2',
      batteryCapacity: '4,700 mAh Fast Charging Cell',
      processor: 'Google Tensor G4 Chip'
    },
    commonIssues: [
      {
        title: 'Cracked Front Glass & Unresponsive Touchscreen',
        description: 'Shattered front glass with unresponsive touch sensors.'
      },
      {
        title: 'Camera Glass Cracks & Dust Ingress',
        description: 'Fractured rear camera visor glass showing dark spots on photos.'
      }
    ],
    faqs: [
      { question: 'How long does a Google Pixel 9 screen repair take?', answer: 'Pixel 9 screen replacements are completed in 45 minutes at our Mayfield shop.' },
      { question: 'How much is a Pixel 9 screen replacement in Newcastle?', answer: 'Pixel 9 screen repairs cost between $240 and $340 depending on Pro vs standard model.' }
    ]
  }
];
