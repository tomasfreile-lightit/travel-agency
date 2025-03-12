export interface RequestParams<T> {
  searchText?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: T;
  with?: string | string[];
}

export interface ServicePagination {
  count: number;
  currentPage: number;
  links: { next: string; previous: string };
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ServiceResponse<T> {
  data: T;
  pagination: ServicePagination;
  status: number;
  success: boolean;
}

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortDirection =
  (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];

export interface PaginationParams {
  page: number;
  perPage?: number;
}

export interface SearchParams {
  search?: string;
}

export interface SortingParams {
  orderBy: string | null;
  sortDirection: SortDirection | null;
}
