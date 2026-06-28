import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ALGO_CARDS = [
  {
    index: "01",
    name: "FCFS",
    full: "First Come First Served",
    desc: "Processes execute in the exact order they arrive. Simple, deterministic, zero scheduling overhead.",
  },
  {
    index: "02",
    name: "SJF",
    full: "Shortest Job First",
    desc: "Selects the shortest available job at each decision point. Provably optimal for average waiting time.",
  },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Top-left radial glow */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle at 0% 0%, rgba(163,230,53,0.07) 0%, transparent 70%)",
        }}
      />

      <main className="flex-1 flex flex-col justify-center px-8 py-20 max-w-5xl mx-auto w-full">
        {/* Heading block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
        >
          <h1 className="text-5xl font-extrabold text-gray-50 leading-tight">
            CPU Scheduling,{" "}
            <span className="relative inline-block">
              <span style={{ color: "#A3E635" }}>Visualized</span>
              <motion.svg
                className="absolute left-0 w-full pointer-events-none overflow-visible"
                style={{ bottom: -4, height: 3 }}
                viewBox="0 0 100 3"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 0 1.5 L 100 1.5"
                  stroke="#A3E635"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                />
              </motion.svg>
            </span>
            <span
              className="animate-blink ml-2 inline-block align-middle"
              style={{ color: "#A3E635", fontSize: "0.85em" }}
            >
              ▎
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xs uppercase tracking-widest text-gray-600 mb-10"
        >
          A tool for understanding how operating systems decide what runs next.
        </motion.p>

        {/* Launch button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mb-16"
        >
          <button
            onClick={() => navigate("/simulator")}
            className="px-8 py-3 rounded-full border border-accent text-accent text-sm font-medium bg-transparent hover:bg-accent hover:text-[#0B0B0F] transition-all duration-200"
          >
            Launch Simulator
          </button>
        </motion.div>

        {/* Algorithm cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALGO_CARDS.map((algo, i) => (
            <motion.div
              key={algo.index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.1, duration: 0.4, ease: "easeOut" }}
              className="relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-default
                         transition-all duration-200 hover:border-accent/40 hover:-translate-y-0.5"
            >
              <span className="font-mono text-xs text-accent mb-4 block">{algo.index}</span>
              <p className="text-xl font-bold text-gray-50 mb-1">{algo.name}</p>
              <p className="text-xs text-gray-600 mb-2">{algo.full}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{algo.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-5 px-8 text-xs text-gray-700 max-w-5xl mx-auto w-full">
        built by Amith Choudhary{" "}
        <span style={{ color: "#A3E635" }}>·</span>
        {" "}2026
      </footer>
    </div>
  );
}
