import { generateShows } from './utils/shows';

const main = async () => {
  await generateShows();
  // await getAllShowsFromAPI();

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
