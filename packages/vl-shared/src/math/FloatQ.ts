import { Float3 } from './Float3';
import { MathX } from './MathX';

export class FloatQ {
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;
  public readonly w: number;
  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public static Identity() {
    return new FloatQ(0, 0, 0, 1);
  }
  public static MinValue() {
    return new FloatQ(-1, -1, -1, -1);
  }
  public static MaxValue() {
    return new FloatQ(1, 1, 1, 1);
  }

  public get sqrMagnitude() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  public get magnitude() {
    return Math.sqrt(this.sqrMagnitude);
  }

  public get absoluteSum() {
    const fq = MathX.abs(this);
    return fq.x + fq.y + fq.z + fq.w;
  }

  public get normalized() {
    return this.multiply(1 / this.magnitude);
  }
  public get fastNormalized() {
    const sqrMagnitude = this.sqrMagnitude;
    return MathX.abs(1 - sqrMagnitude) < 2.1073420342077043e-8
      ? this.multiply(2.0 / (1.0 + sqrMagnitude))
      : this.multiply(1 / Math.sqrt(sqrMagnitude));
  }

  public get sumNormalized() {
    return this.multiply(1 / this.absoluteSum);
  }

  public get filtered() {
    return new FloatQ(
      Math.abs(this.x) < 9.9999997473787516e-6 ? 0.0 : this.x,
      Math.abs(this.y) < 9.9999997473787516e-6 ? 0.0 : this.y,
      Math.abs(this.z) < 9.9999997473787516e-6 ? 0.0 : this.z,
      Math.abs(this.w) < 9.9999997473787516e-6 ? 0.0 : this.w,
    );
  }

  public get isIdentity() {
    return (
      Math.abs(this.x) < 9.9999997473787516e-6 &&
      Math.abs(this.y) < 9.9999997473787516e-6 &&
      Math.abs(this.z) < 9.9999997473787516e-6 &&
      Math.abs(this.w - 1) < 9.9999997473787516e-6
    );
  }

  public get isValid() {
    const sqrMagnitude = this.sqrMagnitude;
    return sqrMagnitude > 0.89999997615814209 && sqrMagnitude < 1.1000000238418579;
  }

  public get isNaN() {
    return (
      Number.isNaN(this.x) ||
      Number.isNaN(this.y) ||
      Number.isNaN(this.z) ||
      Number.isNaN(this.w)
    );
  }
  public get isInfinity() {
    return (
      !Number.isFinite(this.x) ||
      !Number.isFinite(this.y) ||
      !Number.isFinite(this.z) ||
      !Number.isFinite(this.w)
    );
  }

  public get negated() {
    return this.multiply(-1);
  }

  public get congugated() {
    return new FloatQ(-this.x, -this.y, -this.z, this.w);
  }

  public get inverted() {
    return this.congugated;
  }

  public get eulerAngles() {
    return this.eulerAngledRad.multiply(57.29578);
  }
  public get eulerAngledRad() {
    return new Float3(
      Math.asin(MathX.clamp(2.0 * (this.x * this.w - this.z * this.y), -1, 1)),
      Math.atan2(
        2.0 * (this.w * this.y + this.z * this.x),
        1.0 - 2.0 * (this.x * this.x + this.y * this.y),
      ),
      Math.atan2(
        2.0 * (this.y * this.x + this.z * this.w),
        1.0 - 2.0 * (this.x * this.x + this.z * this.z),
      ),
    );
  }

  public static axisAngle(axis: Float3, angle: number) {
    return FloatQ.axisAngleRad(axis, angle * (Math.PI / 180.0));
  }

  public static axisAngleRad(axis: Float3, radians: number) {
    radians *= 0.5;
    const newAxis = axis.normalized.multiply(Math.sin(radians));
    return new FloatQ(newAxis.x, newAxis.y, newAxis.z, Math.cos(radians));
  }

