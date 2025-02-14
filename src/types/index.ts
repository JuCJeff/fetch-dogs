// Dog Interface
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogCardProps {
  dog: Dog;
  onFavoriteClick?: (id: string) => void;
  isFavorite?: boolean;
}

export interface FetchDogsParams {
  size?: number;
  from?: number;
  breeds?: string[];
  sort?: string;
}

// Breeds API Response
export interface BreedsResponse {
  breeds: string[];
}

export interface FetchDogsByIdParams {
  ids: string[];
}

// Context Type for Authentication
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
}

// State for Pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Sort Options
export type SortOption =
  | "breed:asc"
  | "breed:desc"
  | "name:asc"
  | "name:desc"
  | "age:asc"
  | "age:desc";
