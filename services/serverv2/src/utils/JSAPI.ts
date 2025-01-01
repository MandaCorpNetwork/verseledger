export interface DTO<D> {
  data: D;
}
export interface Resource<T>
  extends Partial<Metadata>,
    Partial<Links>,
    Partial<Attributes<T>> {
  id: string;
  type: string;
}
export interface TLLINK {
  self?: LinkObject;
  related?: LinkObject;
  describedby?: string;
}

export interface LinkObject extends Pagination {
  href: string;
  describedby?: string;
  title?: string;
  type?: string;
  meta?: Record<string, string>;
}

export interface Pagination {
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
}
export interface Attributes<T = Record<string, string>> {
  attributes: T;
}
export interface Links {
  links: LinkObject;
}
export interface Metadata {
  meta: Record<string, string>;
}
