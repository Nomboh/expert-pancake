export interface Pagination {
  currentPage: number;
  itemPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginationResult<T> {
  data: T;
  paginatin: Pagination;

  constructor(data: T, pagination: Pagination) {
    this.data = data;
    this.paginatin = pagination;
  }
}

export class PagingParams {
  pageSize = 2;
  pageNumber = 1;

  constructor(pageSize = 2, pageNumber = 1) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}
