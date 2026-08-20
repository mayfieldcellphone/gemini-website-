export interface Brand {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  color: string;
  startingPrice: {
    screen: string;
    battery: string;
  };
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
    startingPrice: { screen: '129', battery: '89' },
    deviceCategories: [
      { name: 'iPhone', models: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 14 Series', 'iPhone 13 / 12 Series'] },
      { name: 'iPad', models: ['iPad Pro (M4)', 'iPad Air (M2)', 'iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Mini (Newest)', 'iPad (Standard Gen 7-10)'] },
      { name: 'MacBook Repair', models: ['MacBook Air (M3/M2)', 'MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Screen Replacement', 'MacBook Battery'] },
      { name: 'Apple Watch', models: ['Apple Watch Ultra 3', 'Apple Watch Ultra 2', 'Apple Watch Series 10/9/8'] }
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
    startingPrice: { screen: '149', battery: '99' },
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
    startingPrice: { screen: '139', battery: '89' },
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
    startingPrice: { screen: '119', battery: '79' },
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
    startingPrice: { screen: '99', battery: '69' },
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
    startingPrice: { screen: '129', battery: '79' },
    deviceCategories: [
      { name: 'Pura/P Series', models: ['Pura 70 Ultra', 'Pura 70 Pro', 'Pura 70', 'P60 Pro', 'P50 Pro'] },
      { name: 'Mate Series', models: ['Mate 60 Pro', 'Mate 60', 'Mate 50 Pro', 'Mate 40 Pro', 'Mate 30 Pro'] },
      { name: 'Foldables & Nova', models: ['Mate X5', 'Mate X3', 'P50 Pocket', 'Nova 12', 'Nova 11 Pro'] }
    ],
    features: ['XMAGE Lens Glass Repair', 'Waterfall Display Specialists', 'Micro-solder Component Fixes', 'Import Model Support'],
    seoModelDump: 'Huawei Pura 70 Ultra, Huawei Pura 70 Pro, Huawei Pura 70, Huawei P60 Pro, Huawei P60, Huawei P50 Pro, Huawei P50 Pocket, Huawei P40 Pro+, Huawei P40 Pro, Huawei P40, Huawei P30 Pro, Huawei P30, Huawei Mate 60 Pro+, Huawei Mate 60 Pro, Huawei Mate 60, Huawei Mate 50 Pro, Huawei Mate 50, Huawei Mate 40 Pro, Huawei Mate 30 Pro, Huawei Mate X5, Huawei Mate X3, Huawei Mate Xs 2, Huawei Nova 12 Pro, Huawei Nova 12, Huawei Nova 11 Pro, Huawei Nova 11, Huawei Nova 10 Pro, Huawei Nova 10, Huawei Y9 Prime, Huawei Y7, Huawei Watch GT 4, Huawei Watch Ultimate.'
  },
  {
    id: 'nokia',
    name: 'Nokia',
    description: 'Complete screen, battery, charging port, and software repairs for Nokia smartphones and classic devices.',
    longDescription: 'Nokia smartphones (HMD Global) are built for endurance, but accidental drops, worn-out charging ports, battery degradation, and liquid spills happen. At Mayfield Phone Repair, we specialize in repairing all Nokia G-series, X-series, C-series, and classic devices. Whether you need a fresh LCD display for your Nokia G60 5G, a high-capacity battery for your G42 or C32, USB-C port soldering, or virus/software removal, our Newcastle technicians have you covered with OEM-spec components and express turnaround times.',
    color: 'from-blue-700 to-cyan-900',
    startingPrice: { screen: '89', battery: '69' },
    deviceCategories: [
      { name: 'G-Series (Durable)', models: ['Nokia G60 5G', 'Nokia G42 5G', 'Nokia G22', 'Nokia G21', 'Nokia G50 5G', 'Nokia G11 Plus', 'Nokia G10'] },
      { name: 'X-Series & Rugged', models: ['Nokia XR21', 'Nokia XR20', 'Nokia X30 5G', 'Nokia X20 5G', 'Nokia X10 5G', 'Nokia 8.3 5G'] },
      { name: 'C-Series & Classics', models: ['Nokia C32', 'Nokia C31', 'Nokia C30', 'Nokia C22', 'Nokia C20', 'Nokia 7.2', 'Nokia 6.2', 'Nokia 5.4'] }
    ],
    features: ['Express LCD & OLED Fixes', 'Heavy-Duty Battery Replacements', 'Precision USB-C Port Repairs', 'Virus & Firmware Restoration'],
    seoModelDump: 'Nokia G60 5G, Nokia G42 5G, Nokia G22, Nokia G21, Nokia G50 5G, Nokia G20, Nokia G11 Plus, Nokia G10, Nokia XR21, Nokia XR20, Nokia X30 5G, Nokia X20, Nokia X10, Nokia 8.3 5G, Nokia 8.1, Nokia 7.2, Nokia 6.2, Nokia 5.4, Nokia 4.2, Nokia 3.4, Nokia 2.4, Nokia C32, Nokia C31, Nokia C30, Nokia C22, Nokia C20, Nokia C12, Nokia C10, Nokia 3310 4G, Nokia 8110 4G, Nokia 2780 Flip.'
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi / Redmi',
    description: 'Expert repair services for Xiaomi flagship, Redmi Note, and POCO smartphones.',
    longDescription: 'Xiaomi, Redmi, and POCO handsets offer high-end performance at competitive pricing, but finding local repair parts in Newcastle can be challenging. Mayfield Phone Repair stocks premium displays, original battery assemblies, and fast-charging USB ports for Xiaomi 14 Ultra, 13T Pro, Redmi Note 13 Pro+, POCO X6 Pro, and legacy models. We restore high refresh rate AMOLED screens, repair liquid damage, and remove malicious pop-ups or software bugs fast.',
    color: 'from-orange-500 to-amber-700',
    startingPrice: { screen: '99', battery: '69' },
    deviceCategories: [
      { name: 'Xiaomi Flagships', models: ['Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14', 'Xiaomi 13T Pro', 'Xiaomi 13 Ultra', 'Xiaomi 12 Pro'] },
      { name: 'Redmi Note Series', models: ['Redmi Note 13 Pro+ 5G', 'Redmi Note 13 Pro', 'Redmi Note 13 5G', 'Redmi Note 12 Pro', 'Redmi Note 11'] },
      { name: 'POCO Series', models: ['POCO X6 Pro 5G', 'POCO F6 Pro', 'POCO F5', 'POCO M6 Pro', 'POCO X5 Pro'] }
    ],
    features: ['120Hz AMOLED Screen Swaps', 'Fast-Charge Port Repairs', 'Battery Health Calibration', 'MIUI System Optimization'],
    seoModelDump: 'Xiaomi 14 Ultra, Xiaomi 14 Pro, Xiaomi 14, Xiaomi 13T Pro, Xiaomi 13T, Xiaomi 13 Ultra, Xiaomi 13 Pro, Xiaomi 13, Xiaomi 12T Pro, Xiaomi 12 Pro, Xiaomi 12, Redmi Note 13 Pro+, Redmi Note 13 Pro, Redmi Note 13 5G, Redmi Note 12 Pro 5G, Redmi Note 12, Redmi Note 11 Pro, Redmi Note 10, Redmi 13C, Redmi 12 5G, POCO X6 Pro, POCO X6, POCO F6 Pro, POCO F6, POCO F5 Pro, POCO F5, POCO X5 Pro 5G, POCO M6 Pro, Xiaomi Pad 6.'
  },
  {
    id: 'realme',
    name: 'Realme',
    description: 'Fast screen, battery, camera, and charging repairs for all Realme devices.',
    longDescription: 'Realme devices feature ultra-fast Dart/SuperVOOC charging speeds and vibrant displays. When your Realme screen cracks or the battery degrades, trust Mayfield Phone Repair. Our technicians service the Realme GT series, Numbered series (12 Pro+, 11 Pro), and budget C-series. We preserve fast charging circuits, restore multi-touch sensitivity, and repair physical drop damage using genuine-spec parts.',
    color: 'from-yellow-500 to-amber-600',
    startingPrice: { screen: '89', battery: '69' },
    deviceCategories: [
      { name: 'GT Performance Series', models: ['Realme GT 6', 'Realme GT 5 Pro', 'Realme GT Neo 5', 'Realme GT 2 Pro', 'Realme GT Master'] },
      { name: 'Pro & Number Series', models: ['Realme 12 Pro+ 5G', 'Realme 12 Pro', 'Realme 11 Pro+', 'Realme 10 Pro+', 'Realme 9 Pro+'] },
      { name: 'C-Series Budget', models: ['Realme C67 5G', 'Realme C55', 'Realme C53', 'Realme C35', 'Realme C33'] }
    ],
    features: ['SuperVOOC Port Care', 'Curved Display Fixes', 'Genuine Battery Swaps', 'Same-Day Service'],
    seoModelDump: 'Realme GT 6, Realme GT 5 Pro, Realme GT Neo 5, Realme GT Neo 3, Realme GT 2 Pro, Realme 12 Pro+ 5G, Realme 12 Pro 5G, Realme 12 5G, Realme 11 Pro+, Realme 11 Pro, Realme 11 5G, Realme 10 Pro+, Realme 10 Pro, Realme 9 Pro+, Realme 8 Pro, Realme C67, Realme C55, Realme C53, Realme C35, Realme C33, Realme C31, Realme C21Y, Realme Pad 2.'
  },
  {
    id: 'vivo',
    name: 'Vivo',
    description: 'Professional Vivo X-series, V-series, and Y-series phone repairs in Newcastle.',
    longDescription: 'Vivo smartphones stand out with Zeiss camera optics and slim designs. Sourcing quality replacement parts for Vivo requires established industry connections. At Mayfield Phone Repair, we repair shattered front glass, camera lens assemblies, swelling batteries, and faulty charging ports across Vivo X100 Pro, V30 Pro, V29, Y200, and Y78 models.',
    color: 'from-blue-500 to-indigo-800',
    startingPrice: { screen: '99', battery: '69' },
    deviceCategories: [
      { name: 'X Flagships', models: ['Vivo X100 Pro', 'Vivo X100', 'Vivo X90 Pro', 'Vivo X90', 'Vivo X80 Pro'] },
      { name: 'V-Series Style', models: ['Vivo V30 Pro', 'Vivo V30', 'Vivo V29 5G', 'Vivo V27 Pro', 'Vivo V25 5G'] },
      { name: 'Y-Series Value', models: ['Vivo Y200 5G', 'Vivo Y100 5G', 'Vivo Y78 5G', 'Vivo Y36', 'Vivo Y27'] }
    ],
    features: ['Zeiss Lens Glass Replacement', 'Aura Light Camera Repairs', 'Fast Charge Port Fixes', '90-Day Warranty'],
    seoModelDump: 'Vivo X100 Pro, Vivo X100, Vivo X90 Pro, Vivo X90, Vivo X80 Pro, Vivo X70 Pro+, Vivo V30 Pro, Vivo V30, Vivo V29 5G, Vivo V29e, Vivo V27 Pro, Vivo V25 5G, Vivo V23 5G, Vivo Y200 5G, Vivo Y100, Vivo Y78 5G, Vivo Y36, Vivo Y27 5G, Vivo Y20s, Vivo Y12s, Vivo T2 Pro.'
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    description: 'Specialized OnePlus flagship and Nord series screen and battery restoration.',
    longDescription: 'OnePlus devices are built for speed with Fluid AMOLED displays and Warp/SUPERVOOC charging. When you face a shattered screen, battery swelling, or camera blur on your OnePlus 12, 12R, OnePlus Open foldable, or Nord series, bring it to Mayfield Phone Repair. We preserve high refresh rates, in-display fingerprint sensors, and fast charging circuits with precision care.',
    color: 'from-red-600 to-slate-900',
    startingPrice: { screen: '129', battery: '79' },
    deviceCategories: [
      { name: 'Flagships & Foldables', models: ['OnePlus 12', 'OnePlus 12R', 'OnePlus Open (Fold)', 'OnePlus 11 5G', 'OnePlus 10 Pro'] },
      { name: 'Nord Series', models: ['OnePlus Nord 4', 'OnePlus Nord CE 4', 'OnePlus Nord 3 5G', 'OnePlus Nord N30 5G', 'OnePlus Nord 2T'] }
    ],
    features: ['Fluid AMOLED Specialists', 'Alert Slider & Haptic Repairs', 'Fast Charging Port Maintenance', 'Clean OxygenOS Diagnostics'],
    seoModelDump: 'OnePlus 12, OnePlus 12R, OnePlus Open, OnePlus 11 5G, OnePlus 10 Pro, OnePlus 10T, OnePlus 9 Pro, OnePlus 9, OnePlus 8T, OnePlus 8 Pro, OnePlus Nord 4, OnePlus Nord CE 4, OnePlus Nord 3 5G, OnePlus Nord CE 3 Lite, OnePlus Nord N30 5G, OnePlus Nord 2T, OnePlus Nord CE 2, OnePlus Pad.'
  },
  {
    id: 'sony',
    name: 'Sony Xperia',
    description: 'Precision Sony Xperia screen, camera, and battery repairs for creators and tech enthusiasts.',
    longDescription: 'Sony Xperia phones feature unique 21:9 OLED displays, dedicated shutter buttons, and professional Alpha camera sensors. Sourcing original Xperia displays and water-resistant seals requires expert hands. Mayfield Phone Repair fixes Sony Xperia 1 VI, 5 V, 10 VI, and legacy models with total precision, preserving camera shutter keys and audio jack components.',
    color: 'from-slate-900 to-violet-950',
    startingPrice: { screen: '139', battery: '89' },
    deviceCategories: [
      { name: 'Xperia 1 Pro Series', models: ['Sony Xperia 1 VI', 'Sony Xperia 1 V', 'Sony Xperia 1 IV', 'Sony Xperia PRO-I'] },
      { name: 'Xperia 5 & 10 Series', models: ['Sony Xperia 5 V', 'Sony Xperia 5 IV', 'Sony Xperia 10 VI', 'Sony Xperia 10 V'] }
    ],
    features: ['21:9 4K OLED Screen Restoration', 'Alpha Camera Sensor Cleaning', '3.5mm Headphone Jack Fixes', 'Water-Resistant Resealing'],
    seoModelDump: 'Sony Xperia 1 VI, Sony Xperia 1 V, Sony Xperia 1 IV, Sony Xperia 1 III, Sony Xperia 1 II, Sony Xperia PRO-I, Sony Xperia 5 V, Sony Xperia 5 IV, Sony Xperia 5 III, Sony Xperia 10 VI, Sony Xperia 10 V, Sony Xperia 10 IV, Sony Xperia L4, Sony Xperia XZ3, Sony Xperia XZ2.'
  },
  {
    id: 'asus',
    name: 'Asus & ROG Phone',
    description: 'Dedicated ROG Phone gaming handheld and ZenFone compact repair specialists.',
    longDescription: 'Asus ROG Phones and ZenFones pack advanced cooling systems, side-mounted charging ports, AirTriggers, and ultra-high refresh rate displays. If your ROG Phone 8 Pro, ROG Phone 7, or ZenFone 11 Ultra suffers from cracked glass, thermal throttling, or broken shoulder triggers, Mayfield Phone Repair provides expert micro-soldering and modular component swaps.',
    color: 'from-red-700 to-gray-900',
    startingPrice: { screen: '149', battery: '89' },
    deviceCategories: [
      { name: 'ROG Gaming Phones', models: ['Asus ROG Phone 8 Pro', 'Asus ROG Phone 8', 'Asus ROG Phone 7 Ultimate', 'Asus ROG Phone 6'] },
      { name: 'ZenFone Series', models: ['Asus ZenFone 11 Ultra', 'Asus ZenFone 10', 'Asus ZenFone 9', 'Asus ZenFone 8'] }
    ],
    features: ['165Hz AMOLED Screen Fixes', 'Dual USB-C Port Repairs', 'Cooling System Maintenance', 'AirTrigger Sensor Care'],
    seoModelDump: 'Asus ROG Phone 8 Pro, Asus ROG Phone 8, Asus ROG Phone 7 Ultimate, Asus ROG Phone 7, Asus ROG Phone 6 Pro, Asus ROG Phone 6, Asus ROG Phone 5s, Asus ROG Phone 5, Asus ZenFone 11 Ultra, Asus ZenFone 10, Asus ZenFone 9, Asus ZenFone 8, Asus ZenFone 7 Pro.'
  },
  {
    id: 'tcl',
    name: 'TCL',
    description: 'Affordable TCL smartphone and NXTPAPER display screen and hardware repairs.',
    longDescription: 'TCL phones feature NXTPAPER matte eye-care screens and high-value hardware. When a TCL 50 SE, 40 NXTPAPER, or 30 SE gets dropped or refuses to charge, Mayfield Phone Repair offers budget-friendly screen replacements, battery swaps, and port fixes to keep your device working smoothly without breaking the bank.',
    color: 'from-rose-600 to-red-800',
    startingPrice: { screen: '89', battery: '69' },
    deviceCategories: [
      { name: 'NXTPAPER Eye Care', models: ['TCL 50 NXTPAPER 5G', 'TCL 40 NXTPAPER', 'TCL 40 NXTPAPER 5G'] },
      { name: '50 & 40 Series', models: ['TCL 50 SE', 'TCL 505', 'TCL 40 SE', 'TCL 403', 'TCL 408'] },
      { name: '30 & 20 Series', models: ['TCL 30 SE', 'TCL 30+', 'TCL 20 Pro 5G', 'TCL 20 SE', 'TCL 10 Pro'] }
    ],
    features: ['NXTPAPER Matte Screen Care', 'Budget-Friendly Part Swaps', 'Fast USB-C Port Soldering', 'Same-Day Diagnostics'],
    seoModelDump: 'TCL 50 NXTPAPER 5G, TCL 40 NXTPAPER, TCL 50 SE, TCL 505, TCL 40 SE, TCL 403, TCL 408, TCL 30 SE, TCL 30+, TCL 30 5G, TCL 20 Pro 5G, TCL 20 SE, TCL 20 5G, TCL 10 Pro, TCL 10L, TCL TAB 10 Gen 2.'
  },
  {
    id: 'nothing',
    name: 'Nothing Phone',
    description: 'Specialized Nothing Phone (1, 2, 2a) Glyph interface and OLED display repair.',
    longDescription: 'Nothing Phones stand out with transparent back covers, LED Glyph interfaces, and clean Nothing OS. Repairing a Nothing Phone requires careful disassembly so the delicate rear LED light strips and wireless charging coils remain undamaged. Mayfield Phone Repair provides exact screen replacements, back glass restoration, and battery swaps for Nothing Phone (2a), Phone (2), and Phone (1).',
    color: 'from-slate-900 to-zinc-950',
    startingPrice: { screen: '129', battery: '79' },
    deviceCategories: [
      { name: 'Nothing Handsets', models: ['Nothing Phone (2a) Plus', 'Nothing Phone (2a)', 'Nothing Phone (2)', 'Nothing Phone (1)', 'CMF Phone 1'] }
    ],
    features: ['Glyph LED Strip Protection', 'Transparent Back Glass Care', '120Hz Flexible OLED Fixes', 'Nothing OS Diagnostics'],
    seoModelDump: 'Nothing Phone (2a) Plus, Nothing Phone (2a), Nothing Phone (2), Nothing Phone (1), CMF Phone 1 by Nothing, Nothing Ear, Nothing Ear (a).'
  },
  {
    id: 'zte',
    name: 'ZTE & RedMagic',
    description: 'Expert ZTE Blade and RedMagic gaming phone hardware and display repairs.',
    longDescription: 'ZTE and RedMagic offer extreme gaming performance with under-display selfie cameras and active internal cooling fans. When your RedMagic 9 Pro, Nubia Z60 Ultra, or ZTE Blade screen snaps or stops charging, trust Mayfield Phone Repair for precision teardown, screen replacements, and cooling fan repairs.',
    color: 'from-red-800 to-stone-900',
    startingPrice: { screen: '99', battery: '69' },
    deviceCategories: [
      { name: 'RedMagic Gaming', models: ['RedMagic 9 Pro', 'RedMagic 8S Pro', 'RedMagic 7 Pro', 'Nubia Z60 Ultra'] },
      { name: 'ZTE Blade Value', models: ['ZTE Blade V50 Design', 'ZTE Blade A73 5G', 'ZTE Blade A53 Pro', 'ZTE Blade V40'] }
    ],
    features: ['Under-Display Camera Protection', 'Internal Fan Maintenance', 'Heavy Duty Battery Swaps', 'Gamer Trigger Fixes'],
    seoModelDump: 'RedMagic 9 Pro, RedMagic 8S Pro, RedMagic 8 Pro, RedMagic 7 Pro, Nubia Z60 Ultra, Nubia Z50 Ultra, ZTE Blade V50, ZTE Blade A73 5G, ZTE Blade A53 Pro, ZTE Blade V40, ZTE Axon 40 Ultra.'
  }
];
