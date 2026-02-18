// /components/Toast.tsx
"use client";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export default function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed bottom-5 right-5 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-2xl transition-all animate-bounce`}
    >
      {message}
    </div>
  );
}
