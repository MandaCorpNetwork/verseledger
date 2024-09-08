/* eslint-disable @typescript-eslint/no-explicit-any */
export type IDTOBase<bPartial extends boolean> = {
  __partial: bPartial;
  __type: string;
};

export type IDTOPartial<T extends Record<any, any>> = IDTOBase<true> & Partial<T>;

export type IDTOComplete<T extends Record<any, any>> = IDTOBase<false> & T;

export type IDTO<T extends Record<any, any>> = IDTOComplete<T> | IDTOPartial<T>;
