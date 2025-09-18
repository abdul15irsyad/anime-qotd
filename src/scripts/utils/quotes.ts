import axios from 'axios';
import { writeFileSync } from 'fs';

import { QuoteOfTheDay } from '@/types/qotd.type';

const BASE_URL = 'https://yurippe.vercel.app/api';

export const yurippeAxios = axios.create({
  baseURL: BASE_URL,
});

export const generateQuotes = async () => {
  const animes = [
    'one piece',
    'naruto',
    'shingeki no kyojin',
    'hunter x hunter',
    'eyeshield 21',
    'detective conan',
    'doraemon',
    'slam dunk',
  ];

  const response = await yurippeAxios.get<QuoteOfTheDay[]>('/quotes', {
    params: {
      show: animes.join(','),
    },
  });
  const quotes = response.data;
  console.log(`total quotes: ${quotes.length} data`);

  const filePath = './src/datas/quotes.json';
  const fileContent = JSON.stringify(
    quotes.map((quote, index) => ({
      id: index,
      character: quote.character.replaceAll('Jaeger', 'Yeager'),
      show: quote.show,
      quote: quote.quote,
    })),
    null,
    2,
  );

  writeFileSync(filePath, fileContent, { encoding: 'utf-8' });
};
