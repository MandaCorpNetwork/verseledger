import path from 'path';
export function _getCallerFile() {
  const err = new Error();

  Error.prepareStackTrace = (_, stack) => stack;

  const stack = err.stack as unknown as NodeJS.CallSite[];

  Error.prepareStackTrace = undefined;
  const filePath = stack[2].getFileName();
  return path.basename(filePath as string);
}
