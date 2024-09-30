import { BType } from './btype';

interface Sizeable {
  length: number;
}

const handleLength = (obj: Sizeable, small: BType, medium: BType, large: BType): Buffer => {
  const len = obj.length;

  if (len < 255) {
    const buff = Buffer.alloc(2);
    buff.writeInt8(small, 0);
    buff.writeUInt8(len, 1);

    return buff;
  }

  if (len < 65535) {
    const buff = Buffer.alloc(3);
    buff.writeInt8(medium, 0);
    buff.writeUInt16LE(len, 1);
    return buff;
  }

  const buff = Buffer.alloc(5);
  buff.writeInt8(large, 0);
  buff.writeUInt32LE(len, 1);
  return buff;
};

const encodeString = (stream: Buffer, str: string): Buffer => {
  const buff = Buffer.alloc(str.length);
  buff.write(str);
  const buffWithSize = Buffer.concat([handleLength(str, BType.STRING_SMALL, BType.STRING, BType.STRING_LARGE), buff]);

  return Buffer.concat([stream, buffWithSize]);
};

const encodeBoolean = (stream: Buffer, bool: boolean): Buffer => {
  const buff = Buffer.alloc(2);
  buff.writeInt8(BType.BOOLEAN, 0);
  buff.writeInt8(bool ? 1 : 0, 1);

  return Buffer.concat([stream, buff]);
};
const encodeUndefined = (stream: Buffer): Buffer => {
  const buff = Buffer.alloc(1);
  buff.writeInt8(BType.UNDEFINED, 0);

  return Buffer.concat([stream, buff]);
};
const encodeNull = (stream: Buffer): Buffer => {
  const buff = Buffer.alloc(1);
  buff.writeInt8(BType.NULL, 0);

  return Buffer.concat([stream, buff]);
};

const encodeNumberNano = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(2);
  buff.writeInt8(BType.NUMBER_NANO, 0);
  buff.writeInt8(num, 1);

  return Buffer.concat([stream, buff]);
};

const encodeNumberFloat = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(5);
  buff.writeInt8(BType.NUMBER_FLOAT, 0);
  buff.writeFloatLE(num, 1);

  return Buffer.concat([stream, buff]);
};

const encodeNumberSmall = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(3);
  buff.writeInt8(BType.NUMBER_SMALL, 0);
  buff.writeInt16LE(num, 1);

  return Buffer.concat([stream, buff]);
};

const encodeNumberDouble = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(9);
  buff.writeInt8(BType.NUMBER_DOUBLE, 0);
  buff.writeDoubleLE(num, 1);

  return Buffer.concat([stream, buff]);
};

const encodeNumberLarge = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(5);
  buff.writeInt8(BType.NUMBER, 0);
  buff.writeInt32LE(num, 1);

  return Buffer.concat([stream, buff]);
};

const encodeNumberLong = (stream: Buffer, num: bigint): Buffer => {
  const buff = Buffer.alloc(9);
  buff.writeInt8(BType.NUMBER_LARGE, 0);
  buff.writeBigInt64LE(num, 1);

  return Buffer.concat([stream, buff]);
};

const encodeNumber = (stream: Buffer, num: number): Buffer => {
  const isDecimal = !Number.isInteger(num);
  const absValue = Math.abs(num);

  if (absValue < 128)
    return isDecimal ? encodeNumberFloat(stream, num) : encodeNumberNano(stream, num);
  if (absValue < 32768)
    return isDecimal ? encodeNumberFloat(stream, num) : encodeNumberSmall(stream, num);
  if (absValue < 2147483648)
    return isDecimal ? encodeNumberDouble(stream, num) : encodeNumberLarge(stream, num);

  return isDecimal ? encodeNumberDouble(stream, num) : encodeNumberLong(stream, BigInt(num));
}

const encodeDate = (stream: Buffer, date: Date): Buffer => {
  const buff = Buffer.alloc(9);
  buff.writeInt8(BType.DATE, 0);
  buff.writeBigUInt64LE(BigInt(date.getTime()), 1);

  return Buffer.concat([stream, buff]);
}

// eslint-disable-next-line
const encodeArray = (stream: Buffer, value: any[]): Buffer => {
  const rootBuff = handleLength(value, BType.ARRAY_SMALL, BType.ARRAY, BType.ARRAY_LARGE);
  const buffs:Buffer[] = [];
  for (const arrVal of value) buffs.push(encodeValue(Buffer.alloc(0), arrVal));

  return Buffer.concat([stream, rootBuff, ...buffs]);
}

// eslint-disable-next-line
export const encodeKeyValuePair = (stream: Buffer, key: string, value: any): Buffer => {
  const buff = Buffer.alloc(key.length + 2);
  buff.writeInt8(BType.OBJECT_KEY,0);
  buff.writeUint8(key.length, 1);
  buff.write(key, 2);

  return Buffer.concat([stream, encodeValue(buff, value)]);
}

// eslint-disable-next-line
const encodeObject = (stream: Buffer, value: any): Buffer => {
  const keys = Object.keys(value);
  const buff = handleLength(keys, BType.OBJECT_SMALL, BType.OBJECT_KEY, BType.OBJECT_LARGE);
  const buffs: Buffer[] = [];

  for (const key of keys) buffs.push(encodeKeyValuePair(Buffer.alloc(0), key, value[key]));

  return Buffer.concat([stream, buff, ...buffs]);
}

// eslint-disable-next-line
export const encodeValue = (stream: Buffer, value: any):Buffer => {
  if (value === undefined) return encodeUndefined(stream);
  if (value === null) return encodeNull(stream);
  if (typeof value === 'boolean') return encodeBoolean(stream, value);
  if (typeof value === 'string') return encodeString(stream, value);
  if (typeof value === 'number') return encodeNumber(stream, value);
  if (Array.isArray(value)) return encodeArray(stream, value);
  if (value instanceof Date) return encodeDate(stream, value);
  if (typeof value === 'object') return encodeObject(stream, value);

  throw new Error(`Unknown type for ${typeof value}`);
}
