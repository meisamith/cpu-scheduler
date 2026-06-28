import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/Card";
import { InputTable } from "../components/InputTable";
import { AlgorithmSelector } from "../components/AlgorithmSelector";
import { GanttChart } from "../components/GanttChart";
import { ResultsTable } from "../components/ResultsTable";
import { ComparisonView } from "../components/ComparisonView";
import { fcfs } from "../algorithms/fcfs";
import { sjf } from "../algorithms/sjf";
import type { Process, AlgorithmType, SimulationResult } from "../types";

const DEFAULT_PROCESSES: Process[] = [
  { pid: "P1", arrivalTime: 0, burstTime: 5, priority: 1 },
  { pid: "P2", arrivalTime: 1, burstTime: 3, priority: 2 },
  { pid: "P3", arrivalTime: 2, burstTime: 8, priority: 3 },
];

function runAlgorithm(algo: AlgorithmType, processes: Process[]): SimulationResult {
  switch (algo) {
    case "fcfs": return fcfs(processes);
    case "sjf": return sjf(processes);
  }
}

const section = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

export function Simulator() {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState<Process[]>(DEFAULT_PROCESSES);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("fcfs");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [ganttKey, setGanttKey] = useState(0);

  const handleRun = () => {
    if (processes.length === 0) return;
    const r = runAlgorithm(algorithm, processes);
    setResult(r);
    setHasRun(true);
    setShowComparison(false);
    setGanttKey((k) => k + 1);
  };

  const algoLabel: Record<AlgorithmType, string> = { fcfs: "FCFS", sjf: "SJF" };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Top-left radial glow */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle at 0% 0%, rgba(163,230,53,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full space-y-6 relative">
        {/* Header */}
        <motion.div
          variants={section}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: "easeOut", delay: 0 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-wide"
          >
            ← Home
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-100">CPU Scheduler Simulator</h1>
            <p className="text-xs text-gray-700 uppercase tracking-widest mt-0.5">
              Configure · Select · Run
            </p>
          </div>
        </motion.div>

        {/* Algorithm selector */}
        <motion.div
          variants={section}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.06 }}
        >
          <Card>
            <AlgorithmSelector
              selected={algorithm}
              onSelect={(a) => { setAlgorithm(a); setResult(null); }}
            />
          </Card>
        </motion.div>

        {/* Process input */}
        <motion.div
          variants={section}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.12 }}
        >
          <Card>
            <InputTable processes={processes} onChange={setProcesses} />
          </Card>
        </motion.div>

        {/* Run button */}
        <motion.div
          variants={section}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.18 }}
          className="flex justify-center"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleRun}
            disabled={processes.length === 0}
            className="px-10 py-3 rounded-full border border-accent text-accent text-sm font-medium
                       bg-transparent hover:bg-accent hover:text-[#0B0B0F]
                       transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Run Simulation
          </motion.button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && hasRun && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Summary strip */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-700 uppercase tracking-widest">Results —</span>
                  <span className="font-mono text-xs text-accent">{algoLabel[algorithm]}</span>
                </div>
                <button
                  onClick={() => setShowComparison((v) => !v)}
                  className="text-xs text-gray-600 hover:text-gray-300 uppercase tracking-widest transition-colors"
                >
                  {showComparison ? "Hide" : "Compare"}
                </button>
              </div>

              {/* Gantt chart with fade-swap on algorithm change */}
              <Card>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ganttKey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GanttChart schedule={result.schedule} />
                  </motion.div>
                </AnimatePresence>
              </Card>

              <Card>
                <ResultsTable result={result} />
              </Card>

              <AnimatePresence>
                {showComparison && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <Card>
                      <ComparisonView processes={processes} />
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="py-5 px-6 text-xs text-gray-700 max-w-5xl mx-auto w-full">
        built by Amith Choudhary{" "}
        <span style={{ color: "#A3E635" }}>·</span>
        {" "}2026
      </footer>
    </div>
  );
}
