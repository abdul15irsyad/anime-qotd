import './global.css';

import type { Metadata } from 'next';

import { Provider } from './(components)/provider';
import { outfit } from './(fonts)/outfit';

export const metadata: Metadata = {
  title: 'Anime Random Quote',
  creator: 'Irsyad Abdul',
  description:
    'random quote from top animes like One Piece, Attack on Titan, Naruto, etc.',
  icons: '/icon.png',
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body className={`${outfit.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};
