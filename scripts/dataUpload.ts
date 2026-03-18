import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface RawRow {
  id: string;
  label: string;
  set1: string;
  set2: string;
  cost: string;
  tier: string;
  rules: string;
}

const csv = fs.readFileSync(join(__dirname, 'usurper.csv'), 'utf-8');

const records = parse(csv, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  relax_quotes: true,
}) as RawRow[];

const cards = records.map((row: RawRow) => ({
  id: row.id,
  label: row.label,
  sets: [row.set1, row.set2],
  cost: row.cost,
  tier: row.tier,
  rules: row.rules,
}));

const formatted = '[\n' + cards.map((c) => '  ' + JSON.stringify(c)).join(',\n') + '\n]';
fs.writeFileSync(join(__dirname, '../public/cards.json'), formatted);
