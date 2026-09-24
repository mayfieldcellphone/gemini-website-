export interface Suburb {
  id: string;
  name: string;
  postcode: string;
  distance: string;
  travelTime: string;
  drivingRoute: string;
  transitDirections: string;
  localContext: string;
  nearby: string[];
}

export const suburbs: Suburb[] = [
  {
    id: 'newcastle',
    name: 'Newcastle',
    postcode: '2300',
    distance: '5.2 km from our Mayfield shop',
    travelTime: '8–10 mins',
    drivingRoute: 'Head northwest along Hunter St and continue straight onto Maitland Rd (A43) into Mayfield. Our store at 276 Maitland Rd is on the left with dedicated customer parking.',
    transitDirections: 'Take the Newcastle Interchange train to Waratah station (6 mins walk), or board the 11 or 13 Newcastle Transport bus along Hunter St directly to Maitland Rd near Hanbury St.',
    localContext: 'For Newcastle CBD workers, harbour residents, and hospitality staff, our shop offers express 30-minute drop-in phone repairs avoiding city parking hassles and high CBD repair rates.',
    nearby: ['Newcastle West', 'Merewether', 'The Hill', 'Bar Beach']
  },
  {
    id: 'waratah',
    name: 'Waratah',
    postcode: '2298',
    distance: '1.4 km from our Mayfield shop',
    travelTime: '2–3 mins',
    drivingRoute: 'Travel east along Turton Rd, turn onto Hanbury St and connect onto Maitland Rd. We are situated right across from the main commercial corridor.',
    transitDirections: 'Walk 12 minutes or catch the 24 or 11 bus down Hanbury St directly to 276 Maitland Rd.',
    localContext: 'Located immediately adjacent to Waratah Village and Callaghan Campus, Waratah residents enjoy fastest walk-in turnarounds with instant diagnostics.',
    nearby: ['Georgetown', 'Callaghan', 'Mayfield West', 'Broadmeadow']
  },
  {
    id: 'wallsend',
    name: 'Wallsend',
    postcode: '2287',
    distance: '7.8 km from our Mayfield shop',
    travelTime: '10–12 mins',
    drivingRoute: 'Take Newcastle Rd (B53) eastbound through Jesmond, merge onto Thomas St, continue onto Hanbury St and turn right onto Maitland Rd.',
    transitDirections: 'Board the 11 bus from Wallsend Library directly into Mayfield along Maitland Rd in approximately 22 minutes.',
    localContext: 'Serving Wallsend families and tradies who need durable screen fixes, battery replacements, and heavy-duty protective cases before heading on site.',
    nearby: ['Jesmond', 'Elermore Vale', 'Maryland', 'Fletcher']
  },
  {
    id: 'jesmond',
    name: 'Jesmond',
    postcode: '2299',
    distance: '5.5 km from our Mayfield shop',
    travelTime: '8 mins',
    drivingRoute: 'Follow Blue Gum Rd onto Newcastle Rd eastbound, turn onto Hanbury St through Waratah straight to Maitland Rd.',
    transitDirections: 'Catch the 11 bus from Jesmond Central Shopping Centre straight to Hanbury St / Maitland Rd.',
    localContext: 'Convenient for University of Newcastle Callaghan campus students and staff requiring budget-friendly iPhone screen repairs and laptop battery upgrades.',
    nearby: ['Callaghan', 'Wallsend', 'North Lambton', 'Birmingham Gardens']
  },
  {
    id: 'merewether',
    name: 'Merewether',
    postcode: '2291',
    distance: '6.8 km from our Mayfield shop',
    travelTime: '12–14 mins',
    drivingRoute: 'Head north via Glebe Rd, continue onto Stewart Ave through Newcastle West, then proceed along Maitland Rd to number 276.',
    transitDirections: 'Take the 14 or 22 bus to Newcastle Interchange, then connect onto the 11 bus straight to Mayfield.',
    localContext: 'Coastal salt air around Merewether Beach accelerates galvanic corrosion in charging ports and speaker meshes. We specialize in ultrasonic deoxidization and waterproof seals.',
    nearby: ['The Junction', 'Newcastle', 'Bar Beach', 'Adamstown']
  },
  {
    id: 'charlestown',
    name: 'Charlestown',
    postcode: '2290',
    distance: '11.5 km from our Mayfield shop',
    travelTime: '15–18 mins',
    drivingRoute: 'Take the Newcastle Inner City Bypass (A37) northbound, exit toward Industrial Drive / Maitland Rd and merge into Mayfield.',
    transitDirections: 'Catch the 11 bus from Charlestown Square for a single-seat direct journey to Maitland Rd Mayfield.',
    localContext: 'Save time and bypass expensive mall kiosks at Charlestown Square. We deliver higher-grade OLED replacement screens and 30-minute express service with easy parking.',
    nearby: ['Kotara', 'Gateshead', 'Whitebridge', 'Kahibah']
  },
  {
    id: 'kotara',
    name: 'Kotara',
    postcode: '2289',
    distance: '8.9 km from our Mayfield shop',
    travelTime: '12–15 mins',
    drivingRoute: 'Follow Park Ave onto Northcott Dr, continue onto Bridges Rd, merge onto Stewart Ave and head north on Maitland Rd.',
    transitDirections: 'Take the train from Kotara station to Waratah station (9 mins), then walk 6 minutes to 276 Maitland Rd.',
    localContext: 'Avoid long booking queues at retail mall repair booths. Our independent certified lab provides direct technician access and fixed pricing.',
    nearby: ['Adamstown', 'Broadmeadow', 'Charlestown', 'New Lambton']
  },
  {
    id: 'lambton',
    name: 'Lambton',
    postcode: '2299',
    distance: '4.2 km from our Mayfield shop',
    travelTime: '6–8 mins',
    drivingRoute: 'Head east on Pearson St, continue onto Turton Rd through Waratah, and connect onto Hanbury St to Maitland Rd.',
    transitDirections: 'Catch the 12 bus from Lambton Park directly into Mayfield.',
    localContext: 'A quick 7-minute trip for Lambton families seeking trustworthy, warranty-backed iPhone and iPad screen repairs.',
    nearby: ['New Lambton', 'Broadmeadow', 'North Lambton', 'Waratah']
  },
  {
    id: 'broadmeadow',
    name: 'Broadmeadow',
    postcode: '2292',
    distance: '3.8 km from our Mayfield shop',
    travelTime: '5–6 mins',
    drivingRoute: 'Take Lambton Rd or Chatham Rd northbound, cross the rail line onto Industrial Drive or Hanbury St, and arrive at 276 Maitland Rd.',
    transitDirections: 'Hop on any train from Broadmeadow to Waratah (3 mins) or take the 11 bus along Turton Rd.',
    localContext: 'Ideal for commuters near Newcastle Entertainment Centre and sports stadium needing same-day screen fixes before or after work.',
    nearby: ['Hamilton', 'Adamstown', 'Waratah', 'Islington']
  },
  {
    id: 'hamilton',
    name: 'Hamilton',
    postcode: '2303',
    distance: '3.1 km from our Mayfield shop',
    travelTime: '4–5 mins',
    drivingRoute: 'Travel north along Beaumont St, turn onto Maitland Rd (A43) and drive straight into Mayfield. Our shop is on your left.',
    transitDirections: 'Catch the 11 bus along Beaumont St or Maitland Rd for a 6-minute ride straight to our front entrance.',
    localContext: 'Just minutes up the road from Beaumont St dining and cafe strip. Drop your phone off for a battery or screen fix and pick it up completely restored within 30 minutes.',
    nearby: ['Islington', 'Broadmeadow', 'Hamilton North', 'Wickham']
  },
  {
    id: 'cardiff',
    name: 'Cardiff',
    postcode: '2285',
    distance: '12.8 km from our Mayfield shop',
    travelTime: '16–18 mins',
    drivingRoute: 'Follow Main Rd onto the Newcastle Inner City Bypass (A37) heading north, take the Industrial Drive exit and turn onto Maitland Rd.',
    transitDirections: 'Catch the train from Cardiff station to Waratah station (14 mins), then walk down Hanbury St to Maitland Rd.',
    localContext: 'Serving Cardiff light industrial businesses and residential suburbs with fleet device maintenance and heavy machinery drop damage repairs.',
    nearby: ['Glendale', 'Macquarie Hills', 'Kotara', 'Warners Bay']
  },
  {
    id: 'glendale',
    name: 'Glendale',
    postcode: '2285',
    distance: '13.5 km from our Mayfield shop',
    travelTime: '18–20 mins',
    drivingRoute: 'Take Lake Rd onto the Newcastle Inner City Bypass (A37) northbound, continue past Jesmond and exit onto Hanbury St into Mayfield.',
    transitDirections: 'Take the 11 bus from Stockland Glendale directly to Maitland Rd Mayfield.',
    localContext: 'Faster and more affordable than big-box mall chain repairers, with certified micro-soldering and water damage revival capabilities.',
    nearby: ['Edgeworth', 'Cardiff', 'Argenton', 'Cameron Park']
  },
  {
    id: 'islington',
    name: 'Islington',
    postcode: '2296',
    distance: '2.1 km from our Mayfield shop',
    travelTime: '3–4 mins',
    drivingRoute: 'Drive north directly along Maitland Rd (A43) over the railway bridge into Mayfield. 276 Maitland Rd is on your left.',
    transitDirections: 'Catch the 11 or 130 bus northbound on Maitland Rd—a 4-minute journey.',
    localContext: 'Serving Islington’s creative, retail, and vintage cafe hub with rapid repairs for content creators, photographers, and local business owners.',
    nearby: ['Tighes Hill', 'Hamilton', 'Maryville', 'Mayfield']
  },
  {
    id: 'georgetown',
    name: 'Georgetown',
    postcode: '2298',
    distance: '1.8 km from our Mayfield shop',
    travelTime: '2–3 mins',
    drivingRoute: 'Follow Georgetown Rd onto Hanbury St and turn right onto Maitland Rd.',
    transitDirections: 'A brisk 15-minute walk or a 3-minute ride on the 11 bus down Hanbury St.',
    localContext: 'Right in our local neighborhood backyard. Georgetown residents count on us for friendly face-to-face diagnostics and guaranteed parts.',
    nearby: ['Waratah', 'Broadmeadow', 'Mayfield', 'Islington']
  },
  {
    id: 'adamstown',
    name: 'Adamstown',
    postcode: '2289',
    distance: '6.2 km from our Mayfield shop',
    travelTime: '9–11 mins',
    drivingRoute: 'Take Glebe Rd onto Chatham Rd or Stewart Ave, continue north onto Maitland Rd into Mayfield.',
    transitDirections: 'Catch the train from Adamstown to Waratah station (6 mins) or board the 28 bus connecting into Mayfield.',
    localContext: 'Convenient repair options for Adamstown families and commercial businesses seeking transparent warranties and quick turnarounds.',
    nearby: ['Kotara', 'Broadmeadow', 'New Lambton', 'Merewether']
  },
  {
    id: 'stockton',
    name: 'Stockton',
    postcode: '2295',
    distance: '7.9 km from our Mayfield shop',
    travelTime: '9–11 mins',
    drivingRoute: 'Cross the Stockton Bridge via Nelson Bay Rd (B63), take the Industrial Drive exit and turn left onto Maitland Rd.',
    transitDirections: 'Take the Stockton Ferry to Queens Wharf, catch the light rail to Interchange, and jump on the 11 bus to Maitland Rd.',
    localContext: 'Stockton peninsula residents face coastal surf spray and beach sand ingress. We clean sealed ports, replace sand-damaged cameras, and restore screens.',
    nearby: ['Fern Bay', 'Newcastle', 'Carrington', 'Williamtown']
  },
  {
    id: 'new-lambton',
    name: 'New Lambton',
    postcode: '2305',
    distance: '5.1 km from our Mayfield shop',
    travelTime: '7–9 mins',
    drivingRoute: 'Follow Regent St or Carnley Ave onto Turton Rd, head north past Waratah Village, and turn onto Maitland Rd.',
    transitDirections: 'Catch the 13 or 25 bus to Waratah Station and connect to Maitland Rd.',
    localContext: 'Close to John Hunter Hospital, making us the primary repair provider for medical staff, nurses, and doctors needing urgent phone repairs between shifts.',
    nearby: ['Lambton', 'Kotara', 'Broadmeadow', 'Rankin Park']
  },
  {
    id: 'tighes-hill',
    name: 'Tighes Hill',
    postcode: '2297',
    distance: '1.2 km from our Mayfield shop',
    travelTime: '2 mins',
    drivingRoute: 'Head northwest on Elizabeth St or Maitland Rd straight across the canal into central Mayfield.',
    transitDirections: 'A 10-minute flat walk or 2 minutes on the 11 bus.',
    localContext: 'Home to TAFE Newcastle campus students and local artists who depend on fast phone and tablet screen fixes between classes.',
    nearby: ['Mayfield', 'Islington', 'Maryville', 'Carrington']
  },
  {
    id: 'carrington',
    name: 'Carrington',
    postcode: '2294',
    distance: '4.5 km from our Mayfield shop',
    travelTime: '6–7 mins',
    drivingRoute: 'Take Cowper St over the bridge onto Hannell St, connect via Industrial Drive and turn right onto Maitland Rd.',
    transitDirections: 'Catch the 11 bus or cycle across the Throsby Creek shared pathway directly into Mayfield.',
    localContext: 'Carrington port and maritime workers choose us for industrial-grade glass screen protectors, charging port repairs, and water damage recoveries.',
    nearby: ['Maryville', 'Wickham', 'Tighes Hill', 'Newcastle']
  },
  {
    id: 'maryville',
    name: 'Maryville',
    postcode: '2293',
    distance: '3.2 km from our Mayfield shop',
    travelTime: '4–5 mins',
    drivingRoute: 'Follow Hannell St onto Industrial Drive, turn left onto Hanbury St and connect to Maitland Rd.',
    transitDirections: 'Jump on the 11 bus or walk through Tighes Hill to 276 Maitland Rd.',
    localContext: 'Maryville residents appreciate fast, reliable local service for broken Apple, Samsung, and Google Pixel displays.',
    nearby: ['Islington', 'Carrington', 'Wickham', 'Tighes Hill']
  },
  {
    id: 'mayfield-east',
    name: 'Mayfield East',
    postcode: '2304',
    distance: '0.8 km from our Mayfield shop',
    travelTime: '1–2 mins',
    drivingRoute: 'Head west on Crebert St or Ingall St directly onto Maitland Rd.',
    transitDirections: 'A quick 5-minute stroll along Maitland Rd.',
    localContext: 'Serving our immediate neighbors with priority walk-in care, discounted device diagnostics, and phone accessories.',
    nearby: ['Mayfield', 'Tighes Hill', 'Carrington', 'Waratah']
  },
  {
    id: 'mayfield-west',
    name: 'Mayfield West',
    postcode: '2304',
    distance: '1.1 km from our Mayfield shop',
    travelTime: '2 mins',
    drivingRoute: 'Follow Maitland Rd eastbound toward Hanbury St. Our shop is located at 276 Maitland Rd.',
    transitDirections: 'A gentle 8-minute walk or 1 bus stop on the 11 or 130 route.',
    localContext: 'Right next door to industrial Mayfield West and CSIRO Energy Centre staff needing enterprise laptop and smartphone repairs.',
    nearby: ['Mayfield', 'Waratah', 'Sandgate', 'Kooragang']
  },
  {
    id: 'wickham',
    name: 'Wickham',
    postcode: '2293',
    distance: '4.1 km from our Mayfield shop',
    travelTime: '5–6 mins',
    drivingRoute: 'Follow Hannell St north onto Industrial Drive, exit onto Hanbury St and turn right onto Maitland Rd.',
    transitDirections: 'Board the train from Newcastle Interchange to Waratah (4 mins) or ride the 11 bus.',
    localContext: 'Positioned right beside Newcastle Interchange, convenient for commuters needing a fast 30-minute fix before heading down the Central Coast line.',
    nearby: ['Maryville', 'Newcastle West', 'Hamilton', 'Islington']
  },
  {
    id: 'mayfield',
    name: 'Mayfield',
    postcode: '2304',
    distance: 'Located right here in our store',
    travelTime: '0 mins',
    drivingRoute: 'Directly at 276 Maitland Rd Mayfield NSW 2304, between Hanbury St and Havelock St with street parking right out front.',
    transitDirections: 'Conveniently serviced by bus routes 11, 12, 24, and 130 stopping directly outside our doorstep.',
    localContext: 'The flagship diagnostic workshop and repair hub for Newcastle, delivering 4.8★ rated screen, battery, and micro-soldering solutions since inception.',
    nearby: ['Waratah', 'Islington', 'Tighes Hill', 'Mayfield East']
  },
  {
    id: 'warners-bay',
    name: 'Warners Bay',
    postcode: '2282',
    distance: '15.2 km from our Mayfield shop',
    travelTime: '20–22 mins',
    drivingRoute: 'Take Hillsborough Rd onto the Newcastle Inner City Bypass (A37) northbound, continue past Jesmond and follow signs to Mayfield.',
    transitDirections: 'Catch the 11 bus from Charlestown or take connecting buses to Newcastle Interchange.',
    localContext: 'Lake Macquarie families and watersports enthusiasts count on us for water-damaged phone revival and tablet screen replacements.',
    nearby: ['Belmont', 'Cardiff', 'Eleebana', 'Speers Point']
  },
  {
    id: 'belmont',
    name: 'Belmont',
    postcode: '2280',
    distance: '19.8 km from our Mayfield shop',
    travelTime: '24–28 mins',
    drivingRoute: 'Head north along the Pacific Highway (A43) through Charlestown, merge onto the Newcastle Inner City Bypass (A37) into Industrial Drive.',
    transitDirections: 'Take the 14 bus to Newcastle Interchange, then connect onto the 11 bus to Maitland Rd.',
    localContext: 'Providing reliable emergency screen repairs for Belmont lake and coastal residents who need honest quotes and same-day turnaround.',
    nearby: ['Warners Bay', 'Gateshead', 'Swansea', 'Valentine']
  },
  {
    id: 'raymond-terrace',
    name: 'Raymond Terrace',
    postcode: '2324',
    distance: '21.5 km from our Mayfield shop',
    travelTime: '18–20 mins',
    drivingRoute: 'Take the Pacific Highway (A1) south across the Hexham Bridge, continue onto Maitland Rd (A43) straight into Mayfield.',
    transitDirections: 'Board the 140 Port Stephens bus direct from Raymond Terrace Shopping Centre into Mayfield.',
    localContext: 'A straight 18-minute drive down the highway for Port Stephens and Hunter Valley residents wanting top-tier technical repair work.',
    nearby: ['Heatherbrae', 'Hexham', 'Medowie', 'Meda']
  },
  {
    id: 'maitland',
    name: 'Maitland',
    postcode: '2320',
    distance: '28.4 km from our Mayfield shop',
    travelTime: '26–30 mins',
    drivingRoute: 'Follow the New England Highway (A43) eastbound through Beresfield and Hexham straight along Maitland Rd directly to 276 Maitland Rd.',
    transitDirections: 'Catch the Hunter Line train from Maitland station directly to Waratah station (25 mins), then walk down Hanbury St.',
    localContext: 'Maitland customers travel to our Mayfield workshop because we offer advanced logic board micro-soldering and iPad repairs that regional shops cannot perform.',
    nearby: ['Rutherford', 'Thornton', 'East Maitland', 'Telarah']
  },
  {
    id: 'edgeworth',
    name: 'Edgeworth',
    postcode: '2285',
    distance: '14.8 km from our Mayfield shop',
    travelTime: '18–20 mins',
    drivingRoute: 'Head east on Main Rd, connect onto Newcastle Rd (B53) through Wallsend and Jesmond, continuing along Hanbury St to Maitland Rd.',
    transitDirections: 'Take the 262 or 263 bus to Wallsend and transfer onto the 11 bus into Mayfield.',
    localContext: 'Affordable, prompt mobile hardware solutions for Edgeworth families avoiding mall crowds.',
    nearby: ['Glendale', 'Cameron Park', 'Barnsley', 'West Wallsend']
  },
  {
    id: 'cameron-park',
    name: 'Cameron Park',
    postcode: '2285',
    distance: '16.2 km from our Mayfield shop',
    travelTime: '20–22 mins',
    drivingRoute: 'Take George Booth Dr onto Newcastle Rd (B53) eastbound through Jesmond, connect onto Hanbury St and turn onto Maitland Rd.',
    transitDirections: 'Catch the 263 bus to Newcastle Interchange and connect to the 11 bus.',
    localContext: 'Serving Cameron Park residential estates with on-demand screen fixes, battery replacements, and kid-proof iPad screen protectors.',
    nearby: ['Edgeworth', 'Fletcher', 'Minmi', 'West Wallsend']
  },
  {
    id: 'fletcher',
    name: 'Fletcher',
    postcode: '2287',
    distance: '12.4 km from our Mayfield shop',
    travelTime: '14–16 mins',
    drivingRoute: 'Follow Minmi Rd onto Maryland Dr, continue onto Newcastle Rd through Jesmond and into Mayfield via Hanbury St.',
    transitDirections: 'Take the 260 bus connecting through Wallsend directly into Mayfield.',
    localContext: 'Fast walk-in service for Fletcher families who need reliable smartphone repairs without waiting days for mail-in warranty centers.',
    nearby: ['Maryland', 'Minmi', 'Wallsend', 'Cameron Park']
  },
  {
    id: 'maryland',
    name: 'Maryland',
    postcode: '2287',
    distance: '10.8 km from our Mayfield shop',
    travelTime: '12–14 mins',
    drivingRoute: 'Head east on Maryland Dr onto Newcastle Rd (B53), take the Hanbury St exit through Waratah to Maitland Rd.',
    transitDirections: 'Catch the 12 bus from Maryland directly through to Mayfield.',
    localContext: 'Maryland residents appreciate our transparent quotes, no-appointment policy, and 90-day parts warranty.',
    nearby: ['Fletcher', 'Wallsend', 'Shortland', 'Jesmond']
  },
  {
    id: 'sandgate',
    name: 'Sandgate',
    postcode: '2304',
    distance: '3.6 km from our Mayfield shop',
    travelTime: '4–5 mins',
    drivingRoute: 'Travel south straight along Maitland Rd (A43). Our shop is at 276 Maitland Rd on the left.',
    transitDirections: 'A quick 5-minute ride on the 130 or 140 bus along Maitland Rd.',
    localContext: 'Just 5 minutes down the road for Sandgate cemetery visitors and industrial park workers needing fast phone turnaround.',
    nearby: ['Shortland', 'Hexham', 'Mayfield West', 'Kooragang']
  },
  {
    id: 'shortland',
    name: 'Shortland',
    postcode: '2307',
    distance: '5.8 km from our Mayfield shop',
    travelTime: '7–8 mins',
    drivingRoute: 'Take Sandgate Rd onto Maitland Rd (A43) southbound straight into central Mayfield.',
    transitDirections: 'Catch the 11 bus or 27 bus connecting directly along Maitland Rd.',
    localContext: 'A favorite for University of Newcastle Callaghan students living in Shortland seeking fast laptop and iPhone battery swaps.',
    nearby: ['Sandgate', 'Callaghan', 'Jesmond', 'Birmingham Gardens']
  },
  {
    id: 'hexham',
    name: 'Hexham',
    postcode: '2322',
    distance: '9.2 km from our Mayfield shop',
    travelTime: '9–10 mins',
    drivingRoute: 'Drive south along the Pacific Highway / Maitland Rd (A43) past Sandgate straight into Mayfield.',
    transitDirections: 'Take the Hunter Line train from Hexham to Waratah station (11 mins), then walk down Hanbury St.',
    localContext: 'Hexham transport drivers and industrial workers rely on us for rugged phone repairs and quick turnaround battery replacements.',
    nearby: ['Sandgate', 'Beresfield', 'Tomago', 'Tarro']
  },
  {
    id: 'beresfield',
    name: 'Beresfield',
    postcode: '2322',
    distance: '15.6 km from our Mayfield shop',
    travelTime: '15–17 mins',
    drivingRoute: 'Follow the New England Highway (A43) through Hexham and straight down Maitland Rd into Mayfield.',
    transitDirections: 'Catch the train from Beresfield to Waratah station (18 mins) or take the 140 bus.',
    localContext: 'Serving Beresfield logistics and warehouse workers who need emergency screen replacements without missing work.',
    nearby: ['Hexham', 'Thornton', 'Tarro', 'Woodberry']
  },
  {
    id: 'thornton',
    name: 'Thornton',
    postcode: '2322',
    distance: '19.2 km from our Mayfield shop',
    travelTime: '18–20 mins',
    drivingRoute: 'Take the New England Highway (A43) eastbound directly into Mayfield along Maitland Rd.',
    transitDirections: 'Take the Hunter Line train from Thornton directly to Waratah station (21 mins).',
    localContext: 'Thornton families choose Mayfield Phone Repair for genuine quality parts and fast 30-minute turnarounds.',
    nearby: ['Beresfield', 'Maitland', 'Chisholm', 'Morpeth']
  },
  {
    id: 'rutherford',
    name: 'Rutherford',
    postcode: '2320',
    distance: '33.1 km from our Mayfield shop',
    travelTime: '30–35 mins',
    drivingRoute: 'Follow the New England Highway (A43) through Maitland and Hexham directly into Mayfield.',
    transitDirections: 'Train from Telarah or Maitland station directly into Waratah station.',
    localContext: 'Upper Hunter customers visit our diagnostic lab for specialized micro-soldering, Face ID recovery, and Samsung Ultra display repairs.',
    nearby: ['Maitland', 'Aberglasslyn', 'Farley', 'Lochinvar']
  },
  {
    id: 'gateshead',
    name: 'Gateshead',
    postcode: '2290',
    distance: '13.4 km from our Mayfield shop',
    travelTime: '16–18 mins',
    drivingRoute: 'Take the Pacific Highway northbound past Charlestown, merge onto the Newcastle Inner City Bypass (A37) to Maitland Rd.',
    transitDirections: 'Catch the 14 bus to Newcastle Interchange and transfer to the 11 bus to Mayfield.',
    localContext: 'Reliable repair services for Gateshead trade businesses, fleet smartphones, and family devices.',
    nearby: ['Charlestown', 'Belmont', 'Whitebridge', 'Windale']
  },
  {
    id: 'mount-hutton',
    name: 'Mount Hutton',
    postcode: '2290',
    distance: '15.1 km from our Mayfield shop',
    travelTime: '18–20 mins',
    drivingRoute: 'Head north along the Pacific Highway through Charlestown and the bypass into Industrial Drive and Maitland Rd.',
    transitDirections: 'Catch the 14 bus connecting through Charlestown Square directly to Newcastle transport routes.',
    localContext: 'Lake Macquarie residents choose us for transparent fixed quotes, free diagnostics, and 90-day guarantees.',
    nearby: ['Gateshead', 'Warners Bay', 'Tingira Heights', 'Eleebana']
  },
  {
    id: 'swansea',
    name: 'Swansea',
    postcode: '2281',
    distance: '27.4 km from our Mayfield shop',
    travelTime: '30–35 mins',
    drivingRoute: 'Take the Pacific Highway (A43) north through Belmont and Charlestown, then the bypass to Maitland Rd Mayfield.',
    transitDirections: 'Take the 14 bus from Swansea Heads through to Newcastle Interchange, then the 11 bus.',
    localContext: 'Swansea channel and beach locals bring their salt-damaged phones and tablets to us for ultrasonic isopropyl recovery.',
    nearby: ['Belmont', 'Caves Beach', 'Pelican', 'Blacksmiths']
  },
  {
    id: 'kurri-kurri',
    name: 'Kurri Kurri',
    postcode: '2327',
    distance: '31.2 km from our Mayfield shop',
    travelTime: '25–28 mins',
    drivingRoute: 'Take the Hunter Expressway (M15) eastbound, exit onto Newcastle Link Rd and proceed via Jesmond into Mayfield.',
    transitDirections: 'Catch the 160 or 164 bus connecting to Newcastle Interchange, then the 11 bus to Maitland Rd.',
    localContext: 'A rapid 25-minute drive on the Hunter Expressway brings Kurri Kurri residents directly to our doorstep for same-day mobile fixes.',
    nearby: ['Weston', 'Cessnock', 'Heddon Greta', 'Buchanan']
  },
  {
    id: 'cessnock',
    name: 'Cessnock',
    postcode: '2325',
    distance: '44.8 km from our Mayfield shop',
    travelTime: '35–40 mins',
    drivingRoute: 'Follow the Hunter Expressway (M15) eastbound directly toward Newcastle, merge onto Newcastle Link Rd into Mayfield.',
    transitDirections: 'Catch the 164 bus from Cessnock directly to Newcastle Interchange, then connect onto the 11 bus.',
    localContext: 'Hunter Valley wine country residents and hospitality operators count on our expert micro-soldering and tablet repairs.',
    nearby: ['Kurri Kurri', 'Bellbird', 'Nulkaba', 'Pokolbin']
  }
];

export const seoServices = [
  { id: 'phone-repair', name: 'Phone Repair' },
  { id: 'iphone-repair', name: 'iPhone Repair' },
  { id: 'samsung-repair', name: 'Samsung Repair' },
  { id: 'screen-repair', name: 'Screen Repair' },
  { id: 'ipad-repair', name: 'iPad Repair' },
  { id: 'macbook-repair', name: 'MacBook Repair' },
  { id: 'laptop-repair', name: 'Laptop Repair' },
  { id: 'battery-replacement', name: 'Battery Replacement' }
];
