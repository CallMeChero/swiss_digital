export interface IPaginatedResponse<TEntry> {
  total_count: number;
  items: TEntry;
  incomplete_results: boolean;
}
