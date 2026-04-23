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
];
