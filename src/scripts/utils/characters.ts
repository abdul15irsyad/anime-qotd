import { existsSync, readFileSync, writeFileSync } from 'fs';
import slugify from 'slugify';

import { IYurippeQuote } from '@/types/qotd.type';

export const generateCharacters = () => {
  const quotes = JSON.parse(
    readFileSync('./src/datas/quotes.json', { encoding: 'utf-8' }),
  ) as IYurippeQuote[];
  const characterUniqueNames = [
    ...new Set(quotes.map(({ character }) => character)),
  ];
  const characters = characterUniqueNames.map((name) => {
    const quote = quotes.find(({ character }) => character === name)!;
    return {
      name: quote.character,
      show: quote.show,
    };
  });
  console.log(`total characters: ${characters.length} data`);

  const filePath = './src/datas/characters.json';
  const fileContent = JSON.stringify(
    characters
      .map((character) => ({
        ...character,
        image: `${slugify(character.name, { lower: true, strict: true })}.jpg`,
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
  ) as { name: string; show: string; image: string }[];

  const charactersWithImage = characters.map(({ name, show, image }) => ({
    name,
    image,
    haveImage: existsSync(`./public/characters/${image}`),
    show,
  }));
  console.log(charactersWithImage.filter(({ haveImage }) => !haveImage).length);
  console.table(
    charactersWithImage.filter(({ haveImage }) => !haveImage).slice(0, 10),
  );
};
