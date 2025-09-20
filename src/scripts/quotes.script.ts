import { defaultAnimes, getQuotesFromAPI } from './utils/quotes';

const main = async () => {
  await getQuotesFromAPI({
    animes: defaultAnimes,
  });

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
