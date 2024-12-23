export function readBit(value: number, position: number): number {
  return (value >> position) & 1;
}

export function setBit(value: number, position: number, bit: number): number {
  if (bit) {
    return value | (1 << position);
  }
  return value & ~(1 << position);
}

export function toggleBit(value: number, position: number): number {
  return value ^ (1 << position);
}
