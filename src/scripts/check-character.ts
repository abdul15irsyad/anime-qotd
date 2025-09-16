import { existsSync } from 'fs';

import { characters } from '../app/api/quote/(datas)/characters.data';

for (const character of characters
  .filter(({ image }) => !existsSync(`./public/characters/${image}`))
  .slice(0, 10)) {
  console.log(character.name, character.image);
}

// const filePath = path.join(__dirname, 'characters.ts');

// // Convert the array into a valid TS export
// const fileContent = `export const myArray = ${JSON.stringify(
//   characters.map((name) => ({
//     name,
//     image: `${slugify(name, { lower: true, strict: true })}.jpg`,
//   })),
//   null,
//   2,
// ).replace(/"/g, "'")} as const;\n`;

// fs.writeFileSync(filePath, fileContent, 'utf8');
