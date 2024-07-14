export type IPaginatedData<T> = {
  data: T[];
  pages: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
};

export type IPaginatedDataSlice = {
  total: number;
  limit: number;
  page: number;
  pages: number;
}