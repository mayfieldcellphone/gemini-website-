/**
 * Suburbs that are linked from "nearby suburbs" lists across the site but are not in
 * src/data/suburbs.ts (which drives the full suburb x service page matrix).
 * Each of these gets ONE pre-rendered hub page at /phone-repair/<id>, so no internal link
 * ever points at a URL that only exists client-side. No distances/postcodes are asserted here
 * on purpose - add them (and move the entry into suburbs.ts) once verified.
 */
export interface ExtraSuburb {
  id: string;
  name: string;
}

export const extraSuburbs: ExtraSuburb[] = [
  { id: 'aberglasslyn', name: 'Aberglasslyn' },
  { id: 'argenton', name: 'Argenton' },
  { id: 'bar-beach', name: 'Bar Beach' },
  { id: 'barnsley', name: 'Barnsley' },
  { id: 'bellbird', name: 'Bellbird' },
  { id: 'birmingham-gardens', name: 'Birmingham Gardens' },
  { id: 'blacksmiths', name: 'Blacksmiths' },
  { id: 'buchanan', name: 'Buchanan' },
  { id: 'callaghan', name: 'Callaghan' },
  { id: 'caves-beach', name: 'Caves Beach' },
  { id: 'chisholm', name: 'Chisholm' },
  { id: 'east-maitland', name: 'East Maitland' },
  { id: 'eleebana', name: 'Eleebana' },
  { id: 'elermore-vale', name: 'Elermore Vale' },
  { id: 'farley', name: 'Farley' },
  { id: 'fern-bay', name: 'Fern Bay' },
  { id: 'hamilton-north', name: 'Hamilton North' },
  { id: 'heatherbrae', name: 'Heatherbrae' },
  { id: 'heddon-greta', name: 'Heddon Greta' },
  { id: 'kahibah', name: 'Kahibah' },
  { id: 'kooragang', name: 'Kooragang' },
  { id: 'lochinvar', name: 'Lochinvar' },
  { id: 'macquarie-hills', name: 'Macquarie Hills' },
  { id: 'medowie', name: 'Medowie' },
  { id: 'minmi', name: 'Minmi' },
  { id: 'morpeth', name: 'Morpeth' },
  { id: 'newcastle-west', name: 'Newcastle West' },
  { id: 'north-lambton', name: 'North Lambton' },
  { id: 'nulkaba', name: 'Nulkaba' },
  { id: 'pelican', name: 'Pelican' },
  { id: 'pokolbin', name: 'Pokolbin' },
  { id: 'rankin-park', name: 'Rankin Park' },
  { id: 'speers-point', name: 'Speers Point' },
  { id: 'tarro', name: 'Tarro' },
  { id: 'telarah', name: 'Telarah' },
  { id: 'the-hill', name: 'The Hill' },
  { id: 'the-junction', name: 'The Junction' },
  { id: 'tingira-heights', name: 'Tingira Heights' },
  { id: 'tomago', name: 'Tomago' },
  { id: 'valentine', name: 'Valentine' },
  { id: 'west-wallsend', name: 'West Wallsend' },
  { id: 'weston', name: 'Weston' },
  { id: 'whitebridge', name: 'Whitebridge' },
  { id: 'williamtown', name: 'Williamtown' },
  { id: 'windale', name: 'Windale' },
  { id: 'woodberry', name: 'Woodberry' },
];
