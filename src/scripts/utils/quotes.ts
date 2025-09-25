import axios from 'axios';
import { writeFileSync } from 'fs';

import { IYurippeQuote } from '@/types/qotd.type';

const BASE_URL = 'https://yurippe.vercel.app/api';

export const yurippeAxios = axios.create({
  baseURL: BASE_URL,
});

export const defaultAnimes = [
  'one piece',
  'naruto',
  'shingeki no kyojin',
  'hunter x hunter',
  'eyeshield 21',
  'detective conan',
  'doraemon',
  'slam dunk',
  'death note',
  'one punch man',
];

export const getQuotesFromAPI = async ({ animes }: { animes: string[] }) => {
  const response = await yurippeAxios.get<IYurippeQuote[]>('/quotes', {
    params: {
      show: animes?.length > 0 ? animes.join(',') : undefined,
    },
  });
  const quotes = response.data.filter(
    ({ character }) => !['Kiyomi Takada'].includes(character),
  );
  console.log(`total quotes: ${quotes.length} data`);

  const filePath = './src/datas/quotes.json';
  const fileContent = JSON.stringify(
    quotes
      .map((quote) => ({
        id: quote._id,
        character: quote.character
          .replaceAll('Jaeger', 'Yeager')
          .replaceAll('Choji Akamichi', 'Chouji Akimichi')
          .replaceAll('Jimbei', 'Jinbei')
          .replaceAll('Detective Conan', 'Conan Edogawa'),
        show: quote.show.replaceAll('Shingeki no Kyojin', 'Attack on Titan'),
        quote: quote.quote.replaceAll('’', "'").replaceAll('´', "'"),
      }))
      .sort((a, b) =>
        a.show === b.show
          ? a.character < b.character
            ? -1
            : 1
          : a.show < b.show
            ? -1
            : 1,
      ),
    null,
    2,
  );

  writeFileSync(filePath, fileContent, { encoding: 'utf-8' });
};
