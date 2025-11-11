"use client";
import React, { useState } from "react";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const question = {
  question: "What do you think Lamatic's biggest upgrade will be?",
  options: ["Smarter Agents", "Dark Mode", "Both (because we don't slow down)"],
};

export function LaunchWeekGame() {
  const [selected, setSelected] = useState("");

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Selected:", selected);
  };

  return (
    <div className="relative overflow-hidden py-16 md:py-24 bg-white border border-gray-200 rounded-lg max-w-7xl mx-auto">
      {/* Background Grid Lines */}
      {/* <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
        aria-hidden="true"
      /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Side - Title and Brain Icon */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-6xl font-extrabold text-black mb-6">
              Test Your Lamatic IQ!
            </h2>
            <div className="relative inline-block">
              <Brain className="w-32 h-32 text-pink-500" strokeWidth={1.5} />
              <div className="absolute -bottom-2 -right-2 bg-pink-100 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-pink-600">
                  you got this!
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Question and Options */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-black mb-6">
              {question.question}
            </h3>
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border-2 cursor-pointer transition-all",
                    selected === option
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300 bg-white"
                  )}
                  onClick={() => setSelected(option)}
                >
                  <span className="font-medium text-gray-800">
                    {String.fromCharCode(97 + index)}. {option}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className={cn(
                "px-6 py-2 rounded-md text-white font-semibold transition-colors",
                selected
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-300 cursor-not-allowed"
              )}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
