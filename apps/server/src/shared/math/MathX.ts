import { Float2 } from "./Float2";
import { Float3 } from "./Float3";
import { FloatQ } from "./FloatQ";

export class MathX {
  public static abs(value: Float3): Float3;
  public static abs(value: FloatQ): FloatQ;
  public static abs(value: number): number;
  public static abs(value: Float3 | FloatQ | number) {
    if (value instanceof Float3)
      return new Float3(
        Math.abs(value.x),
        Math.abs(value.y),
        Math.abs(value.z),
      );
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

  public static reflectRotation(rotation: FloatQ, planeNormal: Float3) {
    let float3_1 = rotation.multiply(Float3.Forward());
    let float3_2 = rotation.multiply(Float3.Up());
    float3_1 = MathX.reflectVector(float3_1, planeNormal);
    float3_2 = MathX.reflectVector(float3_2, planeNormal);
    return FloatQ.lookRotation(float3_1, float3_2);
  }

  public static reflectVector(vector: Float3, planeNormal: Float3) {
    const float3 = MathX.project(vector, planeNormal);
    return MathX.reject(vector, planeNormal).subtract(float3);
  }

  public static reject(a: Float3, b: Float3) {
    return a.subtract(MathX.project(a, b));
  }

  public static project(a: Float3, b: Float3) {
    const b1 = b.normalized;
    return b1.multiply(MathX.dot(a, b1));
  }

  public static angleAroundAxis(
    rotation: FloatQ,
    axis: Float3,
    comparisonAxis?: Float3,
  ) {
    let ortho0: Float3, ortho1: Float3;
    if (comparisonAxis != null) {
      ortho0 = comparisonAxis;
    } else {
      const { ortho0: a, ortho1: b } = MathX.orthonormals(axis);
      ortho0 = a;
      ortho1 = b;
    }
    let float3 = rotation.multiply(ortho0);
    const local1 = axis;
    ortho1 = Float3.Up();
    const local2 = ortho1;
    const rotation1 = FloatQ.fromToRotation(local1, local2);
    float3 = rotation1.multiply(float3);
    ortho0 = rotation1.multiply(ortho0);
    const float3_xz = new Float2(float3.x, float3.z);
    const to = MathX.atan2(float3_xz) * 57.29578;
    const ortho0_xz = new Float2(ortho0.x, ortho0.z);
    return MathX.deltaAngle(MathX.atan2(ortho0_xz) * 57.29578, to);
  }

  public static orthonormals(normal: Float3) {
    const normalized = normal.normalized;
    let b = FloatQ.axisAngle(Float3.Right(), 90).multiply(normalized);
    if (MathX.dot(normal, b) > 0.60000002384185791)
      b = FloatQ.axisAngle(Float3.Up(), 90).multiply(normalized);
    const ortho0 = MathX.cross(normal, b);
    const ortho1 = MathX.cross(normal, ortho0);
    return { ortho0, ortho1 };
  }

  public static orthonormalize(normal: Float3, tangent: Float3) {
    normal = !normal.equals(Float3.Zero()) ? normal.normalized : Float3.Right();
    let a = MathX.cross(normal, tangent);
    let float3: Float3;
    if (a.equals(Float3.Zero())) {
      const local1 = normal;
      float3 = new Float3(normal.z, -normal.x, normal.y);
      const local2 = float3;
      a = MathX.cross(local1, local2);
    }
    float3 = MathX.cross(a, normal);
    const normalized = float3.normalized;
    return normalized;
  }

  public static atan2(v: Float2): number {
    return Math.atan2(v.y, v.x);
  }

  public static deltaAngle(from: number, to = 0) {
    let num = (to - from) % 360;
    if (num > 180) num -= 360;
    if (num < -180) num += 360;
    return num;
  }

  public static bezierCurve(
    from: FloatQ,
    to: FloatQ,
    fromTangent: FloatQ,
    toTangent: FloatQ,
    t: number,
  ) {
    const num1 = 1 - t;
    const num2 = t * t;
    const num3 = num1 * num1;
    const num4 = num2 * t;

    return from
      .multiply(num3 * num1)
      .add(fromTangent.multiply(3 * num3 * t))
      .add(toTangent.multiply(3 * num1 * num2))
      .add(to.multiply(num4)).normalized;
  }

  public static distanceSqr(a: Float3, b: Float3) {
    return (
      (a.x - b.x) * (a.x - b.x) +
      (a.y - b.y) * (a.y - b.y) +
      (a.z - b.z) * (a.z - b.z)
    );
  }

  public static distance(a: Float3, b: Float3) {
    return Math.sqrt(MathX.distanceSqr(a, b));
  }
}
