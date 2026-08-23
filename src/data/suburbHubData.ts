export interface SuburbHubInfo {
  id: string;
  name: string;
  postcode: string;
  drivingTime: string;
  distanceKm: string;
  travelRoute: string;
  landmarks: string[];
  nearbySuburbs: string[];
  heroHeadline: string;
  metaDescription: string;
  suburbIntro: string;
  localConvenienceNote: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const suburbHubList: SuburbHubInfo[] = [
  {
    id: 'newcastle',
    name: 'Newcastle',
    postcode: '2300',
    drivingTime: '10 minutes',
    distanceKm: '6.5 km',
    travelRoute: 'via Maitland Rd / A43 direct into Mayfield',
    landmarks: ['Nobby’s Beach & Lighthouse', 'Newcastle Beach', 'Wests City', 'Newcastle East Heritage Precinct', 'Honeysuckle Waterfront'],
    nearbySuburbs: ['Newcastle West', 'The Junction', 'Merewether', 'Bar Beach'],
    heroHeadline: 'Phone Repair Newcastle CBD & East | Express Service in Mayfield',
    metaDescription: 'Trusted phone repair for Newcastle CBD residents & businesses. Same-day screen repair, battery replacement & water damage fixes just 10 mins away in Mayfield.',
    suburbIntro: 'Living or working in Newcastle CBD, Honeysuckle, or Newcastle East? When your iPhone, Samsung Galaxy, or Google Pixel breaks, you don’t have to deal with parking hassles in the city center or long turnaround times at factory outlets. Located just 10 minutes (6.5 km) west via Maitland Rd at 276 Maitland Rd Mayfield, Mayfield Phone Repair is the premier mobile repair destination for Newcastle residents.',
    localConvenienceNote: 'Avoid city parking fees! Our Mayfield store offers easy street parking right outside our front door at 276 Maitland Rd.',
    faqs: [
      { question: 'How far is Mayfield Phone Repair from Newcastle CBD?', answer: 'We are located just 6.5 km away—a quick 10-minute drive down Maitland Rd (A43).' },
      { question: 'Do you offer same-day phone repairs for Newcastle CBD workers?', answer: 'Yes! Drop your device off during your morning coffee or lunch break, and we will have it repaired in 30 to 60 minutes.' },
      { question: 'Are repair prices the same for Newcastle CBD customers?', answer: 'Yes, we provide transparent flat-rate pricing with no city surcharges. iPhone screens start at $129 and batteries from $89.' }
    ]
  },
  {
    id: 'mayfield',
    name: 'Mayfield',
    postcode: '2304',
    drivingTime: '0 minutes (Local Store)',
    distanceKm: '0 km',
    travelRoute: 'Located right at 276 Maitland Rd, Mayfield NSW 2304',
    landmarks: ['Mayfield Shopping Center', 'San Clemente High School', 'Mayfield Park', 'Wests Mayfield', 'Maitland Road Retail Strip'],
    nearbySuburbs: ['Mayfield East', 'Mayfield West', 'Waratah', 'Tighes Hill'],
    heroHeadline: 'Mayfield Phone Repair | Your Local Maitland Rd Mobile Workshop',
    metaDescription: 'Mayfield’s #1 phone repair shop at 276 Maitland Rd. Fast same-day screen repair, battery swaps & micro-soldering for iPhone, Samsung & Pixel. Walk-ins welcome!',
    suburbIntro: 'Mayfield Cell Phone Repairs is proud to be Mayfield’s local flagship device service station at 276 Maitland Rd, Mayfield NSW 2304. Serving Mayfield, Mayfield East, and Mayfield West for over a decade, we provide 30-minute iPhone screen replacements, high-capacity battery swaps, liquid damage treatment, and MacBook laptop repairs with a 90-day guarantee.',
    localConvenienceNote: 'We are located directly across from major Mayfield bus stops with free, easy parking outside.',
    faqs: [
      { question: 'Where is Mayfield Phone Repair located?', answer: 'We are located at 276 Maitland Rd, Mayfield NSW 2304 (Phone: 02 4049 1735).' },
      { question: 'Do I need an appointment for phone repair in Mayfield?', answer: 'No appointment needed! Walk-ins are welcome Monday through Saturday.' },
      { question: 'What phone models do you repair in Mayfield?', answer: 'We repair all iPhone models (17 down to SE), Samsung Galaxy (S26 down to A-series), Google Pixel, Oppo, Motorola, iPads, and MacBooks.' }
    ]
  },
  {
    id: 'waratah',
    name: 'Waratah',
    postcode: '2298',
    drivingTime: '2 minutes',
    distanceKm: '1.2 km',
    travelRoute: 'via Turton Rd or Hanbury St directly into Maitland Rd',
    landmarks: ['Waratah Village Shopping Centre', 'Mater Hospital (Calvary Mater)', 'Waratah Train Station', 'Callaghan College Waratah Campus'],
    nearbySuburbs: ['Georgetown', 'Mayfield', 'Lambton', 'Broadmeadow'],
    heroHeadline: 'Phone Repair Waratah | Express Screen & Battery Fixes',
    metaDescription: 'Fast phone repair near Waratah Village & Calvary Mater Hospital. 2-minute drive to Mayfield Phone Repair for iPhone, Samsung & Pixel repairs.',
    suburbIntro: 'Located right next door to Mayfield, Waratah residents and hospital staff at Calvary Mater are just a 2-minute drive (1.2 km) from expert mobile phone repair at 276 Maitland Rd. Whether you drop your phone at Waratah Village or experience battery drain at work, we provide 30-minute repairs while you wait.',
    localConvenienceNote: 'Just a 2-minute trip up Hanbury St or Turton Rd from Waratah Village.',
    faqs: [
      { question: 'How far is Waratah from Mayfield Phone Repair?', answer: 'Waratah is right next door—less than 2 minutes by car down Hanbury St.' },
      { question: 'Can Mater Hospital staff get express phone repair?', answer: 'Yes! We prioritize express 30-minute turnaround for hospital workers and emergency services.' }
    ]
  },
  {
    id: 'hamilton',
    name: 'Hamilton',
    postcode: '2303',
    drivingTime: '6 minutes',
    distanceKm: '3.8 km',
    travelRoute: 'via Beaumont St and Maitland Rd',
    landmarks: ['Beaumont Street Dining Strip', 'Hamilton Train Station', 'Gregson Park', 'Hamilton South Community Centre'],
    nearbySuburbs: ['Islington', 'Broadmeadow', 'Newcastle West', 'Georgetown'],
    heroHeadline: 'Phone Repair Hamilton | Quick Drive to Mayfield Workshop',
    metaDescription: 'Phone repair for Hamilton & Beaumont St residents. 6-minute drive to Mayfield Phone Repair for same-day screen, battery & water damage service.',
    suburbIntro: 'Enjoying lunch on Beaumont Street when your phone screen cracks? Hamilton is only a 6-minute drive (3.8 km) from Mayfield Phone Repair. Skip overpriced mall outlets and get local expert service for iPhone, Samsung, and Pixel devices.',
    localConvenienceNote: 'Head north down Beaumont St onto Maitland Rd—our shop is on the left at 276 Maitland Rd.',
    faqs: [
      { question: 'How fast can I get to Mayfield Phone Repair from Hamilton?', answer: 'It is a quick 6-minute drive up Beaumont St and Maitland Rd.' },
      { question: 'How much does iPhone screen repair cost for Hamilton residents?', answer: 'Our prices are completely flat-rate: iPhone screen repairs start at $129 and batteries at $89.' }
    ]
  },
  {
    id: 'wallsend',
    name: 'Wallsend',
    postcode: '2287',
    drivingTime: '12 minutes',
    distanceKm: '9.2 km',
    travelRoute: 'via Newcastle Link Rd / A43 and Maitland Rd',
    landmarks: ['Wallsend Plaza', 'Wallsend Park', 'Federal Park', 'Callaghan College Wallsend Campus'],
    nearbySuburbs: ['Jesmond', 'Elermore Vale', 'Maryland', 'Fletcher'],
    heroHeadline: 'Phone Repair Wallsend | Same-Day Screen & Battery Service',
    metaDescription: 'Trusted phone repair for Wallsend & Maryland residents. 12-minute drive to Mayfield Phone Repair for express iPhone, Samsung & Pixel fixes.',
    suburbIntro: 'Wallsend residents looking for reliable, affordable phone repairs without long waiting times choose Mayfield Phone Repair. Just a 12-minute drive down Newcastle Link Rd and Maitland Rd, we provide express screen replacements and battery swaps.',
    localConvenienceNote: 'Direct highway route via A43 with ample free street parking at 276 Maitland Rd.',
    faqs: [
      { question: 'Is it worth driving from Wallsend to Mayfield for phone repair?', answer: 'Yes! Our 30-minute turnaround and fair pricing save you hours compared to shipping your phone away.' }
    ]
  },
  {
    id: 'jesmond',
    name: 'Jesmond',
    postcode: '2299',
    drivingTime: '8 minutes',
    distanceKm: '5.5 km',
    travelRoute: 'via Newcastle Rd / A43 and Maitland Rd',
    landmarks: ['Stockland Jesmond (Jesmond Central)', 'University of Newcastle (Callaghan Campus)', 'Jesmond Park'],
    nearbySuburbs: ['Wallsend', 'Lambton', 'Waratah', 'Shortland'],
    heroHeadline: 'Phone Repair Jesmond & UON Student Mobile Service',
    metaDescription: 'Fast phone repair for Jesmond & UON Callaghan students. 8-minute drive to Mayfield Phone Repair. Student discounts & 30-min screen fixes.',
    suburbIntro: 'Attending University of Newcastle (UON Callaghan Campus) or living in Jesmond? When your device breaks, visit Mayfield Phone Repair just 8 minutes away at 276 Maitland Rd. We offer fast 30-minute screen repairs, battery swaps, and laptop fixes.',
    localConvenienceNote: '8 minutes straight down Newcastle Rd onto Maitland Rd.',
    faqs: [
      { question: 'Do you offer student discounts for UON Callaghan students?', answer: 'Yes! Bring your UON student ID for special repair rates and free diagnostic checks.' }
    ]
  },
  {
    id: 'lambton',
    name: 'Lambton',
    postcode: '2299',
    drivingTime: '5 minutes',
    distanceKm: '3.5 km',
    travelRoute: 'via Morehead St and Hanbury St',
    landmarks: ['Lambton Park & Tea Rooms', 'Lambton Pool', 'Lambton High School'],
    nearbySuburbs: ['New Lambton', 'Jesmond', 'Broadmeadow', 'Waratah'],
    heroHeadline: 'Phone Repair Lambton | 5 Minutes to Mayfield Store',
    metaDescription: 'Express phone repair for Lambton residents. 5-minute drive to Mayfield Phone Repair for same-day iPhone, Samsung & iPad fixes.',
    suburbIntro: 'Lambton locals are just 5 minutes (3.5 km) away from Newcastle’s top-rated repair workshop at 276 Maitland Rd, Mayfield. We fix cracked screens, dead batteries, and charging ports on all phone models.',
    localConvenienceNote: 'Head north along Morehead St / Hanbury St into Maitland Rd.',
    faqs: [
      { question: 'How long does a screen repair take for Lambton customers?', answer: 'Most screen replacements take 30 minutes, giving you time to grab a coffee nearby.' }
    ]
  },
  {
    id: 'merewether',
    name: 'Merewether',
    postcode: '2291',
    drivingTime: '15 minutes',
    distanceKm: '8.8 km',
    travelRoute: 'via Glebe Rd, City Rd / A43 and Maitland Rd',
    landmarks: ['Merewether Beach & Ocean Baths', 'Burwood Inn', 'Merewether Heights'],
    nearbySuburbs: ['The Junction', 'Bar Beach', 'Adamstown', 'Newcastle'],
    heroHeadline: 'Phone Repair Merewether | Beach Salt Water Damage Experts',
    metaDescription: 'Water damage & screen repair for Merewether residents. 15-minute drive to Mayfield Phone Repair for emergency salt-water restoration & screen fixes.',
    suburbIntro: 'Dropped your phone while surfing or walking at Merewether Beach? Salt water causes rapid internal corrosion. Drive 15 minutes to Mayfield Phone Repair at 276 Maitland Rd for immediate ultrasonic cleaning and screen replacement.',
    localConvenienceNote: 'Urgent water damage service available—bring your wet phone in immediately without charging it.',
    faqs: [
      { question: 'Can you fix a phone dropped in Merewether ocean salt water?', answer: 'Yes! Bring it in immediately without plugging it in. Our ultrasonic chemical baths clean salt deposits.' }
    ]
  },
  {
    id: 'charlestown',
    name: 'Charlestown',
    postcode: '2290',
    drivingTime: '20 minutes',
    distanceKm: '14.5 km',
    travelRoute: 'via Pacific Hwy / A43 and Inner City Bypass',
    landmarks: ['Charlestown Square', 'Charlestown Library', 'Pacific Highway Retail Hub'],
    nearbySuburbs: ['Kotara', 'Gateshead', 'Kahibah', 'Highfields'],
    heroHeadline: 'Phone Repair Charlestown | Skip Mall Lines & Save at Mayfield',
    metaDescription: 'Avoid long mall queues at Charlestown Square. 20-minute drive to Mayfield Phone Repair for lower prices, 30-min turnaround & 90-day warranty.',
    suburbIntro: 'Tired of long waiting lists and high repair fees at shopping mall kiosks in Charlestown Square? Drive 20 minutes to Mayfield Phone Repair at 276 Maitland Rd for transparent flat-rate quotes and 30-minute turnarounds.',
    localConvenienceNote: 'Take the Pacific Hwy / Inner City Bypass north straight into Mayfield.',
    faqs: [
      { question: 'Why drive from Charlestown to Mayfield for phone repair?', answer: 'We offer significantly lower repair costs, higher component quality, and 30-minute turnaround.' }
    ]
  },
  {
    id: 'broadmeadow',
    name: 'Broadmeadow',
    postcode: '2292',
    drivingTime: '5 minutes',
    distanceKm: '3.2 km',
    travelRoute: 'via Nine Ways roundabout and Turton Rd / Maitland Rd',
    landmarks: ['Newcastle Showground', 'McDonald Jones Stadium', 'Broadmeadow Railway Station'],
    nearbySuburbs: ['Hamilton', 'Adamstown', 'Lambton', 'Georgetown'],
    heroHeadline: 'Phone Repair Broadmeadow | Near McDonald Jones Stadium',
    metaDescription: 'Fast phone repair near Broadmeadow Station & McDonald Jones Stadium. 5-minute drive to Mayfield Phone Repair for screen & battery service.',
    suburbIntro: 'Broadmeadow residents and commuter rail passengers at Broadmeadow Station are just a 5-minute drive (3.2 km) from Mayfield Phone Repair at 276 Maitland Rd.',
    localConvenienceNote: 'Head north through the Nine Ways roundabout onto Turton Rd into Maitland Rd.',
    faqs: [
      { question: 'How close is Mayfield Phone Repair to Broadmeadow Station?', answer: 'We are just 3.2 km away—less than 5 minutes by car or bus.' }
    ]
  },
  {
    id: 'kotara',
    name: 'Kotara',
    postcode: '2289',
    drivingTime: '15 minutes',
    distanceKm: '10.2 km',
    travelRoute: 'via Kotara Park, Turton Rd and Maitland Rd',
    landmarks: ['Westfield Kotara', 'Kotara Home Centre', 'Blackbutt Reserve'],
    nearbySuburbs: ['Charlestown', 'Adamstown', 'New Lambton', 'Garden Suburb'],
    heroHeadline: 'Phone Repair Kotara | Premium Service Without Mall Markup',
    metaDescription: 'Skip Westfield Kotara repair kiosks. 15-minute drive to Mayfield Phone Repair for lower prices, 30-min turnaround & OEM-quality screens.',
    suburbIntro: 'Looking for phone repair near Kotara? Avoid Westfield Kotara crowds and retail markups by visiting Mayfield Phone Repair, 15 minutes north at 276 Maitland Rd.',
    localConvenienceNote: 'Easy 15-minute drive straight up Turton Rd.',
    faqs: [
      { question: 'Are repair prices cheaper at Mayfield than Westfield Kotara?', answer: 'Yes! We operate our own standalone workshop, offering up to 30-40% savings on screen and battery repairs.' }
    ]
  },
  {
    id: 'islington',
    name: 'Islington',
    postcode: '2296',
    drivingTime: '5 minutes',
    distanceKm: '2.8 km',
    travelRoute: 'via Maitland Rd direct north into Mayfield',
    landmarks: ['Islington Park', 'Maitland Road Vintage & Café Strip', 'Throsby Creek Bike Path'],
    nearbySuburbs: ['Tighes Hill', 'Maryville', 'Hamilton', 'Wickham'],
    heroHeadline: 'Phone Repair Islington | 5 Minutes Up Maitland Rd',
    metaDescription: 'Fast phone repair for Islington residents. 5-minute straight drive up Maitland Rd to Mayfield Phone Repair for same-day fixes.',
    suburbIntro: 'Islington locals live just 5 minutes (2.8 km) south of our workshop on Maitland Rd. Simply drive or take the bus straight up Maitland Rd to 276 Maitland Rd Mayfield.',
    localConvenienceNote: 'Direct straight line route up Maitland Rd.',
    faqs: [
      { question: 'How far is Islington from Mayfield Phone Repair?', answer: 'Just 2.8 km—a quick 5-minute straight drive up Maitland Rd.' }
    ]
  },
  {
    id: 'cardiff',
    name: 'Cardiff',
    postcode: '2285',
    drivingTime: '20 minutes',
    distanceKm: '13.8 km',
    travelRoute: 'via Main Rd, Macquarie Rd and Industrial Dr / Maitland Rd',
    landmarks: ['Cardiff Shopping Centre', 'Cardiff Train Station', 'Cardiff Industrial Estate'],
    nearbySuburbs: ['Glendale', 'Macquarie Hills', 'Kotara', 'Warners Bay'],
    heroHeadline: 'Phone Repair Cardiff | Independent Quality Service in Mayfield',
    metaDescription: 'Trusted phone repair for Cardiff & Macquarie Hills residents. 20-minute drive to Mayfield Phone Repair for same-day screen & battery swaps.',
    suburbIntro: 'Cardiff residents looking for expert mobile repair choose Mayfield Phone Repair at 276 Maitland Rd Mayfield. We provide 30-minute turnarounds and 90-day warranties.',
    localConvenienceNote: 'Direct drive via Main Rd and Newcastle Link Rd.',
    faqs: [
      { question: 'How long does screen repair take for Cardiff customers?', answer: 'Most iPhone screen replacements take 30 minutes while you wait.' }
    ]
  },
  {
    id: 'glendale',
    name: 'Glendale',
    postcode: '2285',
    drivingTime: '20 minutes',
    distanceKm: '13.2 km',
    travelRoute: 'via Stockland Glendale, Lake Rd and Newcastle Link Rd',
    landmarks: ['Stockland Glendale Shopping Centre', 'Glendale Technology High School', 'Argenton Park'],
    nearbySuburbs: ['Cardiff', 'Edgeworth', 'Speers Point', 'Boolaroo'],
    heroHeadline: 'Phone Repair Glendale | Express Screen & Battery Service',
    metaDescription: 'Phone repair near Stockland Glendale. 20-minute drive to Mayfield Phone Repair for express 30-min iPhone, Samsung & Pixel fixes.',
    suburbIntro: 'Living in Glendale? Skip crowded retail centers and visit Mayfield Phone Repair at 276 Maitland Rd for fast, professional phone and tablet repairs.',
    localConvenienceNote: 'Easy 20-minute drive via Lake Rd and Newcastle Link Rd.',
    faqs: [
      { question: 'Do you repair iPads and tablets for Glendale families?', answer: 'Yes! We repair all iPad models, Samsung Galaxy Tabs, and Microsoft Surface tablets.' }
    ]
  },
  {
    id: 'adamstown',
    name: 'Adamstown',
    postcode: '2289',
    drivingTime: '12 minutes',
    distanceKm: '7.5 km',
    travelRoute: 'via Glebe Rd, Turton Rd and Maitland Rd',
    landmarks: ['Adamstown Shopping Village', 'Adamstown Train Station', 'Myers Park'],
    nearbySuburbs: ['Kotara', 'Broadmeadow', 'New Lambton', 'Hamilton South'],
    heroHeadline: 'Phone Repair Adamstown | 12 Minutes to Mayfield Workshop',
    metaDescription: 'Fast phone repair for Adamstown residents. 12-minute drive to Mayfield Phone Repair for iPhone, Samsung & Google Pixel screen replacements.',
    suburbIntro: 'Adamstown locals are just a 12-minute drive (7.5 km) from expert repair service at 276 Maitland Rd, Mayfield.',
    localConvenienceNote: 'Drive north up Turton Rd directly into Maitland Rd.',
    faqs: [
      { question: 'How fast is screen repair for Adamstown residents?', answer: 'We complete standard screen replacements in 30 minutes.' }
    ]
  },
  {
    id: 'stockton',
    name: 'Stockton',
    postcode: '2295',
    drivingTime: '15 minutes',
    distanceKm: '11.5 km',
    travelRoute: 'via Stockton Bridge and Industrial Dr onto Maitland Rd',
    landmarks: ['Stockton Beach', 'Stockton Ferry Terminal', 'Stockton Bridge'],
    nearbySuburbs: ['Fern Bay', 'Carrington', 'Newcastle'],
    heroHeadline: 'Phone Repair Stockton | Quick Drive Across Stockton Bridge',
    metaDescription: 'Phone repair for Stockton & Fern Bay residents. 15-minute drive across Stockton Bridge to Mayfield Phone Repair. Screen & water damage fixes.',
    suburbIntro: 'Living in Stockton or Fern Bay? Cross the Stockton Bridge onto Industrial Drive and you’ll arrive at Mayfield Phone Repair in just 15 minutes at 276 Maitland Rd.',
    localConvenienceNote: 'Convenient drive across Stockton Bridge with direct access to Maitland Rd.',
    faqs: [
      { question: 'How far is Stockton from Mayfield Phone Repair?', answer: 'It is a 15-minute drive (11.5 km) across the Stockton Bridge via Industrial Dr.' }
    ]
  },
  {
    id: 'new-lambton',
    name: 'New Lambton',
    postcode: '2305',
    drivingTime: '7 minutes',
    distanceKm: '4.8 km',
    travelRoute: 'via Alma Rd, Turton Rd and Maitland Rd',
    landmarks: ['New Lambton Shopping Village', 'John Hunter Hospital', 'Novocastrian Park'],
    nearbySuburbs: ['Lambton', 'Kotara', 'Broadmeadow', 'Jesmond'],
    heroHeadline: 'Phone Repair New Lambton & John Hunter Hospital Service',
    metaDescription: 'Phone repair near John Hunter Hospital & New Lambton Village. 7-minute drive to Mayfield Phone Repair for same-day screen & battery swaps.',
    suburbIntro: 'New Lambton residents and staff at John Hunter Hospital are only 7 minutes (4.8 km) away from Mayfield Phone Repair at 276 Maitland Rd.',
    localConvenienceNote: 'Quick 7-minute trip via Turton Rd.',
    faqs: [
      { question: 'Do you offer express service for John Hunter Hospital staff?', answer: 'Yes! We provide 30-minute priority screen and battery repairs for hospital workers.' }
    ]
  },
  {
    id: 'tighes-hill',
    name: 'Tighes Hill',
    postcode: '2297',
    drivingTime: '3 minutes',
    distanceKm: '1.8 km',
    travelRoute: 'via Elizabeth St and Maitland Rd',
    landmarks: ['TAFE NSW Tighes Hill Campus', 'Throsby Creek', 'Tighes Hill Public School'],
    nearbySuburbs: ['Mayfield', 'Islington', 'Carrington', 'Maryville'],
    heroHeadline: 'Phone Repair Tighes Hill & TAFE Student Mobile Service',
    metaDescription: 'Express phone repair for Tighes Hill & TAFE students. 3-minute drive to Mayfield Phone Repair. Student discounts & 30-min fixes.',
    suburbIntro: 'Living in Tighes Hill or studying at TAFE NSW Tighes Hill Campus? You are practically on our doorstep—just 3 minutes (1.8 km) down Elizabeth St to 276 Maitland Rd Mayfield.',
    localConvenienceNote: '3-minute trip right next door.',
    faqs: [
      { question: 'Do TAFE Tighes Hill students get repair discounts?', answer: 'Yes! Show your TAFE student card for discounted repair rates.' }
    ]
  },
  {
    id: 'carrington',
    name: 'Carrington',
    postcode: '2294',
    drivingTime: '8 minutes',
    distanceKm: '5.2 km',
    travelRoute: 'via Cowper St, Hannell St and Industrial Dr / Maitland Rd',
    landmarks: ['Carrington Docks', 'Young Street Dining', 'Carrington Bowling Club'],
    nearbySuburbs: ['Maryville', 'Wickham', 'Tighes Hill', 'Newcastle'],
    heroHeadline: 'Phone Repair Carrington | 8 Minutes to Mayfield Store',
    metaDescription: 'Phone repair for Carrington residents & maritime workers. 8-minute drive to Mayfield Phone Repair for screen, battery & water damage service.',
    suburbIntro: 'Carrington residents and maritime workers along Port of Newcastle are just 8 minutes (5.2 km) away from Mayfield Phone Repair at 276 Maitland Rd.',
    localConvenienceNote: 'Drive north via Hannell St onto Maitland Rd.',
    faqs: [
      { question: 'How close is Carrington to Mayfield Phone Repair?', answer: 'Just an 8-minute drive via Hannell St and Industrial Dr.' }
    ]
  },
  {
    id: 'maryville',
    name: 'Maryville',
    postcode: '2293',
    drivingTime: '6 minutes',
    distanceKm: '3.6 km',
    travelRoute: 'via Lewis St, Hannell St and Maitland Rd',
    landmarks: ['Throsby Creek Walking Track', 'Maryville Tavern'],
    nearbySuburbs: ['Islington', 'Tighes Hill', 'Wickham', 'Carrington'],
    heroHeadline: 'Phone Repair Maryville | Express Service in Mayfield',
    metaDescription: 'Fast phone repair for Maryville residents. 6-minute drive to Mayfield Phone Repair for same-day iPhone, Samsung & Pixel screen fixes.',
    suburbIntro: 'Maryville locals are a quick 6-minute drive (3.6 km) from our workshop at 276 Maitland Rd, Mayfield.',
    localConvenienceNote: 'Straightforward 6-minute drive north along Maitland Rd.',
    faqs: [
      { question: 'How fast can Maryville residents get a screen replaced?', answer: 'We replace most iPhone and Samsung screens in 30 to 45 minutes.' }
    ]
  },
  {
    id: 'mayfield-east',
    name: 'Mayfield East',
    postcode: '2304',
    drivingTime: '1 minute',
    distanceKm: '0.8 km',
    travelRoute: 'via Crebert St and Maitland Rd',
    landmarks: ['Mayfield East Public School', 'San Clemente High School', 'Industrial Drive Corridor'],
    nearbySuburbs: ['Mayfield', 'Tighes Hill', 'Carrington'],
    heroHeadline: 'Phone Repair Mayfield East | Practically On Our Doorstep',
    metaDescription: 'Local phone repair for Mayfield East. 1-minute drive to Mayfield Phone Repair at 276 Maitland Rd. Walk-ins welcome for 30-min fixes.',
    suburbIntro: 'Living in Mayfield East? Our repair workshop at 276 Maitland Rd is practically on your doorstep—just 1 minute away.',
    localConvenienceNote: 'Walk or 1-minute drive up Crebert St onto Maitland Rd.',
    faqs: [
      { question: 'Where is the closest phone repair shop to Mayfield East?', answer: 'Mayfield Phone Repair is right at 276 Maitland Rd—less than 1 minute away.' }
    ]
  },
  {
    id: 'mayfield-west',
    name: 'Mayfield West',
    postcode: '2304',
    drivingTime: '2 minutes',
    distanceKm: '1.5 km',
    travelRoute: 'via Maitland Rd heading east towards Waratah / Mayfield CBD',
    landmarks: ['Mayfield West Demonstration School', 'Stevenson Park', 'Industrial Drive West'],
    nearbySuburbs: ['Mayfield', 'Waratah', 'Spit Island'],
    heroHeadline: 'Phone Repair Mayfield West | 2 Minutes Down Maitland Rd',
    metaDescription: 'Local phone repair for Mayfield West residents & industrial trade workers. 2-minute drive to Mayfield Phone Repair at 276 Maitland Rd.',
    suburbIntro: 'Mayfield West residents and industrial trade workers on Industrial Dr are just 2 minutes (1.5 km) down Maitland Rd from our store at 276 Maitland Rd.',
    localConvenienceNote: 'Drive east on Maitland Rd—our shop is on the right.',
    faqs: [
      { question: 'Do you clean trade dust from charging ports for Mayfield West workers?', answer: 'Yes! We offer free charging port extraction and cleanings for local trade workers.' }
    ]
  },
  {
    id: 'wickham',
    name: 'Wickham',
    postcode: '2293',
    drivingTime: '8 minutes',
    distanceKm: '4.5 km',
    travelRoute: 'via Newcastle Interchange, Hannell St and Maitland Rd',
    landmarks: ['Newcastle Interchange (Light Rail)', 'Wickham Marina', 'Wickham Park'],
    nearbySuburbs: ['Maryville', 'Newcastle West', 'Carrington', 'Hamilton'],
    heroHeadline: 'Phone Repair Wickham | Near Newcastle Interchange',
    metaDescription: 'Phone repair near Newcastle Interchange in Wickham. 8-minute drive to Mayfield Phone Repair for express 30-min screen & battery fixes.',
    suburbIntro: 'Commuting through Newcastle Interchange in Wickham? Mayfield Phone Repair is just an 8-minute drive (4.5 km) north at 276 Maitland Rd.',
    localConvenienceNote: 'Take Hannell St north straight into Maitland Rd.',
    faqs: [
      { question: 'How close is Mayfield Phone Repair to Newcastle Interchange?', answer: 'We are just 4.5 km away—an 8-minute drive up Hannell St.' }
    ]
  },
  {
    id: 'georgetown',
    name: 'Georgetown',
    postcode: '2298',
    drivingTime: '3 minutes',
    distanceKm: '2.1 km',
    travelRoute: 'via Georgetown Rd and Turton Rd / Maitland Rd',
    landmarks: ['Georgetown Shopping Village', 'Georgetown Oval'],
    nearbySuburbs: ['Waratah', 'Broadmeadow', 'Mayfield', 'Islington'],
    heroHeadline: 'Phone Repair Georgetown | 3 Minutes to Mayfield Store',
    metaDescription: 'Fast phone repair for Georgetown residents. 3-minute drive to Mayfield Phone Repair at 276 Maitland Rd for same-day fixes.',
    suburbIntro: 'Georgetown locals are just a 3-minute hop (2.1 km) down Georgetown Rd to Mayfield Phone Repair at 276 Maitland Rd.',
    localConvenienceNote: '3 minutes down Georgetown Rd onto Maitland Rd.',
    faqs: [
      { question: 'How long does an iPhone repair take for Georgetown locals?', answer: 'We complete screen and battery repairs in 30 minutes.' }
    ]
  }
];
