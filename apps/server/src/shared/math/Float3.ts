export class Float3 {
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static Zero() {
    return new Float3();
  }
  public static One() {
    return new Float3(1, 1, 1);
  }
  public static NaN() {
    return new Float3(Number.NaN, Number.NaN, Number.NaN);
  }
  public static Forward() {
    return new Float3(0, 0, 1);
  }
  public static Backward() {
    return new Float3(0, 0, -1);
  }
  public static Up() {
    return new Float3(0, 1, 0);
  }
  public static Down() {
    return new Float3(0, -1, 0);
  }
  public static Right() {
    return new Float3(1, 0, 0);
  }
  public static Left() {
    return new Float3(-1, 0, 0);
  }

  public get isNaN() {
    return Number.isNaN(this.x) || Number.isNaN(this.y) || Number.isNaN(this.z);
  }
  public get isInfinity() {
    return (
      !Number.isFinite(this.x) || !Number.isFinite(this.y) || !Number.isFinite(this.z)
    );
  }

  public isUniform(tolerance = 1e-5) {
    const num = Math.min(this.x, this.y, this.z) * tolerance;
    return Math.abs(this.x - this.y) <= num && Math.abs(this.y - this.z) <= num;
  }

  public approximately(v: Float3, tolerance: number) {
    return (
      Math.abs(this.x - v.x) < tolerance &&
      Math.abs(this.y - v.y) < tolerance &&
      Math.abs(this.z - v.z) < tolerance
    );
  }

  public get sqrMagnitude() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public get magnitude() {
    return Math.sqrt(this.sqrMagnitude);
  }

  public get normalized(): Float3 {
    return Float3.equals(Float3.Zero(), this) ? this : this.multiply(1 / this.magnitude);
  }

  public setComponent(value: number, index: number) {
    switch (index) {
      case 0:
        return new Float3(value, this.y, this.z);
      case 1:
        return new Float3(this.x, value, this.z);
      case 2:
        return new Float3(this.x, this.y, value);
      default:
        throw new Error('Invalid vector element index');
    }
  }

  public setX(value: number) {
    return this.setComponent(value, 0);
  }
  public setY(value: number) {
    return this.setComponent(value, 1);
  }
  public setZ(value: number) {
    return this.setComponent(value, 2);
  }

  public static equals(a: Float3, b: Float3) {
    return a.equals(b);
  }

  public equals(other: Float3) {
    return this.x == other.x && this.y == other.y && this.z == other.z;
  }

  public get three() {
    return [this.x, this.y, this.z] as const;
  }

  public multiply(other: Float3): Float3;
  public multiply(other: number): Float3;
  public multiply(x: number, y: number, z: number): Float3;
  public multiply(x: number | Float3, y?: number, z?: number): Float3 {
    if (x instanceof Float3) return this.multiply(x.x, x.y, x.z);
    if (y == null || z == null) return this.multiply(x, x, x);
    return new Float3(this.x * x, this.y * y, this.z * z);
  }

  public divide(other: Float3): Float3;
  public divide(other: number): Float3;
  public divide(x: number, y: number, z: number): Float3;
  public divide(x: number | Float3, y?: number, z?: number): Float3 {
    if (x instanceof Float3) return this.divide(x.x, x.y, x.z);
    if (y == null || z == null) return this.divide(x, x, x);
    return new Float3(this.x / x, this.y / y, this.z / z);
  }

  public add(other: Float3): Float3;
  public add(other: number): Float3;
  public add(x: number, y: number, z: number): Float3;
  public add(x: number | Float3, y?: number, z?: number): Float3 {
    if (x instanceof Float3) return this.add(x.x, x.y, x.z);
    if (y == null || z == null) return this.add(x, x, x);
    return new Float3(this.x + x, this.y + y, this.z + z);
  }

  public subtract(other: Float3): Float3;
  public subtract(other: number): Float3;
  public subtract(x: number, y: number, z: number): Float3;
  public subtract(x: number | Float3, y?: number, z?: number): Float3 {
    if (x instanceof Float3) return this.subtract(x.x, x.y, x.z);
    if (y == null || z == null) return this.subtract(x, x, x);
    return new Float3(this.x - x, this.y - y, this.z - z);
  }
}
