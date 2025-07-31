export interface LLMQueryResult {
  parameters: LLMQueryResultParameters;
}

interface LLMQueryResultParameters {
  query: string;
  near?: string | undefined;
  min_price?: number | undefined;
  max_price?: number | undefined;
  open_now?: boolean | undefined;
  rating?: number | undefined;
}
