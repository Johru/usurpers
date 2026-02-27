import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join } from 'path';

const inputDir = './public/cards';

for (const file of readdirSync(inputDir)) {
  if (!file.match(/\.(png|jpg|jpeg)$/i)) continue;

  const inputPath = join(inputDir, file);
  const outputPath = join(inputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

  console.log(`converted ${file}`);
}
