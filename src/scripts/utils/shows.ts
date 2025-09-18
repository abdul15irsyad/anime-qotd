import { readFileSync, writeFileSync } from 'fs';

import { QuoteOfTheDay } from '@/types/qotd.type';

export const generateShows = async () => {
  const quotes = JSON.parse(
    readFileSync('./src/datas/quotes.json', { encoding: 'utf-8' }),
  ) as QuoteOfTheDay[];
  const shows = [...new Set(quotes.map(({ show }) => show))];
  console.log(`total shows: ${shows.length} data`);

  const filePath = './src/datas/shows.json';
  const fileContent = JSON.stringify(
    shows
      .map((show) => ({ title: show }))
      .sort((a, b) => (a.title < b.title ? -1 : 1)),
    null,
    2,
  );

  writeFileSync(filePath, fileContent, { encoding: 'utf8' });
};
