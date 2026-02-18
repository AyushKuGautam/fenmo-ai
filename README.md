# Personal Finance Tracker - Technical Assessment

A production-ready Full-Stack Expense Tracker built with Next.js 15.

## 🚀 Live Demo
https://fenmo-ai.vercel.app

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Persistence**: In-memory Store (Simulated Database)

## 🧠 Key Design Decisions
1. **Money Handling**: Amounts are stored and processed as **integers (cents)**. [cite_start]This prevents floating-point binary precision errors common in JavaScript (e.g., 0.1 + 0.2 != 0.3)[cite: 33].
2. **Idempotency & Reliability**: To handle "unreliable networks" and "multiple clicks," the backend implements a 10-second window check. [cite_start]If an identical expense is submitted within 10 seconds, it is flagged as a duplicate[cite: 24, 25, 52].
3. **Architecture**: I used a "Service Layer" pattern (`lib/store.ts`). [cite_start]While currently in-memory, this logic is decoupled from the API routes, allowing for an easy swap to a real DB like PostgreSQL/Prisma in the future[cite: 16, 38].

## ⚖️ Trade-offs & Timebox Decisions
- [cite_start]**Persistence**: Used an in-memory array instead of a live Database to prioritize UI polish and error handling within the 4-hour limit[cite: 38, 68].
- [cite_start]**Testing**: Prioritized manual end-to-end verification and robust type-safety over writing unit tests to ensure a working "Live Application"[cite: 69].

## 🏃 How to Run Locally
1. `npm install`
2. `npm run dev`