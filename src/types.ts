export interface Process {
  pid: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
}

export interface ScheduleEntry {
  pid: string; // "IDLE" for idle blocks
  start: number;
  end: number;
}

export interface ProcessResult {
  pid: string;
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  responseTime: number;
}

export interface SimulationResult {
  schedule: ScheduleEntry[];
  results: ProcessResult[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
}

export type AlgorithmType = "fcfs" | "sjf";
