export const decompress = async (input: Buffer): Promise<Uint8Array> => {
  const ds = new DecompressionStream('gzip');
  const writer = ds.writable.getWriter();
  writer.write(input);
  writer.close();
  const output: Uint8Array[] = [];
  const reader = ds.readable.getReader();
  let totalSize = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    output.push(value);
    totalSize += value.byteLength;
  }
  const concatenated = new Uint8Array(totalSize);
  let offset = 0;
  for (const array of output) {
    concatenated.set(array, offset);
    offset += array.byteLength;
  }
  return concatenated;
};
