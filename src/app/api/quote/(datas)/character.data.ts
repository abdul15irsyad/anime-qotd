import { quotes } from './quote.data';

const characters = [...new Set(quotes.map(({ character }) => character))];
console.log(characters.sort());
