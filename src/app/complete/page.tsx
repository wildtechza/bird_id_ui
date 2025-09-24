"use client";

import Link from "next/link";

export default function Complete() {
  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      <h1 className="text-2xl font-bold">Complete!</h1>

      <div className="flex gap-3">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
