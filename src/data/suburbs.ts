export interface Suburb {
  id: string;
  name: string;
  distance: string;
  nearby: string[];
}

export const suburbs: Suburb[] = [
  { id: 'newcastle', name: 'Newcastle', distance: 'just a 10-minute drive', nearby: ['Newcastle West', 'Merewether'] },
  { id: 'waratah', name: 'Waratah', distance: 'right next door, practically a 2-minute drive', nearby: ['Georgetown', 'Callaghan'] },
  { id: 'wallsend', name: 'Wallsend', distance: 'only a 12-minute drive down the road', nearby: ['Jesmond', 'Elermore Vale'] },
  { id: 'jesmond', name: 'Jesmond', distance: 'a short 8-minute trip', nearby: ['Callaghan', 'Wallsend'] },
  { id: 'merewether', name: 'Merewether', distance: 'about a 15-minute drive', nearby: ['The Junction', 'Newcastle'] },
  { id: 'charlestown', name: 'Charlestown', distance: 'an easy 20-minute drive', nearby: ['Kotara', 'Gateshead'] },
  { id: 'kotara', name: 'Kotara', distance: 'just 15 minutes away', nearby: ['Adamstown', 'Broadmeadow'] },
  { id: 'lambton', name: 'Lambton', distance: 'a quick 5-minute trip', nearby: ['New Lambton', 'Broadmeadow'] },
  { id: 'broadmeadow', name: 'Broadmeadow', distance: 'only 5 minutes away', nearby: ['Hamilton', 'Adamstown'] },
  { id: 'hamilton', name: 'Hamilton', distance: 'a short 6-minute drive', nearby: ['Islington', 'Broadmeadow'] },
  { id: 'cardiff', name: 'Cardiff', distance: 'about 20 minutes away', nearby: ['Glendale', 'Macquarie Hills'] },
  { id: 'glendale', name: 'Glendale', distance: 'a 20-minute drive', nearby: ['Edgeworth', 'Cardiff'] },
  { id: 'islington', name: 'Islington', distance: 'just 5 minutes away', nearby: ['Tighes Hill', 'Hamilton'] },
  { id: 'georgetown', name: 'Georgetown', distance: 'a 3-minute drive', nearby: ['Waratah', 'Broadmeadow'] },
  { id: 'adamstown', name: 'Adamstown', distance: 'about 12 minutes away', nearby: ['Kotara', 'Broadmeadow'] },
  { id: 'stockton', name: 'Stockton', distance: 'a 15-minute trip across the bridge', nearby: ['Fern Bay', 'Newcastle'] },
  { id: 'new-lambton', name: 'New Lambton', distance: 'a 7-minute drive', nearby: ['Lambton', 'Kotara'] },
  { id: 'tighes-hill', name: 'Tighes Hill', distance: 'a quick 3-minute hop', nearby: ['Mayfield', 'Islington'] },
  { id: 'carrington', name: 'Carrington', distance: 'an 8-minute drive via Industrial Drive', nearby: ['Maryville', 'Wickham'] },
  { id: 'maryville', name: 'Maryville', distance: 'just a 6-minute drive', nearby: ['Islington', 'Carrington'] },
  { id: 'mayfield-east', name: 'Mayfield East', distance: 'practically on our doorstep, 1 minute away', nearby: ['Mayfield', 'Tighes Hill'] },
  { id: 'mayfield-west', name: 'Mayfield West', distance: 'just a 2-minute drive down the road', nearby: ['Mayfield', 'Waratah'] },
  { id: 'wickham', name: 'Wickham', distance: 'an 8-minute drive via Hannell St', nearby: ['Maryville', 'Newcastle'] },
  { id: 'mayfield', name: 'Mayfield', distance: 'right here in our shop', nearby: ['Waratah', 'Islington'] },

  { id: 'warners-bay', name: 'Warners Bay', distance: 'about a 25-minute drive', nearby: ['Belmont', 'Cardiff'] },
  { id: 'belmont', name: 'Belmont', distance: 'a 30-minute drive down the highway', nearby: ['Warners Bay', 'Gateshead'] },
  { id: 'raymond-terrace', name: 'Raymond Terrace', distance: 'a 20-minute drive up the Pacific Highway', nearby: ['Heatherbrae', 'Hexham'] },
  { id: 'maitland', name: 'Maitland', distance: 'a 35-minute drive via the New England Hwy', nearby: ['Rutherford', 'Thornton'] },
  { id: 'edgeworth', name: 'Edgeworth', distance: 'a 25-minute trip', nearby: ['Glendale', 'Cameron Park'] },
  { id: 'cameron-park', name: 'Cameron Park', distance: 'about 25 minutes via the link road', nearby: ['Edgeworth', 'Fletcher'] },
  { id: 'fletcher', name: 'Fletcher', distance: 'a 20-minute drive', nearby: ['Maryland', 'Minmi'] },
  { id: 'maryland', name: 'Maryland', distance: 'a 15-minute trip', nearby: ['Fletcher', 'Wallsend'] },
  { id: 'sandgate', name: 'Sandgate', distance: 'just 5 minutes up Maitland Road', nearby: ['Shortland', 'Hexham'] },
  { id: 'shortland', name: 'Shortland', distance: 'an easy 10-minute drive', nearby: ['Sandgate', 'Callaghan'] },
  { id: 'hexham', name: 'Hexham', distance: 'a 12-minute drive up the highway', nearby: ['Sandgate', 'Beresfield'] },
  { id: 'beresfield', name: 'Beresfield', distance: 'about 15 minutes away', nearby: ['Hexham', 'Thornton'] },
  { id: 'thornton', name: 'Thornton', distance: 'a 20-minute drive', nearby: ['Beresfield', 'Maitland'] },
  { id: 'rutherford', name: 'Rutherford', distance: 'a 40-minute trip', nearby: ['Maitland', 'Aberglasslyn'] },
  { id: 'gateshead', name: 'Gateshead', distance: 'about 25 minutes away', nearby: ['Charlestown', 'Belmont'] },
  { id: 'mount-hutton', name: 'Mount Hutton', distance: 'a 25-minute drive', nearby: ['Gateshead', 'Warners Bay'] },
  { id: 'swansea', name: 'Swansea', distance: 'a 40-minute drive south', nearby: ['Belmont', 'Caves Beach'] },
  { id: 'kurri-kurri', name: 'Kurri Kurri', distance: 'a 35-minute drive via the Hunter Expressway', nearby: ['Weston', 'Cessnock'] },
  { id: 'cessnock', name: 'Cessnock', distance: 'a 45-minute drive into the Hunter', nearby: ['Kurri Kurri', 'Bellbird'] },
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
