import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Provider } from './(components)/provider';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

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
      <body className={`${poppins.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};
