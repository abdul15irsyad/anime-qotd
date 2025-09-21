import { readFileSync, writeFileSync } from 'fs';

import { IYurippeQuote } from '@/types/qotd.type';

import { yurippeAxios } from './quotes';

export const generateShows = () => {
  const quotes = JSON.parse(
    readFileSync('./src/datas/quotes.json', { encoding: 'utf-8' }),
  ) as IYurippeQuote[];
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

export const getAllShowsFromAPI = async () => {
  const response = await yurippeAxios.get<IYurippeQuote[]>('/quotes');
  const shows = [...new Set(response.data.map(({ show }) => show))];
  console.log(shows.sort((a, b) => (a > b ? -1 : 1)).join(', '));
};
