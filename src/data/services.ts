import { Smartphone, Battery, Droplet, Settings, Layers, Camera, Zap, Laptop } from 'lucide-react';

export const servicesData = [
  {
    id: 'screen-repair',
    icon: Smartphone,
    title: 'Screen Repair',
    shortDesc: 'Cracked or shattered screen? For the best screen repair Mayfield has to offer, we replace displays for iPhone 17, 16, and Samsung S26 models in under 30 minutes.',
    heroTitle: 'Expert Screen Repair Mayfield | iPhone 17 & S26 Specialists',
    heroDescription: 'Don\'t let a cracked screen ruin your day. Our fast phone repair service specializes in seamless display replacements for the newest flagships like iPhone 17 Pro Max and Samsung S26 Ultra. We provide same day phone repair to get you back online instantly.',
    color: 'from-blue-600 to-indigo-600',
    content: [
      {
        heading: 'Why choose our screen repair service?',
        text: 'When searching for an "affordable phone repair near me", it\'s crucial to choose a team that uses premium parts. Cheap glass breaks easily and ruins touch sensitivity. We use OEM-spec screens that restore your device to factory condition. Whether you need an iPhone repair Mayfield service or complete Samsung repair Newcastle solutions, we\'ve got you covered. Plus, our dedicated phone repair Mayfield NSW location means you get local, trusted service.'
      },
      {
        heading: 'Common Screen Issues We Fix',
        list: [
          'Shattered or cracked front cover glass',
          'Bleeding colors, black ink spots, or dead pixels on the LCD/OLED',
          'Unresponsive touch screen or phantom touches',
          'Flickering, dimming, or completely blank displays'
        ]
      }
    ],
    features: ['30-Minute Turnaround', 'OEM-Spec Quality', 'True Tone Restoration', '90-Day Guarantee'],
  },
  {
    id: 'battery-replacement',
    icon: Battery,
    title: 'Battery Replacement',
    shortDesc: 'Is your phone dying quickly? Get a fresh battery replacement phone service today. We install premium batteries to restore your all-day life.',
    heroTitle: 'Professional Battery Replacement Phone Service',
    heroDescription: 'Bring your device back to peak performance. If your battery drains fast, suddenly drops percentages, or causes random shutdowns, our affordable phone repair near me guarantees a maximum-capacity battery installed in minutes.',
    color: 'from-emerald-500 to-teal-600',
    content: [
      {
        heading: 'Restore Your All-Day Battery Life',
        text: 'Batteries naturally degrade over time. Stop looking for a "mobile repair shop near me" and visit our dedicated facility for phone repair Newcastle and Mayfield. We stock genuine and high-capacity batteries for ultimate longevity. Get the fastest phone repair service for battery replacement without losing any of your data.'
      },
      {
        heading: 'Signs You Need a New Battery',
        list: [
          'Battery drops rapidly from 100% to 20% in just a few hours',
          'Phone randomly shuts down even when battery indicates 30-40%',
          'Device runs unusually hot during normal, everyday use',
          'Swollen battery causing the screen or back glass to physically lift'
        ]
      }
    ],
    features: ['Maximum Capacity Batteries', 'Safe Environmental Disposal', 'Zero Data Loss', 'Water Resistance Maintained'],
  },
  {
    id: 'water-damage',
    icon: Droplet,
    title: 'Water Damage',
    shortDesc: 'Dropped your phone in water? Bring it to us immediately for comprehensive logic board liquid damage treatment.',
    heroTitle: 'Liquid & Water Damage Repair',
    heroDescription: 'Spills and drops happen. If your device has suffered liquid damage, turn it off immediately and bring it to our phone repair Newcastle experts. We perform component-level cleaning to save your device.',
    color: 'from-cyan-500 to-blue-600',
    content: [
      {
        heading: 'Advanced Micro-Soldering and Ultrasonic Cleaning',
        text: 'Water damage is a race against time. The longer liquid sits on the logic board, the more corrosion occurs. We offer complex diagnostic testing and same day phone repair evaluations for liquid-damaged devices. Our comprehensive process makes us the top choice when you need an iPhone repair Mayfield or Samsung repair Newcastle expert.'
      },
      {
        heading: 'Crucial Steps If Your Phone Gets Wet',
        list: [
          'Turn off the device immediately—do not try to charge it!',
          'Remove the SIM card tray to let internal air flow',
          'Do NOT use rice; it does not solve internal logic board corrosion',
          'Bring it to a professional phone repair Mayfield NSW technician ASAP'
        ]
      }
    ],
    features: ['Ultrasonic Board Cleaning', 'Micro-Soldering Capabilities', 'Data Recovery Specialists', 'Free Comprehensive Assessment'],
  },
  {
    id: 'hardware-repair',
    icon: Settings,
    title: 'Hardware Repair',
    shortDesc: 'Buttons not working, speaker muffled, or logic board errors? We fix all internal and micro-soldering hardware problems.',
    heroTitle: 'Comprehensive Phone Hardware Repairs',
    heroDescription: 'From malfunctioning buttons and quiet ear speakers to complete logic board shorts, our mobile repair shop near me handles the complex hardware faults others turn away.',
    color: 'from-slate-700 to-slate-900',
    content: [
      {
        heading: 'Fixing Every Internal Component',
        text: 'If the volume buttons are stuck, or you can\'t hear callers during phone calls, you need hardware repair. We have the specialized components and micro-soldering skills required for precise fixes. As your premier destination for phone repair Newcastle and Mayfield, we ensure you won\'t have to buy an expensive new device just because a small part failed. Trust us for your next fast phone repair service.'
      },
      {
        heading: 'Common Hardware Repairs We Perform',
        list: [
          'Power button, volume rocker, and silent switch physical fixes',
          'Earpiece speaker, microphone, and loud speaker replacement',
          'Logic board micro-soldering and IC chip replacement',
          'Vibration motor and taptic engine restoration'
        ]
      }
    ],
    features: ['Precision Micro-Soldering', 'Original Quality Modules', 'Full Diagnostic Testing', 'Fast Turnaround Times'],
  },
  {
    id: 'back-glass-repair',
    icon: Layers,
    title: 'iPhone Back Glass Repair',
    shortDesc: 'Shattered back glass? We use precision laser technology for fast iPhone repair Mayfield services, restoring your device elegantly and securely.',
    heroTitle: 'Precision iPhone Back Glass Repair',
    heroDescription: 'A cracked back panel exposes your phone\'s internal components to moisture and dirt. When you need a reliable mobile repair shop near me, trust our team to safely and affordably replace shattered rear glass without dismantling the entire phone.',
    color: 'from-fuchsia-600 to-pink-600',
    content: [
      {
        heading: 'Laser-Guided Glass Removal',
        text: 'Ignoring shattered back glass can lead to camera failure or wireless charging issues. If you require expert iPhone repair Mayfield, our technicians handle the delicate removal process using state-of-the-art laser machinery. This prevents logic board damage and ensures a flawless fit. We deliver the same day phone repair service you expect right here in our Mayfield store.'
      },
      {
        heading: 'The Back Glass Repair Process',
        list: [
          'Laser-precise removal of shattered glass and hardened industrial adhesives',
          'Deep cleaning of the exposed chassis to prevent loose glass rattling',
          'Professional installation of OEM-grade rear glass panels',
          'Final industrial curing process for a permanent, water-resistant hold'
        ]
      }
    ],
    features: ['Precision Laser Removal', 'OEM-Grade Glass', 'Maintains Wireless Charging', 'Flawless Finish'],
  },
  {
    id: 'camera-repair',
    icon: Camera,
    title: 'Camera Repair',
    shortDesc: 'Blurry photos or failing focus? Our phone repair Newcastle team replaces scratched lenses and faulty camera modules so you can capture memories again.',
    heroTitle: 'Expert Smartphone Camera Repair',
    heroDescription: 'Don\'t miss the perfect shot. Whether your lens is cracked, the optical focus shakes, or the camera app shows a black screen, our same day phone repair guarantees crisp photos once again.',
    color: 'from-violet-500 to-purple-600',
    content: [
      {
        heading: 'Restoring Factory Optical Clarity',
        text: 'Modern smartphone cameras are incredibly complex, utilizing macro lenses and optical image stabilization. We source high-quality replacement modules for all leading brands. When locals search for an affordable phone repair near me, they choose us because our Samsung repair Newcastle and general camera services ensure factory-level performance.'
      },
      {
        heading: 'Camera Issues We Resolve Fast',
        list: [
          'Cracked, scratched, or completely shattered exterior camera glass lenses',
          'Optical Image Stabilization (OIS) shaking, buzzing, or failing to focus',
          'Dust specks, dark spots, or blemishes permanently appearing on your photos',
          'Front-facing "selfie" cameras disabled, blurry, or failing to open'
        ]
      }
    ],
    features: ['OIS Calibration', 'Dust-Free Installation', 'OEM-Spec Lens Glass', 'Same-Day Service'],
  },
  {
    id: 'charging-port-repair',
    icon: Zap,
    title: 'Charging Port Repair',
    shortDesc: 'iPhone 17 or Galaxy S26 won\'t charge? We clean, repair, or micro-solder faulty USB-C and Lightning ports to keep your battery powered.',
    heroTitle: 'Reliable Charging Port Repair | USB-C Experts',
    heroDescription: 'A phone that won\'t charge is a useless phone. Whether it\'s the new USB-C on the iPhone 17 or a Galaxy S26 port, rely on our affordable phone repair services in Mayfield to fix it fast.',
    color: 'from-amber-500 to-orange-600',
    content: [
      {
        heading: 'Don\'t Buy a New Phone—Fix the Port',
        text: 'Often, a failing charge port is just packed tightly with pocket lint or needs a minor micro-soldering fix. Before assuming you need a completely new device, let our experts professionally assess it. As the trusted leaders in phone repair Mayfield NSW, we secure loose components so your lightning or USB-C port holds a stable charge.'
      },
      {
        heading: 'Signs of a Failing Charging Port',
        list: [
          'The charging cable falls out easily or feels extremely loose when plugged in',
          'You must wiggle or bend the cord at an angle to get the battery icon to show',
          'The device charges very slowly or constantly reports moisture detected errors',
          'The internal port pins look visibly damaged, corroded, or bent'
        ]
      }
    ],
    features: ['Safe Debris Extraction', 'USB-C & Lightning Repair', 'Micro-Soldering Support', 'Free Diagnosis'],
  },
  {
    id: 'laptop-repair',
    icon: Laptop,
    title: 'Laptop & MacBook Repair',
    shortDesc: 'Expert laptop repair service for screen, battery, charging, or software issues on Macbooks and all major brands.',
    heroTitle: 'Professional Laptop & MacBook Repair',
    heroDescription: 'From shattered screens and dead batteries to charging failures and software crashes, we provide comprehensive repair services for all laptops including Apple MacBooks. Fast, reliable, and specialized service.',
    color: 'from-blue-700 to-slate-800',
    content: [
      {
        heading: 'Comprehensive Laptop Hardware & Software Solutions',
        text: 'Laptops and MacBooks are essential for work, study, and daily life. When they break down, you need a prompt and professional solution. Our technicians are highly trained in diagnosing and fixing a wide range of laptop issues including screen replacements, battery swaps, charging port repairs, and resolving persistent software glitches.'
      },
      {
        heading: 'Common Laptop Repair Issues We Fix',
        list: [
          'Screen repair for cracked displays or severe dead pixel clusters',
          'Battery replacement for devices that won\'t hold a charge',
          'Charging port repair or logic board power delivery fixes',
          'Software issues, boot loops, virus removal, and OS reinstalls'
        ]
      }
    ],
    features: ['MacBook Specialist', 'Screen & Battery Fixes', 'No Fix, No Fee', 'Fast Turnaround'],
  }
];
