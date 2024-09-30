export const compress = async (input: Buffer) => {
  const cs = new CompressionStream('gzip');
  const writer = cs.writable.getWriter();
  writer.write(input);
  writer.close();
  const output: Uint8Array[] = [];
  const reader = cs.readable.getReader();
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
  return Buffer.from(concatenated);
};
