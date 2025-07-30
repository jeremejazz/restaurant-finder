export interface LLMQueryResult {
  parameters: LLMQueryResultParameters;
}

interface LLMQueryResultParameters {
  query: string;
  near: string;
  min_price: number;
  max_price: number;
  open_now: boolean;
  rating: number;
}
