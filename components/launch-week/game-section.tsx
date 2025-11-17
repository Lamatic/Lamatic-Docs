"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left Side - Title */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 leading-tight">
              Test <br />
              Your <br />
              Lamatic IQ!
            </h2>
            <p className="text-gray-600 text-sm">Guess all the answers right, and we will send you some goodies.</p>
          </div>
          {/* Right Side - Question and Options */}
          <div style={{ height: "500px", width: "100%" }} data-tf-live="01KA20XQFBQW7J7Y39Z75ZCJ56"></div>
          <Script src="//embed.typeform.com/next/embed.js" strategy="lazyOnload" />
        </div>
        </div>
      </div>
  );
}
