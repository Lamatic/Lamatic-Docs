"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What is Lamatic open-sourcing during Launch Week?",
    options: [
      "A Collection of Agent Kits",
      "A voice-only chatbot",
      "A simple API dashboard",
    ],
    answer: "A Collection of Agent Kits",
    hint: "It includes modular pipelines, tool use, and one-click deployment.",
  },
  {
    question: "Which Lamatic feature allows flows to communicate with Vector databases?",
    options: ["Generate Text", "RAG Node", "File Explorer Node"],
    answer: "RAG Node",
    hint: "It allows flows to communicate with Vector databases.",
  },
  {
    question: "What does the RAG Node focus on?",
    options: [
      "Retrieval of relevant information",
      "Generation of text",
      "Vectorization of data",
    ],
    answer: "Retrieval of relevant information",
    hint: "It helps in retrieving relevant information from Vector databases.",
  },
];

const nodes = [
  "Trigger Node",
  "RAG Node",
  "Response Node"
];

export function LaunchWeekGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [correctNodes, setCorrectNodes] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const handleConfirm = () => {
    if (!selected) return;

    if (selected === questions[current].answer) {
      const nextNode = nodes[current];
      setCorrectNodes([...correctNodes, nextNode]);
      setShowMessage("✅ Correct! Moving to next question...");

      if (current === 0) setOverlayVisible(false);

      setTimeout(() => {
        setShowMessage("");
        setShowHint(false);
        setSelected("");
        setCurrent(current + 1);
      }, 1000);
    } else {
      setShowMessage("❌ Oops! Try again from the beginning.");
      setTimeout(() => {
        setShowMessage("");
        setShowHint(false);
        setSelected("");
        setCurrent(0);
        setCorrectNodes([]);
        setOverlayVisible(true);
      }, 1200);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected("");
    setCorrectNodes([]);
    setShowHint(false);
    setShowMessage("");
    setOverlayVisible(true);
  };

  const isCompleted = current >= questions.length;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-lg dark:shadow-zinc-900/50 p-10 w-full max-w-6xl mx-auto mt-12 relative">
      {/* Section Header */}
      {!isCompleted && (
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#111827] dark:text-white">
            Lamatic Launch Quiz
          </h1>
          <p className="text-lg md:text-lg text-gray-600 dark:text-gray-300 mb-16">
            Give the right answers to build your workflow.
          </p>
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 relative min-h-[420px]">
        {/* Left: Quiz or Success */}
        <div className="flex-1 flex items-start justify-center">
          {!isCompleted ? (
            <div className="w-full flex flex-col justify-between h-full">
              {/* Top Section: Question + Options */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#111827] dark:text-white">
                  {questions[current].question}
                </h3>
                <div className="space-y-3">
                  {questions[current].options.map((option, i) => (
                    <div
                      key={i}
                      className={`w-full px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        selected === option
                          ? "border-[#FF3E3E] bg-[#FFF3F3] dark:bg-red-900/20 dark:border-red-500 dark:text-white"
                          : "border-gray-200 dark:border-zinc-700 hover:border-[#FF3E3E]/60 dark:hover:border-red-500/50 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200"
                      }`}
                      onClick={() => setSelected(option)}
                    >
                      {String.fromCharCode(65 + i)}. {option}
                    </div>
                  ))}
                </div>

                {/* Confirm + Hint Buttons */}
                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={handleConfirm}
                    className="px-6 py-2 bg-[#FF3E3E] text-white rounded-lg hover:bg-[#e63535] transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-6 py-2 border border-gray-300 dark:border-zinc-600 text-gray-600 dark:text-gray-300 rounded-lg hover:border-[#FF3E3E]/60 dark:hover:border-red-500/50 bg-white dark:bg-zinc-800 transition"
                  >
                    Hint
                  </button>
                </div>
              </div>

              {/* Bottom Section: Feedback + Hint */}
              <div className="mt-10">
                {showHint && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-lg p-4">
                      💡 {questions[current].hint}
                    </p>
                  </div>
                )}
                {showMessage && (
                  <motion.p
                    className={`text-sm font-medium ${
                      showMessage.includes("Correct")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {showMessage}
                  </motion.p>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center text-center w-full py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#FF3E3E] mb-6">
                🎉 Workflow Completed Successfully!
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-base max-w-md leading-relaxed mb-14">
                You've mastered Lamatic's Launch Week quiz — your workflow is now fully built
                and ready to go!
              </p>

              <div className="mt-8">
               <button
                onClick={handleRestart}
                className="px-8 py-3 bg-[#FF3E3E] text-white rounded-lg font-semibold hover:bg-[#e63535] transition-all"
                >
                Play Again
               </button>
              </div>
             
            </motion.div>
          )}
        </div>

        {/* Divider */}
        {!isCompleted && <div className="hidden md:block w-px bg-gray-200 dark:bg-zinc-700"></div>}

        {/* Right: Workflow */}
        {!isCompleted && (
          <div className="flex-1 flex flex-col items-center relative">
            {isOverlayVisible && (
              <motion.div
                className="absolute inset-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center rounded-xl z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  Answer correctly to unlock your workflow →
                </p>
              </motion.div>
            )}

            <div className="relative flex flex-col items-center justify-center">
              {nodes.map((node, index) => (
                <div key={index} className="flex flex-col items-center justify-center w-full">
                  <motion.div
                    className={`px-6 py-3 rounded-lg border-2 text-center font-medium w-full ${
                      correctNodes.includes(node)
                        ? "border-[#FF3E3E] bg-[#FFF3F3] dark:bg-red-900/20 dark:border-red-500 shadow-[0_0_15px_#FF3E3E55] dark:shadow-[0_0_15px_#FF3E3E88] text-gray-900 dark:text-white"
                        : "border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
                    }`}
                    animate={{
                      scale: correctNodes.includes(node) ? 1.05 : 1,
                      opacity: correctNodes.includes(node) ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {node}
                  </motion.div>

                  {index < nodes.length - 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "2.5rem",
                        opacity: correctNodes.length > index ? 1 : 0.2,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-1 rounded-full ${
                        correctNodes.length > index
                          ? "bg-[#FF3E3E] shadow-[0_0_10px_#FF3E3E88]"
                          : "bg-gray-300 dark:bg-zinc-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
