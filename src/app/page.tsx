'use client';

import './page.css';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { QuoteOfTheDay } from '@/types/qotd.type';

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
      return response.data.data;
    },
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
      ) : (
        <div className='quote-card' ref={ref}>
          <Image
            src={characterImage}
            alt={randomQuote?.data?.character?.name ?? 'character image'}
            className='character-img'
            onError={() => setCharacterImage(defaultCharacterImage)}
            width={720}
            height={720}
          />
          <blockquote>
            <span>{randomQuote?.data?.quote}</span>
            <div className='quote-illustration'>
              <Image
                src='/illustrations/double-quote.png'
                alt='double quote'
                width={32}
                height={32}
              />
            </div>
          </blockquote>
          <div className='character-name'>
            {randomQuote?.data?.character?.name}
          </div>
          <div className='anime-show'>{randomQuote?.data?.show}</div>
          <div className='share'>
            <ShareButton ref={ref} />
          </div>
        </div>
      )}
    </div>
  );
};
