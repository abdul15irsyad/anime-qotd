import type { Metadata } from 'next';

import { Provider } from './(components)/provider';
import { outfit } from './(fonts)/outfit';

export const metadata: Metadata = {
  title: 'Anime Quotes',
  description: 'quotes from top animes',
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
