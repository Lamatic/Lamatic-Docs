"use client";
import React, { useState } from "react";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

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
    question:
      "Which Lamatic feature allows flows to communicate with Vector databases?",
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

export function LaunchWeekGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;

    const current = questions[currentQuestion];
    if (selected === current.answer) {
      setScore(score + 1);
      setShowMessage("✅ Correct! Moving to next question...");
      setShowHint(false);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelected("");
          setShowMessage("");
        } else {
          setIsCompleted(true);
          setShowMessage("");
        }
      }, 1500);
    } else {
      setShowMessage("❌ Incorrect! Try again.");
      setTimeout(() => {
        setShowMessage("");
      }, 2000);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelected("");
    setShowHint(false);
    setShowMessage("");
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="relative overflow-hidden py-16 md:py-16 border border-gray-200 rounded-lg max-w-7xl mx-auto">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Side - Title and Brain Icon */}
          <div className="flex-2">
            <h2 className="text-4xl md:text-6xl font-extrabold text-black mb-6">
              Test <br />
              Your <br /> Lamatic IQ!
            </h2>
            <p className="text-gray-500">Test your knowledge of Lamatic!</p>
            <div className="relative inline-block">
              {/* <Brain className="w-32 h-32 text-pink-500" strokeWidth={1.5} /> */}
              {/* <div className="absolute -bottom-2 -right-2 bg-pink-100 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-pink-600">
                  you got this!
                </span>
              </div> */}
            </div>
          </div>

          {/* Right Side - Question and Options */}
          <div className="flex-1">
            {!isCompleted ? (
              <>
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-6">
                  {questions[currentQuestion].question}
                </h3>
                <div className="space-y-3 mb-6">
                  {questions[currentQuestion].options.map((option, index) => (
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

                {showHint && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 {questions[currentQuestion].hint}
                    </p>
                  </div>
                )}

                {showMessage && (
                  <div
                    className={cn(
                      "mb-4 p-4 rounded-lg",
                      showMessage.includes("Correct")
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-medium",
                        showMessage.includes("Correct")
                          ? "text-green-800"
                          : "text-red-800"
                      )}
                    >
                      {showMessage}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
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
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-black mb-4">
                  🎉 Quiz Completed!
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  You scored {score} out of {questions.length}!
                </p>
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
