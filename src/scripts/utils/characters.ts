import { existsSync, readFileSync, writeFileSync } from 'fs';
import slugify from 'slugify';

import { IYurippeQuote } from '@/types/qotd.type';

export const generateCharacters = () => {
  const quotes = JSON.parse(
    readFileSync('./src/datas/quotes.json', { encoding: 'utf-8' }),
  ) as IYurippeQuote[];
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

export const checkCharacterImages = () => {
  const characters = JSON.parse(
    readFileSync('./src/datas/characters.json', { encoding: 'utf-8' }),
  ) as { name: string; image: string }[];

  console.table(
    characters.map(({ name, image }) => ({
      name,
      haveImage: existsSync(`./public/characters/${image}`),
    })),
  );
};
