import type { AlgorithmType } from "../types";

interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  description: string;
}

const ALGORITHMS: AlgorithmInfo[] = [
  { id: "fcfs", name: "FCFS", description: "First Come First Served — execute in arrival order, simple and deterministic." },
  { id: "sjf", name: "SJF", description: "Shortest Job First — minimize average waiting time by running shortest jobs first." },
];

interface Props {
  selected: AlgorithmType;
  onSelect: (algo: AlgorithmType) => void;
}

export function AlgorithmSelector({ selected, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">Algorithm</span>
      <div className="grid grid-cols-2 gap-3">
        {ALGORITHMS.map((algo) => {
          const isSelected = selected === algo.id;
          return (
            <button
              key={algo.id}
              onClick={() => onSelect(algo.id)}
              className={`relative p-5 rounded-xl text-left transition-all duration-200 border ${
                isSelected
                  ? "border-accent bg-transparent"
                  : "border-white/[0.06] bg-transparent hover:border-white/20"
              }`}
            >
              {isSelected && (
                <span
                  className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent"
                />
              )}
              <p className="text-lg font-bold text-gray-50 mb-1">{algo.name}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{algo.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
