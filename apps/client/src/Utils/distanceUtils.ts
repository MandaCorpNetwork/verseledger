export function calcDistance(
  prevLocation: { x: number; y: number; z: number },
  currentLocation: { x: number; y: number; z: number },
): string {
  const dx = currentLocation.x - prevLocation.x;
  const dy = currentLocation.y - prevLocation.y;
  const dz = currentLocation.z - prevLocation.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz).toFixed(2);
}
