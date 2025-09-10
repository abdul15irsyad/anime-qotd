import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { random } from '@/app/(utils)/array.util';

import { useCacheFirst } from '../../(libs)/redis/redis.util';
import { quotes } from './(datas)/quote.data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
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
