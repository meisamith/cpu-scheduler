import { motion } from "framer-motion";
import { fcfs } from "../algorithms/fcfs";
import { sjf } from "../algorithms/sjf";
import { getProcessColor } from "../lib/utils";
import type { Process, ScheduleEntry } from "../types";

interface Props {
  processes: Process[];
}

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

function MiniGantt({ schedule }: { schedule: ScheduleEntry[] }) {
  if (schedule.length === 0) return null;
  const totalTime = schedule[schedule.length - 1].end;

  return (
    <div className="overflow-x-auto">
      <div className="flex h-8" style={{ minWidth: "100%" }}>
        {schedule.map((entry, i) => {
          const widthPct = ((entry.end - entry.start) / totalTime) * 100;
          const isIdle = entry.pid === "IDLE";
          const color = isIdle ? "#4B5563" : getProcessColor(entry.pid);

          return (
            <div
              key={i}
              className="relative flex-shrink-0"
              style={{ width: `${widthPct}%`, padding: "0 1px" }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: EASE_OUT_EXPO }}
                className="h-full rounded-sm flex items-center justify-center"
                style={{
                  transformOrigin: "left",
                  backgroundColor: isIdle ? "rgba(75,85,99,0.1)" : `${color}20`,
                  borderTop: `1px solid ${isIdle ? "rgba(75,85,99,0.3)" : `${color}BB`}`,
                  borderLeft: "1px solid rgba(255,255,255,0.03)",
                  borderRight: "1px solid rgba(255,255,255,0.03)",
                  borderBottom: "none",
                }}
              >
                <span
                  className="font-mono text-[9px] truncate px-0.5"
                  style={{ color: isIdle ? "#6B7280" : color }}
                >
                  {entry.pid}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mini time axis */}
      <div className="relative mt-1" style={{ height: 16 }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
        {schedule.map((entry, i) => {
          const leftPct = (entry.start / totalTime) * 100;
          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{ left: `${leftPct}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-px h-1.5 bg-white/15" />
              <span className="font-mono text-[8px] text-gray-700">{entry.start}</span>
            </div>
          );
        })}
        <div
          className="absolute flex flex-col items-center"
          style={{ left: "100%", transform: "translateX(-50%)" }}
        >
          <div className="w-px h-1.5 bg-white/15" />
          <span className="font-mono text-[8px] text-gray-700">{totalTime}</span>
        </div>
      </div>
    </div>
  );
}

export function ComparisonView({ processes }: Props) {
  if (processes.length === 0) return null;

  const fcfsResult = fcfs(processes);
  const sjfResult = sjf(processes);

  const metrics = [
    { label: "Avg WT", fcfsVal: fcfsResult.avgWaitingTime, sjfVal: sjfResult.avgWaitingTime },
    { label: "Avg TAT", fcfsVal: fcfsResult.avgTurnaroundTime, sjfVal: sjfResult.avgTurnaroundTime },
    { label: "Avg RT", fcfsVal: fcfsResult.avgResponseTime, sjfVal: sjfResult.avgResponseTime },
  ];

  const cols = [
    { label: "FCFS", result: fcfsResult },
    { label: "SJF", result: sjfResult },
  ];

  return (
    <div className="space-y-4">
      <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">FCFS vs SJF</span>

      <div className="grid grid-cols-2 gap-6">
        {cols.map((col, colIdx) => (
          <div key={col.label} className="space-y-4">
            <p className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {col.label}
            </p>

            {/* Mini Gantt */}
            <MiniGantt schedule={col.result.schedule} />

            {/* Stats */}
            <div className="space-y-4 pt-1">
              {metrics.map((m) => {
                const myVal = colIdx === 0 ? m.fcfsVal : m.sjfVal;
                const otherVal = colIdx === 0 ? m.sjfVal : m.fcfsVal;
                const isWinner = myVal < otherVal;
                const isTied = myVal === otherVal;

                return (
                  <div key={m.label}>
                    <p className="text-[10px] uppercase tracking-widest text-gray-700 mb-0.5">
                      {m.label}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-2xl font-semibold text-gray-100">
                        {myVal.toFixed(2)}
                      </span>
                      {isWinner && !isTied && (
                        <span className="font-mono text-xs" style={{ color: "#A3E635" }}>
                          ▲
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
