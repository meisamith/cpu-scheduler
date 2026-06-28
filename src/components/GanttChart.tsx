import { useState } from "react";
import { motion } from "framer-motion";
import type { ScheduleEntry } from "../types";
import { getProcessColor } from "../lib/utils";

interface Props {
  schedule: ScheduleEntry[];
}

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export function GanttChart({ schedule }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (schedule.length === 0) return null;

  const totalTime = schedule[schedule.length - 1].end;
  const minWidth = Math.max(totalTime * 48, 400);

  return (
    <div className="space-y-1">
      <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">Gantt Chart</span>

      <div className="relative overflow-x-auto">
        {/* Block row */}
        <div className="flex h-16 relative" style={{ minWidth }}>
          {schedule.map((entry, i) => {
            const widthPct = ((entry.end - entry.start) / totalTime) * 100;
            const isIdle = entry.pid === "IDLE";
            const color = isIdle ? "#4B5563" : getProcessColor(entry.pid);
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={i}
                className="relative flex-shrink-0"
                style={{ width: `${widthPct}%`, padding: "0 1px" }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="h-full rounded-sm flex flex-col items-center justify-center relative"
                  style={{
                    transformOrigin: "left",
                    backgroundColor: isIdle
                      ? "rgba(75,85,99,0.08)"
                      : isHovered
                      ? `${color}40`
                      : `${color}1F`,
                    borderTop: `1px solid ${isHovered ? color : isIdle ? "rgba(75,85,99,0.4)" : `${color}CC`}`,
                    borderLeft: "1px solid rgba(255,255,255,0.03)",
                    borderRight: "1px solid rgba(255,255,255,0.03)",
                    borderBottom: "none",
                    transition: "background-color 0.15s, border-top-color 0.15s",
                  }}
                >
                  <span
                    className="font-mono text-xs font-medium truncate px-1"
                    style={{ color: isIdle ? "#6B7280" : color }}
                  >
                    {entry.pid}
                  </span>
                  {!isIdle && (
                    <span className="font-mono text-[9px] text-gray-700 leading-none">
                      {entry.end - entry.start}u
                    </span>
                  )}
                </motion.div>

                {/* Hover tooltip */}
                {isHovered && !isIdle && (
                  <div
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none
                               rounded-lg px-3 py-2 whitespace-nowrap"
                    style={{
                      background: "#111116",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div className="font-mono text-[10px] text-gray-400 space-x-2">
                      <span><span className="text-gray-700">start </span>{entry.start}</span>
                      <span><span className="text-gray-700">end </span>{entry.end}</span>
                      <span><span className="text-gray-700">dur </span>{entry.end - entry.start}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Time axis */}
        <div className="relative mt-1" style={{ minWidth, height: 24 }}>
          <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.08]" />
          {schedule.map((entry, i) => {
            const leftPct = (entry.start / totalTime) * 100;
            return (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${leftPct}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-px h-2 bg-white/20" />
                <span className="font-mono text-[9px] text-gray-700 mt-0.5">{entry.start}</span>
              </div>
            );
          })}
          <div
            className="absolute flex flex-col items-center"
            style={{ left: "100%", transform: "translateX(-50%)" }}
          >
            <div className="w-px h-2 bg-white/20" />
            <span className="font-mono text-[9px] text-gray-700 mt-0.5">{totalTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
