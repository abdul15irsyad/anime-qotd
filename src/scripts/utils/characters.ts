import { readFileSync, writeFileSync } from 'fs';
import slugify from 'slugify';

import { QuoteOfTheDay } from '@/types/qotd.type';

export const generateCharacters = async () => {
  const quotes = JSON.parse(
    readFileSync('./src/datas/quotes.json', { encoding: 'utf-8' }),
  ) as QuoteOfTheDay[];
  const characters = [...new Set(quotes.map(({ character }) => character))];
  console.log(`total characters: ${characters.length} data`);

  const filePath = './src/datas/characters.json';
  const fileContent = JSON.stringify(
    characters
      .map((character) => ({
        name: character,
        image: `${slugify(character, { lower: true, strict: true })}.jpg`,
      }))
      .sort((a, b) => (a.name < b.name ? -1 : 1)),
    null,
    2,
  );

  writeFileSync(filePath, fileContent, { encoding: 'utf8' });
};
