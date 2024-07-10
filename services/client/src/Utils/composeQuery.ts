/* eslint-disable @typescript-eslint/no-explicit-any */
export const composeQuery = <T extends Record<any, any>>(
  query: T,
  cq = new URLSearchParams(),
  path?: string,
) => {
  for (const key of Object.keys(query)) {
    const newPath = path == null ? `${key}` : `${path}[${key}]`;
    const value = query[key];
    if (value == null) continue;
    if (typeof value !== 'object') {
      cq.append(newPath, value);
    } else {
      composeQuery(value, cq, newPath);
    }
  }
  return cq;
};
