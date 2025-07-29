export interface LLMQueryResult {
  parameters: LLMQueryResultParameters;
}

interface LLMQueryResultParameters {
  query: string;
  near: string;
  price: number;
  open_now: boolean;
  rating: number;
}
