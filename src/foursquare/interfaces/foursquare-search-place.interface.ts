export interface FoursquareSearchPlace {
  query?: string | undefined | null;
  near?: string | undefined | null;
  min_price?: string | undefined | null;
  max_price?: string | undefined | null;
  open_now?: string | undefined | null;
  rating?: string | undefined | null;
  fsq_category_ids?: string | undefined;
}
