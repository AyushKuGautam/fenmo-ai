// /components/WelcomeScreen.tsx
"use client";

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <div className="max-w-2xl">
        <div className="mb-6 inline-block p-3 bg-indigo-50 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
          Master Your <span className="text-indigo-600">Finances.</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 leading-relaxed">
          A production-grade tool to record, review, and understand where your
          money is going. Built for reliability and data correctness.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-4 border border-gray-100 rounded-xl shadow-sm bg-gray-50">
            <h3 className="font-bold text-gray-800">🔒 Secure</h3>
            <p className="text-sm text-gray-500">
              Idempotent transactions to prevent duplicates.
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded-xl shadow-sm bg-gray-50">
            <h3 className="font-bold text-gray-800">⚡ Resilient</h3>
            <p className="text-sm text-gray-500">
              Auto-retry logic for unreliable networks.
            </p>
          </div>
          <div className="p-4 border border-gray-100 rounded-xl shadow-sm bg-gray-50">
            <h3 className="font-bold text-gray-800">📁 Persistent</h3>
            <p className="text-sm text-gray-500">
              Local hydration ensures data survives refreshes.
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="px-10 py-4 bg-indigo-600 text-white text-lg font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
        >
          Enter Dashboard
        </button>
      </div>

      <div className="mt-20 text-xs text-gray-400 font-medium uppercase tracking-widest">
        Technical Assessment • Feb 2026
      </div>
    </div>
  );
}
