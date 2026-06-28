import { Plus, Shuffle } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import type { Process } from "../types";

const SAMPLE_PROCESSES: Process[] = [
  { pid: "P1", arrivalTime: 0, burstTime: 6, priority: 3 },
  { pid: "P2", arrivalTime: 2, burstTime: 4, priority: 1 },
  { pid: "P3", arrivalTime: 4, burstTime: 2, priority: 4 },
  { pid: "P4", arrivalTime: 6, burstTime: 8, priority: 2 },
  { pid: "P5", arrivalTime: 8, burstTime: 3, priority: 5 },
];

interface Props {
  processes: Process[];
  onChange: (processes: Process[]) => void;
  showPriority?: boolean;
}

export function InputTable({ processes, onChange, showPriority = false }: Props) {
  const addProcess = () => {
    const nextNum = processes.length + 1;
    onChange([...processes, { pid: `P${nextNum}`, arrivalTime: 0, burstTime: 1, priority: 1 }]);
  };

  const removeProcess = (index: number) => {
    onChange(processes.filter((_, i) => i !== index));
  };

  const update = (index: number, field: keyof Process, raw: string) => {
    const value = field === "pid" ? raw : parseInt(raw, 10);
    if (field !== "pid" && (isNaN(value as number) || (value as number) < 0)) return;
    const updated = [...processes];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">Processes</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onChange(SAMPLE_PROCESSES)}>
            <Shuffle size={12} /> Load Sample
          </Button>
          <Button size="sm" onClick={addProcess}>
            <Plus size={12} /> Add
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-white/[0.06]">
              <th className="pb-2 pr-3 w-8 text-[11px] text-gray-600 uppercase tracking-widest font-medium">#</th>
              <th className="pb-2 pr-3 text-[11px] text-gray-600 uppercase tracking-widest font-medium">PID</th>
              <th className="pb-2 pr-3 text-[11px] text-gray-600 uppercase tracking-widest font-medium">Arrival</th>
              <th className="pb-2 pr-3 text-[11px] text-gray-600 uppercase tracking-widest font-medium">Burst</th>
              {showPriority && (
                <th className="pb-2 pr-3 text-[11px] text-gray-600 uppercase tracking-widest font-medium">Priority</th>
              )}
              <th className="pb-2 w-6" />
            </tr>
          </thead>
          <tbody>
            {processes.map((proc, i) => (
              <tr
                key={i}
                className="border-b border-white/[0.04] hover:bg-white/[0.015] group transition-colors"
                style={{ height: 40 }}
              >
                <td className="py-1.5 pr-3">
                  <span className="font-mono text-xs text-gray-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </td>
                <td className="py-1.5 pr-3 w-20">
                  <Input value={proc.pid} onChange={(e) => update(i, "pid", e.target.value)} />
                </td>
                <td className="py-1.5 pr-3 w-28">
                  <Input
                    type="number"
                    min={0}
                    value={proc.arrivalTime}
                    onChange={(e) => update(i, "arrivalTime", e.target.value)}
                  />
                </td>
                <td className="py-1.5 pr-3 w-28">
                  <Input
                    type="number"
                    min={1}
                    value={proc.burstTime}
                    onChange={(e) => update(i, "burstTime", e.target.value)}
                  />
                </td>
                {showPriority && (
                  <td className="py-1.5 pr-3 w-24">
                    <Input
                      type="number"
                      min={1}
                      value={proc.priority}
                      onChange={(e) => update(i, "priority", e.target.value)}
                    />
                  </td>
                )}
                <td className="py-1.5">
                  <button
                    onClick={() => removeProcess(i)}
                    disabled={processes.length <= 1}
                    className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-gray-400
                               text-lg leading-none transition-all duration-150
                               disabled:cursor-not-allowed disabled:opacity-0"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {processes.length === 0 && (
        <p className="text-center text-gray-700 text-sm py-4">No processes. Add one above.</p>
      )}
    </div>
  );
}
