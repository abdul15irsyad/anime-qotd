import { generateCharacters } from './utils/characters';
import { defaultAnimes, getQuotesFromAPI } from './utils/quotes';
import { generateShows } from './utils/shows';

const main = async () => {
  await getQuotesFromAPI({ animes: defaultAnimes });
  generateCharacters();
  generateShows();

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
