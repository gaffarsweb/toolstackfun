"use client";

import { useState } from "react";

function getJsonErrorPosition(error: string) {
  const match = error.match(/position (\d+)/);
  return match ? Number(match[1]) : null;
}

export default function JsonValidatorPage() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorPos, setErrorPos] = useState<number | null>(null);

  const validateJson = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setErrorMsg(null);
      setErrorPos(null);
    } catch (err: any) {
      setIsValid(false);
      setErrorMsg(err.message);
      setErrorPos(getJsonErrorPosition(err.message));
    }
  };

  const clearAll = () => {
    setInput("");
    setIsValid(null);
    setErrorMsg(null);
    setErrorPos(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* ---------- HERO ---------- */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium mb-4">
          JSON Tool
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          JSON Validator
        </h1>

        <p className="text-gray-600 text-lg">
          Validate JSON instantly and detect syntax errors with clear messages —
          all directly in your browser.
        </p>
      </section>

      {/* ---------- EDITOR ---------- */}
      <section className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{\n  "name": "ToolStack",\n  "version": 1\n}'
          className="w-full h-80 resize-none rounded-2xl border p-4
                     font-mono text-sm focus:outline-none
                     focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* ---------- ACTIONS ---------- */}
      <section className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={validateJson}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white
                     hover:bg-indigo-700 transition font-medium"
        >
          Validate JSON
        </button>

        <button
          onClick={clearAll}
          className="px-6 py-3 rounded-xl border hover:bg-gray-100
                     transition font-medium"
        >
          Clear
        </button>
      </section>

      {/* ---------- RESULT ---------- */}
      {isValid !== null && (
        <section
          className={`rounded-2xl border p-6 text-center font-medium ${
            isValid
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {isValid ? (
            <>✅ Valid JSON</>
          ) : (
            <>
              ❌ Invalid JSON
              <div className="text-sm mt-2 break-all">
                {errorMsg}
              </div>
              {errorPos !== null && (
                <div className="text-xs mt-1 text-red-600">
                  Error near character position: {errorPos}
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* ---------- SEO CONTENT ---------- */}
      <section className="bg-gray-50 border rounded-2xl p-8 text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold">
          Online JSON Validator Tool
        </h2>

        <p>
          ToolStack JSON Validator helps you quickly check whether your JSON
          data is valid or contains syntax errors. This tool is ideal for API
          responses, configuration files, and data exchange formats.
        </p>

        <p>
          All validation happens locally in your browser, ensuring your data
          stays private and secure. No uploads or signups required.
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Instant JSON validation</li>
          <li>Clear error messages</li>
          <li>Works offline after load</li>
          <li>Developer & student friendly</li>
        </ul>
      </section>
    </div>
  );
}
