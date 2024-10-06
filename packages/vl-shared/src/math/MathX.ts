import { Float3 } from './Float3';
import { FloatQ } from './FloatQ';

export class MathX {
  public static abs(value: Float3): Float3;
  public static abs(value: FloatQ): FloatQ;
  public static abs(value: number): number;
  public static abs(value: Float3 | FloatQ | number) {
    if (value instanceof Float3)
      return new Float3(Math.abs(value.x), Math.abs(value.y), Math.abs(value.z));
    if (value instanceof FloatQ)
      return new FloatQ(
        Math.abs(value.x),
        Math.abs(value.y),
        Math.abs(value.z),
        Math.abs(value.w),
      );
    return Math.abs(value);
  }

  public static clamp(val: number, min: number, max: number) {
    if (val < min) return min;
    return val > max ? max : val;
  }

  public static cross(a: Float3, b: Float3) {
    return new Float3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x,
    );
  }

  public static dot(a: Float3, b: Float3) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
}
