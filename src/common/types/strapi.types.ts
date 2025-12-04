export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiSingleResponse<T> {
  data: StrapiEntity<T>;
}

export interface StrapiCollectionResponse<T> {
  data: StrapiEntity<T>[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

