export interface ModelRepairInfo {
  id: string;
  slug: string;
  brand: 'apple' | 'samsung' | 'google';
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
  {
    id: 'iphone-17-repair-newcastle',
    slug: 'iphone-17-repair-newcastle',
    brand: 'apple',
    brandHubUrl: '/brand/apple',
    pillarGuideUrl: '/repair-guides/iphone-repair-newcastle',
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
    pillarGuideUrl: '/repair-guides/iphone-repair-newcastle',
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
    pillarGuideUrl: '/repair-guides/iphone-repair-newcastle',
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
        title: 'Titanium Frame Scratches & Shattered Glass',
        description: 'Heavy impact causing front glass fracture or rear back plate cracking.'
      },
      {
        title: 'USB-C Port Loose Cable Ingress',
        description: 'Lint buildup preventing full USB-PD fast charging speeds.'
      },
      {
        title: '5x Telephoto Camera Shaking',
        description: 'Tetraprism lens vibration or broken rear camera lens cover.'
      }
    ],
    faqs: [
      { question: 'How much does an iPhone 15 Pro screen repair cost?', answer: 'iPhone 15 Pro screen repairs range from $180 (glass refurbishing) to $380 (full Pro Max OLED assembly).' },
      { question: 'Can you fix the back glass on an iPhone 15 Pro?', answer: 'Yes! We use laser technology to remove shattered rear glass without dismantling the motherboard.' }
    ]
  },
  {
    id: 'galaxy-s26-ultra-repair-newcastle',
    slug: 'galaxy-s26-ultra-repair-newcastle',
    brand: 'samsung',
    brandHubUrl: '/brand/samsung',
    pillarGuideUrl: '/repair-guides/samsung-repair-newcastle',
    modelName: 'Samsung Galaxy S26 Ultra',
    title: 'Samsung Galaxy S26 Ultra Repair Newcastle — Screen & Battery',
    metaDescription: 'Specialist Samsung Galaxy S26 Ultra repair in Newcastle & Mayfield. Dynamic AMOLED 2X screen fix, S-Pen digitizer, battery swap & Knox security preserved.',
    heroHeadline: 'Samsung Galaxy S26 Ultra Repair Newcastle: AMOLED Display Specialists',
    heroSubdeck: 'Expert repairs for Samsung’s premier flagship. Dynamic AMOLED 2X screen replacements, S-Pen digitizer alignment, battery swaps, camera lens restoration, and Knox security preservation in Mayfield.',
    pricing: {
      glassOnlyPrice: '$220',
      fullAssemblyPrice: '$380 - $520',
      batteryPrice: '$139',
      chargingPortPrice: '$129',
      backGlassPrice: '$140'
    },
    repairTime: '60 - 90 Minutes',
    warranty: '90-Day Parts & Labor Guarantee',
    specifications: {
      display: '6.8" Dynamic AMOLED 2X 120Hz Vision Booster / Armor Aluminum',
      batteryCapacity: '5,000 mAh 45W Fast Charging Cell',
      processor: 'Snapdragon 8 Gen 5 / Exynos 2600 AI Engine'
    },
    commonIssues: [
      {
        title: 'Shattered AMOLED Glass & Vertical Green Lines',
        description: 'Impact drops causing glass fractures or internal AMOLED green line pixel failure.'
      },
      {
        title: 'S-Pen Digitizer Inaccuracy',
        description: 'Unresponsive stylus areas on damaged display assemblies.'
      },
      {
        title: '200MP Camera Zoom Shaking',
        description: 'Mechanical actuator failure on periscope telephoto lens.'
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
