import { motion } from "framer-motion";
import type { SimulationResult } from "../types";
import { getProcessColor } from "../lib/utils";

interface Props {
  result: SimulationResult;
}

const fmt = (n: number) => n.toFixed(2);

const HEADERS = ["#", "PID", "Arrival", "Burst", "Completion", "Turnaround", "Waiting", "Response"];

export function ResultsTable({ result }: Props) {
  const { results, avgWaitingTime, avgTurnaroundTime } = result;

  return (
    <div className="space-y-3">
      <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">Metrics</span>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-white/[0.06]">
              {HEADERS.map((h) => (
                <th key={h} className="pb-2 pr-4 text-[11px] text-gray-600 uppercase tracking-widest font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <motion.tr
                key={r.pid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors"
                style={{ height: 32 }}
              >
                <td className="py-1.5 pr-4 font-mono text-xs text-gray-700">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="py-1.5 pr-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getProcessColor(r.pid) }}
                    />
                    <span className="font-mono text-sm text-gray-100">{r.pid}</span>
                  </div>
                </td>
                <td className="py-1.5 pr-4 font-mono text-sm text-gray-400">{r.arrivalTime}</td>
                <td className="py-1.5 pr-4 font-mono text-sm text-gray-400">{r.burstTime}</td>
                <td className="py-1.5 pr-4 font-mono text-sm text-gray-200">{r.completionTime}</td>
                <td className="py-1.5 pr-4 font-mono text-sm text-gray-100">{r.turnaroundTime}</td>
                <td className="py-1.5 pr-4 font-mono text-sm text-gray-100">{r.waitingTime}</td>
                <td className="py-1.5 pr-4 font-mono text-sm text-gray-100">{r.responseTime}</td>
              </motion.tr>
            ))}

            {/* Average row */}
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: results.length * 0.06 + 0.1 }}
              style={{ height: 32, borderTop: "1px solid #A3E635" }}
            >
              <td
                className="py-1.5 pr-4 text-[11px] uppercase tracking-widest font-medium"
                style={{ color: "#A3E635" }}
                colSpan={4}
              >
                Average
              </td>
              <td className="py-1.5 pr-4" />
              <td className="py-1.5 pr-4 font-mono text-sm" style={{ color: "#A3E635" }}>
                {fmt(avgTurnaroundTime)}
              </td>
              <td className="py-1.5 pr-4 font-mono text-sm" style={{ color: "#A3E635" }}>
                {fmt(avgWaitingTime)}
              </td>
              <td className="py-1.5 pr-4 text-gray-700 font-mono text-sm">—</td>
            </motion.tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
