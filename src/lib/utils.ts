// Ordered palette: P1 → P2 → P3 → P4 → P5 → P6 cycling
export const PROCESS_COLORS = [
  "#A3E635", // lime    (P1)
  "#FBBF24", // amber   (P2)
  "#F472B6", // pink    (P3)
  "#60A5FA", // sky     (P4)
  "#34D399", // emerald (P5)
  "#F87171", // rose    (P6)
];

export function getProcessColor(pid: string): string {
  const num = parseInt(pid.replace(/\D/g, ""), 10);
  return PROCESS_COLORS[(isNaN(num) ? 0 : num - 1) % PROCESS_COLORS.length];
}

export function generatePid(index: number): string {
  return `P${index + 1}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
