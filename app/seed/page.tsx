"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SeedPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to seed");
      }

      setStatus("success");
      setMessage(`Success! ${data.message} (${data.count} items)`);
    } catch (err) {
      setStatus("error");
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-neutral-900">Database Seeding</h1>
        <p className="text-neutral-600">
          Click the button below to upload local property data to Supabase.
        </p>
        
        <Button 
          onClick={handleSeed} 
          disabled={status === "loading"}
          size="lg"
          className="w-full"
        >
          {status === "loading" ? "Seeding..." : "Start Migration"}
        </Button>

        {message && (
          <div
            className={`p-4 rounded-md text-sm font-medium ${
              status === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
