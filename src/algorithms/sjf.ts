import type { Process, ScheduleEntry, SimulationResult, ProcessResult } from "../types";

export function sjf(processes: Process[]): SimulationResult {
  const remaining = processes.map((p) => ({ ...p }));
  const schedule: ScheduleEntry[] = [];
  const firstResponseTime: Record<string, number> = {};
  const completionMap: Record<string, number> = {};

  let currentTime = 0;
  const done = new Set<string>();

  while (done.size < processes.length) {
    const ready = remaining.filter(
      (p) => p.arrivalTime <= currentTime && !done.has(p.pid)
    );

    if (ready.length === 0) {
      const nextArrival = remaining
        .filter((p) => !done.has(p.pid))
        .reduce((min, p) => (p.arrivalTime < min ? p.arrivalTime : min), Infinity);
      schedule.push({ pid: "IDLE", start: currentTime, end: nextArrival });
      currentTime = nextArrival;
      continue;
    }

    ready.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime || a.pid.localeCompare(b.pid));
    const chosen = ready[0];

    firstResponseTime[chosen.pid] = currentTime;
    const start = currentTime;
    const end = currentTime + chosen.burstTime;

    schedule.push({ pid: chosen.pid, start, end });
    currentTime = end;
    completionMap[chosen.pid] = end;
    done.add(chosen.pid);
  }

  const results: ProcessResult[] = processes.map((proc) => {
    const completionTime = completionMap[proc.pid];
    const turnaroundTime = completionTime - proc.arrivalTime;
    const waitingTime = turnaroundTime - proc.burstTime;
    const responseTime = firstResponseTime[proc.pid] - proc.arrivalTime;
    return { pid: proc.pid, arrivalTime: proc.arrivalTime, burstTime: proc.burstTime, completionTime, turnaroundTime, waitingTime, responseTime };
  });

  const avgWaitingTime = results.reduce((s, r) => s + r.waitingTime, 0) / results.length;
  const avgTurnaroundTime = results.reduce((s, r) => s + r.turnaroundTime, 0) / results.length;
  const avgResponseTime = results.reduce((s, r) => s + r.responseTime, 0) / results.length;

  return { schedule, results, avgWaitingTime, avgTurnaroundTime, avgResponseTime };
}
