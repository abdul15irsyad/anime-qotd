import { generateCharacters } from './utils/characters';
import { generateQuotes } from './utils/quotes';
import { generateShows } from './utils/shows';

const main = async () => {
  await generateQuotes();
  await generateCharacters();
  await generateShows();

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
