'use client';

import './page.css';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { QuoteOfTheDay } from '@/types/qotd.type';

const defaultCharacterImage = '/characters/default-character-image.jpg';

export default () => {
  const randomQuote = useQuery({
    queryKey: ['random-quote'],
    queryFn: async () => {
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
    <div className='quote-card'>
      <Image
        src={characterImage}
        alt={randomQuote?.data?.character?.name ?? 'Character'}
        className='character-img'
        onError={() => setCharacterImage(defaultCharacterImage)}
        width={720}
        height={720}
      />
      <blockquote>{randomQuote?.data?.quote}</blockquote>
      <div className='character-name'>{randomQuote?.data?.character?.name}</div>
      <div className='anime-show'>{randomQuote?.data?.show}</div>
    </div>
  );
};
