<div align="center">

# CPU Scheduling, Visualized.

**A tool for understanding how operating systems decide what runs next.**

[![React](https://img.shields.io/badge/React-19-0B0B0F?style=flat-square&labelColor=0B0B0F&color=A3E635)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-0B0B0F?style=flat-square&labelColor=0B0B0F&color=A3E635)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-0B0B0F?style=flat-square&labelColor=0B0B0F&color=A3E635)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-0B0B0F?style=flat-square&labelColor=0B0B0F&color=A3E635)](#license)

</div>

---

## What is this?

An interactive simulator that takes any list of processes you throw at it, runs them through a CPU scheduling algorithm, and shows you exactly what the CPU does — block by block, tick by tick.

Type in arrival times and burst times. Pick **FCFS** or **SJF**. Hit run. Get a colour-coded Gantt chart and every metric your OS textbook ever asked you to compute, in well under a second.

No backend. No database. No login. Just open it and play with it.

```
P1 ──── arrives 0, burst 5 ────────────┐
P2 ──── arrives 1, burst 3 ──────────┐ │
P3 ──── arrives 2, burst 8 ────────┐ │ │
                                   │ │ │
                                   ▼ ▼ ▼
                            ┌─────────────┐
                            │  Scheduler  │
                            └──────┬──────┘
                                   ▼
              P1 ──── P2 ──── P3 ──── done.
              0      5      8        16
```

---

## Why?

Because every CS student computes Gantt charts on paper, second-guesses themselves, scribbles, erases, and asks the next person whether they got the same answer. This is the next person.

But it's also an excuse to build something. The algorithms are five hundred lines of TypeScript. The interesting part was making the result *feel* good — JetBrains Mono numbers, a single lime accent, hairline borders, scale-in animations that ease just right. The kind of details you can't put on a résumé bullet but that are the actual reason you remember a project.

---

## Features

| | |
|---|---|
| **FCFS** | First Come First Served. Run processes in the order they arrived. Simple, deterministic, occasionally cruel to short jobs. |
| **SJF** | Shortest Job First (non-preemptive). Pick the shortest available job at every decision point. Provably optimal for average wait time. |
| **Compare mode** | Run both algorithms on the same workload and see who wins on Avg WT, Avg TAT, and Avg RT — with a tiny ▲ marking the winner. |
| **Animated Gantt chart** | Blocks reveal left-to-right with an ease-out-expo curve. Hover any block for its start, end, and duration. |
| **Per-process metrics** | Completion, Turnaround, Waiting, and Response time for every process, plus averages. All in JetBrains Mono because numbers deserve a good font. |
| **Editable process table** | Add, remove, reorder, or load a sample workload with one click. |

---

## Stack

- **React 19** + **TypeScript** — strict mode, no `any`
- **Vite** — because waiting four seconds for a hot reload is a crime
- **TailwindCSS v3** — utility-first, no inline `style` props anywhere
- **Framer Motion** — every animation is deliberate, none are bouncy
- **JetBrains Mono** + **Inter** — the only two fonts, and they earn it

No state management library. No router beyond `react-router-dom`. No UI kit. Two hundred lines of `useState` and `useMemo` carry the whole thing.

---

## Run it locally

```bash
git clone https://github.com/meisamith/cpu-scheduler.git
cd cpu-scheduler
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're in.

To build for production:

```bash
npm run build
npm run preview
```

---

## How the algorithms work

### FCFS

```ts
sort processes by arrival time
for each process:
  if currentTime < arrival:
    insert IDLE segment until arrival
  run process to completion
  advance currentTime by burst
```

That's it. The convoy effect — short jobs queued behind one long job — is FCFS's signature weakness, and it falls right out of these four lines.

### SJF (non-preemptive)

```ts
while processes remain:
  ready = { p : p.arrival <= currentTime, not yet completed }
  if ready is empty:
    advance currentTime to next arrival, insert IDLE
    continue
  pick the process in ready with the smallest burst time
  run it to completion
  advance currentTime
```

Minimises average waiting time. Risks starvation of long jobs in workloads where short ones keep arriving — but on any finite workload, it's optimal.

---

## Design choices worth defending

A few decisions that look small but shape the whole feel of the app:

- **One accent colour.** Lime (`#A3E635`) is the only "loud" colour in the app. Everything else is shades of off-white and charcoal. The accent earns attention because nothing else competes for it.
- **JetBrains Mono for every number.** Process IDs, durations, times, metrics — all monospaced. Mono numbers in a UI are an opinion: they say *this is data, treat it as data*.
- **Hairline borders, no shadows.** Depth comes from `rgba(255,255,255,0.06)` borders and the contrast against the near-black background. Drop shadows on cards make everything look like a 2014 Bootstrap site.
- **Scale-in stagger, ease-out-expo.** Gantt blocks don't fade — they reveal left to right with `transform-origin: left` and `cubic-bezier(0.22, 1, 0.36, 1)`. That curve is the difference between "the AI added animations" and "someone actually picked this".
- **No icons inside buttons.** Text buttons read faster and look more intentional. The pill border + text invert on hover is the entire interaction language.

---

## Project structure

```
src/
├── components/
│   ├── ui/              Reusable primitives (Button, Card, Input)
│   └── simulator/       Gantt, ResultsTable, ProcessInput, AlgorithmSelector
├── engine/
│   ├── types.ts         Process, Schedule, Segment
│   ├── algorithms/
│   │   ├── fcfs.ts
│   │   └── sjf.ts
│   └── metrics.ts       TAT, WT, RT calculations + averages
├── pages/
│   ├── Home.tsx
│   └── Simulator.tsx
└── lib/utils.ts
```

Every algorithm is a pure function: `(Process[]) => Schedule`. The UI doesn't know how scheduling works; the algorithms don't know there's a UI. Adding a new algorithm is one file plus one line in the registry.

---

## What's next

- **Preemptive variants** — SRTF (preemptive SJF) and Preemptive Priority
- **Multi-level queues** — closer to what real operating systems actually use
- **CPU utilisation graph** — visualise idle time as a separate metric
- **Workload library** — save/load process sets, share via URL
- **Step-through mode** — advance one tick at a time, with a visible ready queue

---

## License

MIT. Use it, fork it, learn from it, submit it as your own at your own peril.

---

<div align="center">

**built by [Amith Choudhary](https://github.com/meisamith) · 2026**

*JSS Science and Technology University, Mysore · CSBS '28*

</div>
