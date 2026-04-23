export interface Brand {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  color: string;
  deviceCategories: {
    name: string;
    models: string[];
  }[];
  features: string[];
  seoModelDump: string;
}

export const brands: Brand[] = [
  { 
    id: 'apple', 
    name: 'Apple', 
    description: 'Expert iPhone, iPad, and MacBook repairs. From shattered screens to logic board level micro-soldering.', 
    longDescription: 'Apple devices are beautifully crafted but require specialized tools and deep expertise to repair correctly. At Mayfield Phone Repair, our technicians are highly trained in handling everything from the latest iPhone 17 Pro Max down to legacy devices. We use premium OEM-spec displays that maintain your True Tone functionality, original battery capacities to ensure lasting power, and specialized water-resistant seals to ensure your device goes back together exactly as Apple intended.',
    color: 'from-slate-800 to-black', 
    deviceCategories: [
      { name: 'iPhone', models: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 14 Series', 'iPhone 13 / 12 Series'] },
      { name: 'iPad', models: ['iPad Pro (M4)', 'iPad Air (M2)', 'iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Mini (Newest)', 'iPad (Standard Gen 7-10)'] },
      { name: 'Watch & Mac', models: ['Apple Watch Ultra 3', 'Apple Watch Ultra 2', 'Apple Watch Series 10/9/8', 'MacBook Air (M3/M2)', 'MacBook Pro'] }
    ],
    features: ['True Tone Restoration', 'Face ID Safe Repairs', 'Genuine Spec Batteries', 'Water-Resistant Resealing'],
    seoModelDump: 'iPhone 17 Pro Max, iPhone 17 Pro, iPhone 17 Plus, iPhone 17, iPhone 16 Pro Max, iPhone 16 Pro, iPhone 16 Plus, iPhone 16, iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15 Plus, iPhone 15, iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14, iPhone 13 Pro Max, iPhone 13 Pro, iPhone 13, iPhone 13 Mini, iPhone 12 Pro Max, iPhone 12 Pro, iPhone 12, iPhone 12 Mini, iPhone 11 Pro Max, iPhone 11 Pro, iPhone 11, iPhone XS Max, iPhone XS, iPhone XR, iPhone X, iPhone SE (3rd Gen), iPhone SE (2nd Gen), iPhone 8 Plus, iPhone 8, iPad Pro M4, iPad Air M2, iPad Pro 12.9-inch (1st to 6th Gen), iPad Pro 11-inch (1st to 4th Gen), iPad Pro 10.5-inch, iPad Air (1st to 5th Gen), iPad mini (1st to 6th Gen), iPad (5th to 10th Gen), Apple Watch Ultra 3, Apple Watch Ultra 2, Apple Watch Ultra, Apple Watch Series 10, Apple Watch Series 9, Apple Watch Series 8, Apple Watch Series 7, Apple Watch SE (1st and 2nd Gen), MacBook Pro 16-inch (M3 Max, M3 Pro, M2 Max, M2 Pro, M1 Max, M1 Pro, Intel), MacBook Pro 14-inch, MacBook Air 15-inch, MacBook Air 13-inch (M3, M2, M1, Intel), iMac, Mac mini, Mac Studio, Mac Pro.'
  },
  { 
    id: 'samsung', 
    name: 'Samsung', 
    description: 'Samsung Galaxy S-series, Note, Z-Fold, and A-series repairs using premium quality AMOLED components.', 
    longDescription: 'Samsung Galaxy devices feature some of the most vibrant and advanced AMOLED displays on the market. When these break, you need a repair shop that doesn\'t compromise on screen quality. We source original-specification Samsung replacement parts to ensure your in-display fingerprint reader works flawlessly, your colors stay punchy, and your camera lenses remain scratch-free. We also specialize in the complex mechanics of Z-Fold and Z-Flip screen replacements.',
    color: 'from-blue-600 to-blue-900', 
    deviceCategories: [
      { name: 'Galaxy S Series', models: ['Galaxy S26 Ultra', 'Galaxy S26+', 'Galaxy S26', 'Galaxy S25 Ultra', 'Galaxy S25+', 'Galaxy S25', 'Galaxy S24 Ultra', 'Galaxy S24 Series', 'Galaxy S23 Series'] },
      { name: 'Z Fold & Flip', models: ['Galaxy Z Fold 7', 'Galaxy Z Flip 7', 'Galaxy Z Fold 6', 'Galaxy Z Flip 6', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5'] },
      { name: 'Galaxy A & Note', models: ['Galaxy A55 5G', 'Galaxy A35', 'Galaxy A54', 'Galaxy Note 20 Ultra', 'Galaxy Note 20', 'Galaxy Note 10+'] }
    ],
    features: ['AMOLED Original Spec Displays', 'In-Screen Fingerprint Calibration', 'Camera Glass Replacement', 'Back Glass Assembly'],
    seoModelDump: 'Samsung Galaxy S26 Ultra, Galaxy S26+, Galaxy S26, Galaxy S25 Ultra, Galaxy S25+, Galaxy S25, Galaxy S24 Ultra, Galaxy S24+, Galaxy S24, Galaxy S23 Ultra, Galaxy S23+, Galaxy S23, Galaxy S23 FE, Galaxy S22 Ultra, Galaxy S22+, Galaxy S22, Galaxy S21 Ultra, Galaxy S21+, Galaxy S21, Galaxy S21 FE, Galaxy S20 Ultra, Galaxy S20+, Galaxy S20, Galaxy S20 FE, Galaxy Z Fold 7, Galaxy Z Flip 7, Galaxy Z Fold 6, Galaxy Z Flip 6, Galaxy Z Fold 5, Galaxy Z Flip 5, Galaxy Z Fold 4, Galaxy Z Flip 4, Galaxy Z Fold 3, Galaxy Z Flip 3, Galaxy Note 20 Ultra, Galaxy Note 20, Galaxy Note 10+, Galaxy Note 10, Galaxy A55 5G, Galaxy A35 5G, Galaxy A54 5G, Galaxy A34 5G, Galaxy A14 5G, Galaxy A53 5G, Galaxy A33 5G, Galaxy A73, Galaxy Tab S9 Ultra, Galaxy Tab S9+, Galaxy Tab S9, Galaxy Tab S8 Ultra, Galaxy Tab S8+, Galaxy Tab S8.'
  },
  { 
    id: 'google', 
    name: 'Google', 
    description: 'Fast screen, battery, and camera replacements for all Google Pixel models.', 
    longDescription: 'Google Pixel phones are renowned for their camera prowess and clean software software experience. If you\'ve shattered your Pixel screen or noticed a severe drop in battery life, our specialists can help. We have deep experience safely navigating the internal architecture of Google devices, ensuring that components like the Tensor chip cooling assemblies and delicate camera sensors are perfectly preserved during the repair process.',
    color: 'from-blue-500 to-green-600', 
    deviceCategories: [
      { name: 'Pixel Pro Models', models: ['Pixel 10 Pro', 'Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 8 Pro', 'Pixel 7 Pro'] },
      { name: 'Pixel Standard Models', models: ['Pixel 10', 'Pixel 9', 'Pixel 8', 'Pixel 7', 'Pixel 6'] },
      { name: 'Pixel A-Series & Fold', models: ['Pixel Fold 2', 'Pixel Fold', 'Pixel 9a', 'Pixel 8a', 'Pixel 7a'] }
    ],
    features: ['Tensor Chip Safety Cooling', 'Camera Module Replacement', 'Fast Charging Port Fixes', 'Haptic Motor Restoration'],
    seoModelDump: 'Google Pixel 10 Pro XL, Google Pixel 10 Pro, Google Pixel 10, Google Pixel 9 Pro XL, Google Pixel 9 Pro, Google Pixel 9, Google Pixel 9a, Google Pixel Fold 2, Google Pixel Fold, Google Pixel 8 Pro, Google Pixel 8, Google Pixel 8a, Google Pixel 7 Pro, Google Pixel 7, Google Pixel 7a, Google Pixel 6 Pro, Google Pixel 6, Google Pixel 6a, Google Pixel 5, Google Pixel 5a, Google Pixel 4a 5G, Google Pixel 4a, Google Pixel 4 XL, Google Pixel 4, Google Pixel Tablet, Google Pixel Watch 3, Google Pixel Watch 2, Google Pixel Watch.'
  },
  { 
    id: 'oppo', 
    name: 'Oppo', 
    description: 'Reliable repair services for Oppo Find, Reno, and A-series smartphones.', 
    longDescription: 'Oppo pushes the boundaries of fast charging with their SuperVOOC technology and sleek form factors. When your charging port fails or your screen shatters, it requires prompt, professional attention. We stock a wide variety of parts for the Find X series all the way down to the budget A-series, meaning you won\'t be waiting weeks for overseas shipping. Get your Oppo back up to 100% capacity in no time.',
    color: 'from-emerald-500 to-teal-700', 
    deviceCategories: [
      { name: 'Find X Series', models: ['Find X7 Ultra', 'Find X7', 'Find X6 Pro', 'Find X5 Pro', 'Find X3 Pro'] },
      { name: 'Reno Series', models: ['Reno 12 Pro', 'Reno 12', 'Reno 11 Pro', 'Reno 10 Pro+', 'Reno 8 Pro'] },
      { name: 'A Series & Foldables', models: ['Find N3 Fold', 'Find N3 Flip', 'A79 5G', 'A78 5G', 'A58'] }
    ],
    features: ['SuperVOOC Port Preservation', 'Curved Display Specialization', 'Affordable Screen Fixes', 'Quick Turnaround'],
    seoModelDump: 'OPPO Find X7 Ultra, OPPO Find X7, OPPO Find X6 Pro, OPPO Find X6, OPPO Find X5 Pro, OPPO Find X5, OPPO Find X3 Pro, OPPO Find X3 Neo, OPPO Find X2 Pro, OPPO Find N3, OPPO Find N3 Flip, OPPO Find N2 Flip, OPPO Reno 12 Pro, OPPO Reno 12, OPPO Reno 11 Pro, OPPO Reno 11, OPPO Reno 10 Pro+, OPPO Reno 10 Pro, OPPO Reno 10 5G, OPPO Reno 8 Pro, OPPO Reno 8 5G, OPPO Reno 7, OPPO A79 5G, OPPO A78 5G, OPPO A77 5G, OPPO A58 5G, OPPO A54 5G, OPPO A17, OPPO A16s, OPPO Pad 2, OPPO Pad Air.'
  },
  { 
    id: 'motorola', 
    name: 'Motorola', 
    description: 'Moto Edge, Razr, and G-series screen and hardware component repairs.', 
    longDescription: 'From the durable G-series to the cutting-edge foldable Razr, Motorola offers a vast lineup of devices. Mayfield Phone Repair technicians are well-versed in Moto components. Whether it is replacing a massive battery in the G Power series or fixing the hinge mechanism on a Razr, we provide cost-effective options that are often a fraction of the price of replacing the entire handset altogether.',
    color: 'from-indigo-500 to-purple-800', 
    deviceCategories: [
      { name: 'Razr (Foldables)', models: ['Motorola Razr+ (2024)', 'Motorola Razr (2024)', 'Razr+ (2023)', 'Razr 5G'] },
      { name: 'Edge Series', models: ['Edge 50 Pro', 'Edge 50 Ultra', 'Edge 40 Pro', 'Edge 40', 'Edge 30 Ultra'] },
      { name: 'G Series (Moto G)', models: ['Moto G Power 5G (2024)', 'Moto G Stylus 5G (2024)', 'Moto G Play', 'Moto G84'] }
    ],
    features: ['Heavy-Duty Battery Swaps', 'Foldable Hinge Care', 'Affordable A-la-carte Repairs', 'Stylus Screen Compatibility'],
    seoModelDump: 'Motorola Razr+ 2024, Motorola Razr 2024, Motorola Razr+ 2023, Motorola Razr 2023, Motorola Razr 5G 2020, Motorola Edge 50 Ultra, Motorola Edge 50 Pro, Motorola Edge 50 Fusion, Motorola Edge 40 Pro, Motorola Edge 40, Motorola Edge 30 Ultra, Motorola Edge 30 Pro, Motorola Edge 30 Fusion, Motorola Edge 20 Pro, Moto G Stylus 5G 2024, Moto G Power 5G 2024, Moto G Play 2024, Moto G84 5G, Moto G54 5G, Moto G14, Moto G100, Moto G200, Moto Defy.'
  },
  { 
    id: 'huawei', 
    name: 'Huawei', 
    description: 'Specialized Huawei Pura and Mate series device diagnosis and repairs.', 
    longDescription: 'Huawei devices feature complex internal layouts particularly focused around their massive camera modules and curved waterfall displays. Sourcing high-quality parts for Huawei can be difficult for average consumers, but our established network allows us to get the right components fast. We handle intense glass replacements, heavy impact frame damage, and logic board issues across all Huawei models.',
    color: 'from-red-600 to-rose-900', 
    deviceCategories: [
      { name: 'Pura/P Series', models: ['Pura 70 Ultra', 'Pura 70 Pro', 'Pura 70', 'P60 Pro', 'P50 Pro'] },
      { name: 'Mate Series', models: ['Mate 60 Pro', 'Mate 60', 'Mate 50 Pro', 'Mate 40 Pro', 'Mate 30 Pro'] },
      { name: 'Foldables & Nova', models: ['Mate X5', 'Mate X3', 'P50 Pocket', 'Nova 12', 'Nova 11 Pro'] }
    ],
    features: ['XMAGE Lens Glass Repair', 'Waterfall Display Specialists', 'Micro-solder Component Fixes', 'Import Model Support'],
    seoModelDump: 'Huawei Pura 70 Ultra, Huawei Pura 70 Pro, Huawei Pura 70, Huawei P60 Pro, Huawei P60, Huawei P50 Pro, Huawei P50 Pocket, Huawei P40 Pro+, Huawei P40 Pro, Huawei P40, Huawei P30 Pro, Huawei P30, Huawei Mate 60 Pro+, Huawei Mate 60 Pro, Huawei Mate 60, Huawei Mate 50 Pro, Huawei Mate 50, Huawei Mate 40 Pro, Huawei Mate 30 Pro, Huawei Mate X5, Huawei Mate X3, Huawei Mate Xs 2, Huawei Nova 12 Pro, Huawei Nova 12, Huawei Nova 11 Pro, Huawei Nova 11, Huawei Nova 10 Pro, Huawei Nova 10, Huawei Y9 Prime, Huawei Y7, Huawei Watch GT 4, Huawei Watch Ultimate.'
  },
];
