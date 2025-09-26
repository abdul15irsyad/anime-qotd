export interface IYurippeQuote {
  _id: number;
  character: string;
  show: string;
  quote: string;
}

export interface QuoteOfTheDay {
  id: string;
  character: {
    name: string;
    image: string;
  };
  show: string;
  quote: string;
}
