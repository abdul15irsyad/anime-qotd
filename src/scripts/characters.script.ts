import { generateCharacters } from './utils/characters';

const main = async () => {
  await generateCharacters();

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
