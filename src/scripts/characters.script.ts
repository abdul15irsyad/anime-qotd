import { generateCharacters } from './utils/characters';

const main = async () => {
  generateCharacters();
  // checkCharacterImages();

  process.exit(0);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
