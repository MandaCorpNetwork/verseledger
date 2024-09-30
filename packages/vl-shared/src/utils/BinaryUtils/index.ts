import { encodeValue } from './encoding';
import { decodeType, decodeValue } from './decoding';

// eslint-disable-next-line
export const encode = (json: any) => {
  return encodeValue(Buffer.alloc(0), json);
}

// eslint-disable-next-line
export const decode = (stream: Buffer): any => {
  const type = decodeType(stream, 0)

  return decodeValue(stream, type.value, type.offset).value
}