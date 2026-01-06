"use client";

import { useEffect, useState } from "react";

export default function HomeWelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("toolstack_welcome_seen");
    if (!seen) {
      setOpen(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("toolstack_welcome_seen", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white w-full max-w-md mx-4 rounded-3xl p-6
                   shadow-xl animate-fade-in"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            👋 Welcome to ToolStack.fun
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <p className="text-sm text-gray-700 mb-4">
          Our tools are currently under active development 🚧
        </p>

        <ul className="text-sm text-gray-600 space-y-2 mb-6 list-disc pl-5">
          <li>Some tools may have minor bugs</li>
          <li>We are improving UI & performance</li>
          <li>New features are being added regularly</li>
          <li>Built with ❤️ for students & developers</li>
        </ul>

        {/* CTA */}
        <button
          onClick={closeModal}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Got it, let’s explore 🚀
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Thanks for supporting our early version 🙏
        </p>
      </div>
    </div>
  );
}
