import dayjs from 'dayjs';
import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';

import { useCacheFirst } from '@/libs/redis/redis.util';
import { QuoteOfTheDay } from '@/types/qotd.type';
import { random } from '@/utils/array.util';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const quotes = JSON.parse(
      readFileSync('./src/datas/quotes.json', { encoding: 'utf-8' }),
    ) as QuoteOfTheDay[];
    const quoteOfTheDay = await useCacheFirst(
      `quoteOfTheDay:${dayjs().format('YYYY-MM-DD')}`,
      () => random(quotes),
      24 * 60 * 60,
      false,
    );

    return NextResponse.json({
      message: 'get quote of the day',
      data: {
        quote: quoteOfTheDay,
      },
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
