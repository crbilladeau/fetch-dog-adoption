/* Types */
import { Dog } from '../../SearchDashboard/types/Dog';

export interface SearchParams {
  breeds?: string[];
  minAge?: number;
  maxAge?: number;
  zipCodes?: string[];
  sort?: { field: string; order: string };
  size?: number;
  from?: string;
}

export interface FetchDogsResponse {
  dogs: Dog[];
  isLoading: boolean;
  isError: Error | null;
  next: string | null;
  prev: string | null;
}
