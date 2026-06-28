# CPU Scheduling Visualizer

An interactive FCFS vs SJF scheduling visualizer built as a university OS mini-project. Visualize how operating systems schedule processes using First Come First Served and Shortest Job First algorithms with animated Gantt charts.

## Features

- **Process Input Table** — Add, remove, and edit processes with arrival time and burst time
- **2 Scheduling Algorithms** — FCFS and SJF (non-preemptive), side-by-side comparable
- **Animated Gantt Chart** — Color-coded process blocks that reveal left-to-right with ease-out-expo stagger
- **Metrics Table** — Per-process completion time, turnaround time, waiting time, and response time with averages
- **Algorithm Comparison** — Side-by-side mini Gantt charts with Avg WT / Avg TAT / Avg RT, winner highlighted

## Install & Run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Algorithms

### FCFS — First Come First Served
Processes execute in strict arrival order. Simple and deterministic, but suffers from the "convoy effect" where short jobs wait behind long ones.

### SJF — Shortest Job First (Non-Preemptive)
At each scheduling point, the ready process with the shortest burst time is selected. Provably minimizes average waiting time among non-preemptive algorithms, but requires knowing burst times in advance.

## Tech Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** for bundling
- **Tailwind CSS v3** with custom dark theme
- **Framer Motion** for animations (path draw, stagger scaleX, fade)
- **JetBrains Mono** for all numeric/code values
- **react-router-dom** for routing

## Author

**Amith Choudhary · 2026**