  public static lookRotation(forward: Float3, up = Float3.Up()) {
    if (forward.equals(Float3.Zero())) return FloatQ.Identity();
    const normalized = forward.normalized;
    let b = MathX.cross(up, normalized);
    b = !b.equals(Float3.Zero())
      ? b.normalized
      : FloatQ.euler(-90, 0, 0).multiply(normalized);
    const float3 = MathX.cross(normalized, b);
    const num1 = b.x + float3.y + normalized.z;
    let w, x, y, z;
    if (num1 > 0.0) {
      const num2 = Math.sqrt(num1 + 1);
      w = num2 * 0.5;
      const num3 = 0.5 / num2;
      x = (float3.z - normalized.y) * num3;
      y = (normalized.x - b.z) * num3;
      z = (b.y - float3.x) * num3;
    } else if (b.x >= float3.y && b.x >= normalized.z) {
      const num4 = Math.sqrt(1 + b.x - float3.y - normalized.z);
      const num5 = 0.5 / num4;
      x = 0.5 * num4;
      y = (b.y + float3.x) * num5;
      z = (b.z + normalized.x) * num5;
      w = (float3.z - normalized.y) * num5;
    } else if (float3.y > normalized.z) {
      const num6 = Math.sqrt(1 + float3.y - b.x - normalized.z);
      const num7 = 0.5 / num6;
      x = (float3.x + b.y) * num7;
      y = 0.5 * num6;
      z = (normalized.y + float3.z) * num7;
      w = (normalized.x - b.z) * num7;
    } else {
      const num8 = Math.sqrt(1 + normalized.z - b.x - float3.y);
      const num9 = 0.5 / num8;
      x = (normalized.x + b.z) * num9;
      y = (normalized.y + float3.z) * num9;
      z = 0.5 * num8;
      w = (b.y - float3.x) * num9;
    }
    return new FloatQ(x, y, z, w);
  }

  public static euler(x: number, y: number, z: number): FloatQ;
  public static euler(rotation: Float3): FloatQ;
  public static euler(rotation: number | Float3, y?: number, z?: number): FloatQ {
    if (!(rotation instanceof Float3)) return FloatQ.euler(new Float3(rotation, y, z));
    return FloatQ.eulerRad(rotation.multiply(Math.PI / 180));
  }

  public static eulerRad(x: number, y: number, z: number): FloatQ;
  public static eulerRad(rotation: Float3): FloatQ;
  public static eulerRad(rotation: number | Float3, y?: number, z?: number): FloatQ {
    if (!(rotation instanceof Float3)) return FloatQ.eulerRad(new Float3(rotation, y, z));
    const r = rotation.multiply(0.5);

    const num1 = Math.sin(r.x);
    const num2 = Math.sin(r.y);
    const num3 = Math.sin(r.z);
    const num4 = Math.cos(r.x);
    const num5 = Math.cos(r.y);
    const num6 = Math.cos(r.z);
    return new FloatQ(
      num5 * num1 * num6 + num2 * num4 * num3,
      num2 * num4 * num6 - num5 * num1 * num3,
      num5 * num4 * num3 - num2 * num1 * num6,
      num5 * num4 * num6 + num2 * num1 * num3,
    );
  }

  public static fromToRotation(from: FloatQ, to: FloatQ): FloatQ;
  public static fromToRotation(from: Float3, to: Float3): FloatQ;
  public static fromToRotation(from: FloatQ | Float3, to: FloatQ | Float3): FloatQ {
    if (from instanceof FloatQ && to instanceof FloatQ) return to.multiply(from.inverted);
    if (from instanceof Float3 && to instanceof Float3) {
      const num = MathX.dot(from, to);
      if (!from.equals(to)) {
        let a = Float3.Zero();
        if (!from.equals(a) && !to.equals(Float3.Zero())) {
          const float3_1 = MathX.cross(from, to);
          if (float3_1.sqrMagnitude > 9.99999993922529e-9 || num >= 0.0)
            return new FloatQ(
              float3_1.x,
              float3_1.y,
              float3_1.z,
              Math.sqrt(from.sqrMagnitude * to.sqrMagnitude) + num,
            ).normalized;
          a = new Float3(1);
          let float3_2 = MathX.cross(a, from);
          if (float3_2.sqrMagnitude <= 9.99999993922529e-9) {
            a = new Float3(0, 1);
            float3_2 = MathX.cross(a, from);
          }
          return FloatQ.axisAngleRad(float3_2.normalized, 3.14159274);
        }
      }
      return FloatQ.Identity();
    }
    throw new Error('Invalid Input');
  }

