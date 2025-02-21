/* Types */
import { Dog } from '../../types/Dog';

export interface DogsSearchParams {
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
  isError: string | null;
  next: string | null;
  prev: string | null;
}
