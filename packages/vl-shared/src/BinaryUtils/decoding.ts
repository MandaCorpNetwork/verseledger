import { BType } from './btype';

interface IDecodeResult {
  // eslint-disable-next-line
  value: any;
  offset: number;
}

interface IDecodeKeyValueResult {
  // eslint-disable-next-line
  value: any;
  key: string;
  offset: number;
}

export const decodeType = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readInt8(offset),
    offset: offset + 1,
  };
};
const decodeUndefined = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: undefined,
    offset: offset,
  };
};
const decodeNull = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: null,
    offset: offset,
  };
};

const decodePropertyString = (stream: Buffer, offset: number): IDecodeResult => {
  const stringLen = stream.readUInt8(offset);

  return {
    value: stream.toString('utf8', offset + 1, offset + stringLen + 1),
    offset: offset + stringLen + 1,
  };
};

const decodeStringSmall = (stream: Buffer, offset: number): IDecodeResult => {
  const stringLen = stream.readUInt8(offset);

  return {
    value: stream.toString('utf8', offset + 1, offset + stringLen + 1),
    offset: offset + stringLen + 1,
  };
};
const decodeString = (stream: Buffer, offset: number): IDecodeResult => {
  const stringLen = stream.readUInt16LE(offset);

  return {
    value: stream.toString('utf8', offset + 2, offset + stringLen + 2),
    offset: offset + stringLen + 2,
  };
};

const decodeStringLarge = (stream: Buffer, offset: number): IDecodeResult => {
  const stringLen = stream.readUInt32LE(offset);

  return {
    value: stream.toString('utf8', offset + 4, offset + stringLen + 4),
    offset: offset + stringLen + 4,
  };
};
const decodeBoolean = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readInt8(offset) === 1,
    offset: offset + 1,
  };
};
const decodeNumberNano = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readInt8(offset),
    offset: offset + 1,
  };
};
const decodeNumberSmall = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readInt16LE(offset),
    offset: offset + 2,
  };
};
const decodeNumber = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readInt32LE(offset),
    offset: offset + 4,
  };
};
const decodeNumberFloat = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readFloatLE(offset),
    offset: offset + 4,
  };
};

const decodeNumberDouble = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readDoubleLE(offset),
    offset: offset + 8,
  };
};

const decodeNumberLong = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: stream.readBigInt64LE(offset),
    offset: offset + 8,
  };
};

const decodeArraySmall = (stream: Buffer, offset: number): IDecodeResult => {
  const len = stream.readInt8(offset);
  return decodeArrayImpl(stream, offset + 1, len);
};
const decodeArray = (stream: Buffer, offset: number): IDecodeResult => {
  const len = stream.readInt16LE(offset);
  return decodeArrayImpl(stream, offset + 2, len);
};
const decodeArrayLarge = (stream: Buffer, offset: number): IDecodeResult => {
  const len = stream.readInt32LE(offset);
  return decodeArrayImpl(stream, offset + 4, len);
};

const decodeArrayImpl = (stream: Buffer, offset: number, len: number): IDecodeResult => {
  let curr = offset;
  let iter = 0;
  const returnVal = [];

  while (iter < len) {
    const typeResult = decodeType(stream, curr);
    const result = decodeValue(stream, typeResult.value, typeResult.offset);
    returnVal.push(result.value);
    curr = result.offset;
    iter++;
  }

  return {
    value: returnVal,
    offset: curr,
  };
};

const decodeObjectSmall = (stream: Buffer, offset: number): IDecodeResult => {
  const len = stream.readInt8(offset);
  return decodeObjectImpl(stream, offset + 1, len);
};

const decodeObject = (stream: Buffer, offset: number): IDecodeResult => {
  const len = stream.readInt16LE(offset);
  return decodeObjectImpl(stream, offset + 2, len);
};

const decodeObjectLarge = (stream: Buffer, offset: number): IDecodeResult => {
  const len = stream.readInt32LE(offset);
  return decodeObjectImpl(stream, offset + 4, len);
};

const decodeObjectImpl = (stream: Buffer, offset: number, len: number): IDecodeResult => {
  let curr = offset;
  // eslint-disable-next-line
  const retVal: any = {};
  let iter = 0;

  while (iter < len) {
    const typeRes = decodeType(stream, curr);
    const res = decodeKeyValuePair(stream, typeRes.offset);
    curr = res.offset;
    retVal[res.key] = res.value;
    iter++;
  }

  return {
    value: retVal,
    offset: curr,
  };
};

const decodeDate = (stream: Buffer, offset: number): IDecodeResult => {
  return {
    value: new Date(Number(stream.readBigUInt64LE(offset))),
    offset: offset + 8,
  };
};

export const decodeValue = (
  stream: Buffer,
  type: number,
  offset: number,
): IDecodeResult => {
  if (type === BType.UNDEFINED) {
    return decodeUndefined(stream, offset);
  }

  if (type === BType.NULL) {
    return decodeNull(stream, offset);
  }

  if (type === BType.BOOLEAN) {
    return decodeBoolean(stream, offset);
  }

  if (type === BType.STRING_SMALL) {
    return decodeStringSmall(stream, offset);
  }

  if (type === BType.STRING) {
    return decodeString(stream, offset);
  }

  if (type === BType.STRING_LARGE) {
    return decodeStringLarge(stream, offset);
  }

  if (type === BType.NUMBER_LARGE) {
    return decodeNumberLong(stream, offset);
  }

  if (type === BType.NUMBER) {
    return decodeNumber(stream, offset);
  }

  if (type === BType.NUMBER_NANO) {
    return decodeNumberNano(stream, offset);
  }

  if (type === BType.NUMBER_SMALL) {
    return decodeNumberSmall(stream, offset);
  }

  if (type === BType.NUMBER_FLOAT) {
    return decodeNumberFloat(stream, offset);
  }

  if (type === BType.NUMBER_DOUBLE) {
    return decodeNumberDouble(stream, offset);
  }

  if (type === BType.ARRAY_SMALL) {
    return decodeArraySmall(stream, offset);
  }

  if (type === BType.ARRAY) {
    return decodeArray(stream, offset);
  }

  if (type === BType.ARRAY_LARGE) {
    return decodeArrayLarge(stream, offset);
  }

  if (type === BType.OBJECT_SMALL) {
    return decodeObjectSmall(stream, offset);
  }

  if (type === BType.OBJECT) {
    return decodeObject(stream, offset);
  }

  if (type === BType.OBJECT_LARGE) {
    return decodeObjectLarge(stream, offset);
  }

  if (type === BType.DATE) {
    return decodeDate(stream, offset);
  }

  throw new Error(`Unknown type ${type}`);
};

const decodeKeyValuePair = (stream: Buffer, offset: number): IDecodeKeyValueResult => {
  const keyResult = decodePropertyString(stream, offset);
  const valueTypeResult = decodeType(stream, keyResult.offset);
  const valueResult = decodeValue(stream, valueTypeResult.value, valueTypeResult.offset);

  return {
    key: keyResult.value,
    value: valueResult.value,
    offset: valueResult.offset,
  };
};
