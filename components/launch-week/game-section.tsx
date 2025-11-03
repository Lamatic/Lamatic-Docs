"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    question:
      "What is Lamatic open-sourcing during Launch Week?",
    options: [
      "A toolkit to build AI agents end-to-end",
      "A voice-only chatbot",
      "A simple API dashboard",
    ],
    answer: "A toolkit to build AI agents end-to-end",
    hint: "It includes modular pipelines, tool use, and one-click deployment.",
  },
  {
    question:
      "Which Lamatic feature allows agents to communicate with each other?",
    options: ["Voice Nodes", "A2A & MCP Protocols", "Webhook Triggers"],
    answer: "A2A & MCP Protocols",
    hint: "Think of cross-agent communication between systems.",
  },
  {
    question:
      "Which framework helps you build AI telephony agents in Lamatic?",
    options: ["SIP Framework", "Database Node", "Voice Flow Engine"],
    answer: "SIP Framework",
    hint: "It enables inbound and outbound AI-powered calls.",
  },
  {
    question:
      "What enables an AI Avatar to respond interactively with voice in Lamatic?",
    options: ["Python SDK", "Workflow Trigger", "Database API"],
    answer: "Python SDK",
    hint: "You can use this to add live, voice-enabled assistants.",
  },
  {
    question:
      "What does the Conversational Flow Agent focus on?",
    options: [
      "Voice activity and turn detection",
      "Simple text chat",
      "Database schema building",
    ],
    answer: "Voice activity and turn detection",
    hint: "It helps in natural voice conversation flow.",
  },
];

const nodes = [
  "Trigger Node",
  "Action Node",
  "Database Node",
  "Response Node",
  "Success Node",
];

export default function LaunchWeekGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [correctNodes, setCorrectNodes] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  const handleConfirm = () => {
    if (!selected) return;
    if (selected === questions[current].answer) {
      const nextNode = nodes[current];
      setCorrectNodes([...correctNodes, nextNode]);
      setShowMessage("✅ Correct! Moving to next question...");
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
      }, 1200);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-6xl mx-auto mt-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#111827]">
          Lamatic Launch Quiz
        </h1>
        <p className="text-gray-500 mt-2">
          Give the right answers to build your workflow.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Left: Quiz */}
        <div className="flex-1">
          {current < questions.length ? (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#111827]">
                {questions[current].question}
              </h3>
              <div className="space-y-3">
                {questions[current].options.map((option, i) => (
                  <div
                    key={i}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      selected === option
                        ? "border-[#FF3E3E] bg-[#FFF3F3]"
                        : "border-gray-200 hover:border-[#FF3E3E]/60"
                    } cursor-pointer transition-all`}
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
                  className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-[#FF3E3E]/60 transition"
                >
                  Hint
                </button>
              </div>

              {/* Hint Text */}
              {showHint && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-4">
                 💡 {questions[current].hint}
                  </p>
                 </div>
              )}


              {/* Message (more top spacing) */}
              {showMessage && (
                <div className="mt-12">
                  <p className="text-sm font-medium text-gray-700">
                    {showMessage}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              className="text-center text-2xl font-semibold text-[#FF3E3E]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🎉 Workflow Completed Successfully!
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-200"></div>

        {/* Right: Workflow */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative flex flex-col items-center space-y-0">
            {nodes.map((node, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  className={`px-6 py-3 rounded-lg border-2 text-center font-medium ${
                    correctNodes.includes(node)
                      ? "border-[#FF3E3E] bg-[#FFF3F3] shadow-[0_0_15px_#FF3E3E55]"
                      : "border-gray-300 bg-white"
                  }`}
                  animate={{
                    scale: correctNodes.includes(node) ? 1.05 : 1,
                    opacity: correctNodes.includes(node) ? 1 : 0.6,
                  }}
                >
                  {node}
                </motion.div>

                {/* Connector (no gap) */}
                {index < nodes.length - 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                   animate={{
                   height: correctNodes.length > index ? "2.5rem" : "2.5rem",
                   opacity: correctNodes.length > index ? 1 : 0,
                   backgroundColor:
                   correctNodes.length > index
                    ? "#FF3E3E"
                    : "transparent",
                   boxShadow:
                   correctNodes.length > index
                   ? "0 0 10px #FF3E3E88"
                   : "none",
                   }}
                   transition={{ duration: 0.5 }}
                   className="w-1 rounded-full"
                   />
    )}


              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
