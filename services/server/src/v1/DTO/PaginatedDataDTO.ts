import { DTOBase } from './DTOBase';

export class PaginatedDataInfo {
  public total: number;
  public limit: number;
  public page: number;
  public pages: number;
  constructor($b: { total: number; limit: number; page: number }) {
    this.total = $b.total;
    this.limit = $b.limit;
    this.page = $b.page;
    this.pages = Math.ceil(this.total / this.limit);
  }
}

export class PaginatedDataDTO<K, T> extends DTOBase<T> {
  public data!: T[];
  public pagination!: PaginatedDataInfo;

  public __type = 'PaginatedData';

  constructor(
    data: K[],
    pagination: { total: number; limit: number; page: number },
    override?: new (input: K) => T,
  ) {
    super();
    this.mapProperties(
      {
        data,
        pagination,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      override != null
        ? { data: override, pagination: PaginatedDataInfo }
        : { pagination: PaginatedDataInfo },
    );
  }
}
