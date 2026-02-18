# Fenmo AI - Technical Assessment

A production-ready Full-Stack Expense Tracker built with **Next.js 15**. This project prioritizes data integrity and system behavior under "realistic conditions."

## 🚀 Live Demo
[https://fenmo-ai.vercel.app]

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Testing**: Vitest (Unit Testing)
- **Persistence**: In-memory Singleton + LocalStorage Hydration
- **Styling**: Tailwind CSS

## 🧠 Key Design Decisions
1. **Financial Precision**: All amounts are stored and processed as **integers (cents/paise)**. This eliminates the floating-point precision errors inherent in JavaScript, ensuring financial accuracy in the ledger.
2. **System Idempotency**: To handle "multiple clicks" or automatic network retries, the backend implements a 10-second duplicate check. If an identical transaction is detected within this window, the system rejects it to prevent double-entries.
3. **Resilience & Syncing**: Implemented a **2-tier retry mechanism** on the frontend. If the fetch fails due to an "unreliable network," the app automatically retries twice before showing an error state.
4. **Data Hydration**: Since the server uses an in-memory store, I implemented a **LocalStorage backup strategy** to ensure user data survives browser refreshes or server cold-starts.

## ⚖️ Trade-offs & Timebox Decisions
- **Persistence**: Prioritized building robust "Sync & Retry" logic over a live database to demonstrate how the app handles network failure within the 4-hour limit.
- **UI/UX over Auth**: Instead of a complex Auth system, I built a polished "Hero Entry" flow and custom empty states to focus on dashboard utility and "Production-like" visual feedback.

## 🏃 How to Run Locally
1. `npm install`
2. `npm run dev`
3. `npm test` (to run logic verification tests)

---
**Note**: This project uses the latest Next.js 15 dynamic routing conventions, including asynchronous `params` unwrapping for API routes.