  public setComponent(value: number, index: number) {
    switch (index) {
      case 0:
        return new FloatQ(value, this.y, this.z, this.w);
      case 1:
        return new FloatQ(this.x, value, this.z, this.w);
      case 2:
        return new FloatQ(this.x, this.y, value, this.w);
      case 3:
        return new FloatQ(this.x, this.y, this.z, value);
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
  public setW(value: number) {
    return this.setComponent(value, 3);
  }

  public static equals(a: FloatQ, b: FloatQ) {
    return a.equals(b);
  }

  public equals(other: FloatQ) {
    return (
      this.x == other.x && this.y == other.y && this.z == other.z && this.w == other.w
    );
  }

  public get three() {
    return [this.x, this.y, this.z, this.w] as const;
  }

  public multiply(other: Float3): Float3;
  public multiply(other: FloatQ): FloatQ;
  public multiply(other: number): FloatQ;
  public multiply(x: number, y: number, z: number, w: number): FloatQ;
  public multiply(
    x: number | FloatQ | Float3,
    y?: number,
    z?: number,
    w?: number,
  ): FloatQ | Float3 {
    if (x instanceof Float3) {
      const num1 = this.x + this.x;
      const num2 = this.y + this.y;
      const num3 = this.z + this.z;
      const num4 = this.w * num1;
      const num5 = this.w * num2;
      const num6 = this.w * num3;
      const num7 = this.x * num1;
      const num8 = this.x * num2;
      const num9 = this.x * num3;
      const num10 = this.y * num2;
      const num11 = this.y * num3;
      const num12 = this.z * num3;
      const num13 = 1 - num10 - num12;
      const num14 = num8 - num6;
      const num15 = num9 + num5;
      const num16 = num8 + num6;
      const num17 = 1 - num7 - num12;
      const num18 = num11 - num4;
      const num19 = num9 - num5;
      const num20 = num11 + num4;
      const num21 = 1 - num7 - num10;
      return new Float3(
        x.x * num13 + x.y * num14 + x.z * num15,
        x.x * num16 + x.y * num17 + x.z * num18,
        x.x * num19 + x.y * num20 + x.z * num21,
      );
    }
    if (x instanceof FloatQ) return this.multiply(x.x, x.y, x.z, x.w);
    if (y == null || z == null || w == null) return this.multiply(x, x, x, x);
    return new FloatQ(this.x * x, this.y * y, this.z * z, this.w * w);
  }

  public divide(other: FloatQ): FloatQ;
  public divide(other: number): FloatQ;
  public divide(x: number, y: number, z: number, w: number): FloatQ;
  public divide(x: number | FloatQ, y?: number, z?: number, w?: number): FloatQ {
    if (x instanceof FloatQ) return this.divide(x.x, x.y, x.z, x.w);
    if (y == null || z == null || w == null) return this.divide(x, x, x, x);
    return new FloatQ(this.x / x, this.y / y, this.z / z, this.w / w);
  }

  public add(other: FloatQ): FloatQ;
  public add(other: number): FloatQ;
  public add(x: number, y: number, z: number, w: number): FloatQ;
  public add(x: number | FloatQ, y?: number, z?: number, w?: number): FloatQ {
    if (x instanceof FloatQ) return this.add(x.x, x.y, x.z, x.w);
    if (y == null || z == null || w == null) return this.add(x, x, x, x);
    return new FloatQ(this.x + x, this.y + y, this.z + z, this.w + w);
  }

  public subtract(other: FloatQ): FloatQ;
  public subtract(other: number): FloatQ;
  public subtract(x: number, y: number, z: number, w: number): FloatQ;
  public subtract(x: number | FloatQ, y?: number, z?: number, w?: number): FloatQ {
    if (x instanceof FloatQ) return this.subtract(x.x, x.y, x.z, x.w);
    if (y == null || z == null || w == null) return this.subtract(x, x, x, x);
    return new FloatQ(this.x - x, this.y - y, this.z - z, this.w - w);
  }
}
