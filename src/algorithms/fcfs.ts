import type { Process, ScheduleEntry, SimulationResult, ProcessResult } from "../types";

export function fcfs(processes: Process[]): SimulationResult {
  const sorted = [...processes].sort(
    (a, b) => a.arrivalTime - b.arrivalTime || a.pid.localeCompare(b.pid)
  );

  const schedule: ScheduleEntry[] = [];
  const firstResponseTime: Record<string, number> = {};
  let currentTime = 0;

  for (const proc of sorted) {
    if (currentTime < proc.arrivalTime) {
      schedule.push({ pid: "IDLE", start: currentTime, end: proc.arrivalTime });
      currentTime = proc.arrivalTime;
    }
    firstResponseTime[proc.pid] = currentTime;
    schedule.push({ pid: proc.pid, start: currentTime, end: currentTime + proc.burstTime });
    currentTime += proc.burstTime;
  }

  const results: ProcessResult[] = sorted.map((proc) => {
    const entry = schedule.find((e) => e.pid === proc.pid)!;
    const completionTime = entry.end;
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
