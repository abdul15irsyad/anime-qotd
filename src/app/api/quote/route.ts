import dayjs from 'dayjs';
import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

import { useCacheFirst } from '@/libs/redis/redis.util';
import { IYurippeQuote, QuoteOfTheDay } from '@/types/qotd.type';
import { random } from '@/utils/array.util';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const quotes = JSON.parse(
      readFileSync('./src/datas/quotes.json', { encoding: 'utf-8' }),
    ) as IYurippeQuote[];
    const quoteOfTheDay = await useCacheFirst({
      key: `quoteOfTheDay:${dayjs().format('YYYY-MM-DD')}`,
      getData: (): QuoteOfTheDay => {
        const quote = random(quotes);
        // const quote = quotes.find(({ id }) => id === 87)!;
        return {
          ...quote,
          character: {
            name: quote.character,
            image: `${slugify(quote.character, { lower: true, strict: true })}.jpg`,
          },
        };
      },
      ttlInSeconds: 24 * 60 * 60,
      enable: process.env.NODE_ENV === 'production' ? true : false,
    });

    return NextResponse.json({
      message: 'get quote of the day',
      data: quoteOfTheDay,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error)?.message ?? 'internal server error',
      },
      { status: 500 },
    );
  }
}
