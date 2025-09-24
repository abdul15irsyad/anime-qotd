'use client';

import './page.css';

import { IconExclamationCircle } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { QuoteOfTheDay } from '@/types/qotd.type';
import { random } from '@/utils/array.util';

import { Loader } from './(components)/loader';
import { ShareButton } from './(components)/share-button';

const defaultCharacterImage = '/characters/default-character-image.jpg';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const randomQuote = useQuery({
    queryKey: ['random-quote'],
    queryFn: async () => {
      // await delay(2000);
      const response = await axios.get<{
        message: string;
        data: QuoteOfTheDay;
      }>('/api/quote');
      if (process.env.NODE_ENV !== 'production' && random([true, true]))
        throw 'error bro';
      return response.data.data;
    },
    retry: 0,
  });
  const [characterImage, setCharacterImage] = useState(defaultCharacterImage);

  useEffect(() => {
    setCharacterImage(
      randomQuote?.data?.character?.image
        ? `/characters/${randomQuote?.data?.character?.image}`
        : defaultCharacterImage,
    );
  }, [randomQuote?.data?.character]);

  return (
    <div className='container'>
      {randomQuote.isLoading ? (
        <Loader />
      ) : randomQuote.error ? (
        <div className='error'>
          <IconExclamationCircle size='1em' color='#ff881e' />
          <span>Quote error</span>
        </div>
      ) : (
        <div className='quote-card'>
          <div className='shareable' ref={ref}>
            <Image
              src={characterImage}
              alt={randomQuote?.data?.character?.name ?? 'character image'}
              className='character-img'
              onError={() => setCharacterImage(defaultCharacterImage)}
              width={720}
              height={720}
              priority
            />
            <blockquote>
              <span>{randomQuote?.data?.quote}</span>
              {[...new Array(2)].map((_, index) => (
                <div key={index} className='quote-illustration'>
                  <Image
                    src='/illustrations/double-quote.png'
                    alt='double quote'
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </blockquote>
            <div className='character-name'>
              {randomQuote?.data?.character?.name}
            </div>
            <div className='anime-show'>{randomQuote?.data?.show}</div>
          </div>
          <div className='share'>
            <ShareButton ref={ref} />
          </div>
        </div>
      )}
    </div>
  );
};
