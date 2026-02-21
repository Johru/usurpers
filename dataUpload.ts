import fs from 'fs';

const csv = fs.readFileSync('usurper.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1); // skip header row

const cards = lines.map((line) => {
  const [id, label, set1, set2] = line.split(',').map((s) => s.trim());
  return { id, label, sets: [set1, set2] };
});

const formatted = '[\n' + cards.map((c) => '  ' + JSON.stringify(c)).join(',\n') + '\n]';
fs.writeFileSync('cards.json', formatted);
