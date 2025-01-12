export class Float2 {
  public readonly x: number;
  public readonly y: number;
  constructor(x = 0.0, y = 0.0) {
    this.x = x;
    this.y = y;
  }

  public static Zero() {
    return new Float2();
  }
  public static One() {
    return new Float2(1, 1);
  }
  public static NaN() {
    return new Float2(Number.NaN, Number.NaN);
  }

  public get isNaN() {
    return Number.isNaN(this.x) || Number.isNaN(this.y);
  }
  public get isInfinity() {
    return !Number.isFinite(this.x) || !Number.isFinite(this.y);
  }

  public approximately(v: Float2, tolerance: number) {
    return Math.abs(this.x - v.x) < tolerance && Math.abs(this.y - v.y) < tolerance;
  }

  public get sqrMagnitude() {
    return this.x * this.x + this.y * this.y;
  }

  public get magnitude() {
    return Math.sqrt(this.sqrMagnitude);
  }

  public get normalized(): Float2 {
    return Float2.equals(Float2.Zero(), this) ? this : this.multiply(1 / this.magnitude);
  }

  public setComponent(value: number, index: number) {
    switch (index) {
      case 0:
        return new Float2(value, this.y);
      case 1:
        return new Float2(this.x, value);
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

  public static equals(a: Float2, b: Float2) {
    return a.equals(b);
  }

  public equals(other: Float2) {
    return this.x == other.x && this.y == other.y;
  }

  public multiply(other: Float2): Float2;
  public multiply(other: number): Float2;
  public multiply(x: number, y: number): Float2;
  public multiply(x: number | Float2, y?: number): Float2 {
    if (x instanceof Float2) return this.multiply(x.x, x.y);
    if (y == null) return this.multiply(x, x);
    return new Float2(this.x * x, this.y * y);
  }

  public divide(other: Float2): Float2;
  public divide(other: number): Float2;
  public divide(x: number, y: number): Float2;
  public divide(x: number | Float2, y?: number): Float2 {
    if (x instanceof Float2) return this.divide(x.x, x.y);
    if (y == null) return this.divide(x, x);
    return new Float2(this.x / x, this.y / y);
  }

  public add(other: Float2): Float2;
  public add(other: number): Float2;
  public add(x: number, y: number): Float2;
  public add(x: number | Float2, y?: number): Float2 {
    if (x instanceof Float2) return this.add(x.x, x.y);
    if (y == null) return this.add(x, x);
    return new Float2(this.x + x, this.y + y);
  }

  public subtract(other: Float2): Float2;
  public subtract(other: number): Float2;
  public subtract(x: number, y: number): Float2;
  public subtract(x: number | Float2, y?: number): Float2 {
    if (x instanceof Float2) return this.subtract(x.x, x.y);
    if (y == null) return this.subtract(x, x);
    return new Float2(this.x - x, this.y - y);
  }
}
