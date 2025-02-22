export interface FetchMatchParams {
  dogIds: string[];
  skip: boolean;
}

export interface FetchMatchResponse {
  match: string;
  isLoading: boolean;
  isError: string | null;
}
