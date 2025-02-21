/* Types */
import { Location } from '../../types/Location';

export interface FetchLocationsParams {
  query?: string;
  skip?: boolean;
}

export interface FetchLocationsResponse {
  locations: Location[];
  isLoading: boolean;
  isError: boolean;
}
