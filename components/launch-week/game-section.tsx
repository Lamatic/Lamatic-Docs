"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Code,
  Brain,
  Puzzle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Challenge 1: AI Agent Flow Puzzle
interface PuzzleNode {
  id: string;
  label: string;
  type: "trigger" | "action" | "output";
  correctOrder: number;
}

const puzzleNodes: PuzzleNode[] = [
  {
    id: "trigger",
    label: "Webhook Trigger",
    type: "trigger",
    correctOrder: 1,
  },
  {
    id: "llm",
    label: "LLM Node",
    type: "action",
    correctOrder: 2,
  },
  {
    id: "vector",
    label: "Vector Search",
    type: "action",
    correctOrder: 3,
  },
  {
    id: "response",
    label: "Response",
    type: "output",
    correctOrder: 4,
  },
];

// Challenge 2: Code Puzzle
interface CodeChallenge {
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

const codeChallenge: CodeChallenge = {
  question: "What does this AI agent function return?",
  code: `function processQuery(query) {
  const context = vectorSearch(query);
  const response = llm.generate({
    prompt: query,
    context: context
  });
  return response;
}`,
  options: [
    "A: The query string",
    "B: The vector search results",
    "C: The LLM generated response",
    "D: The context only",
  ],
  correctAnswer: 2,
  hint: "Look at the return statement - what value is being returned?",
};

// Challenge 3: LLM Knowledge Quiz
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

const quizQuestion: QuizQuestion = {
  question: "What is the correct order for building an AI agent in Lamatic?",
  options: [
    "A: Deploy → Test → Build",
    "B: Build → Test → Deploy",
    "C: Test → Build → Deploy",
    "D: Build → Deploy → Test",
  ],
  correctAnswer: 1,
  hint: "Think about the development workflow - you build first, then test, then deploy!",
};

type ChallengeType = "puzzle" | "code" | "quiz";

interface GameSectionProps {
  className?: string;
}

export const LaunchWeekGame: React.FC<GameSectionProps> = ({ className }) => {
  const [challengeType, setChallengeType] = useState<ChallengeType>("puzzle");
  
  // Puzzle state
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  
  // Code challenge state
  const [selectedCodeAnswer, setSelectedCodeAnswer] = useState<number | null>(null);
  
  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  
  // Common state
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Randomly select challenge on mount
  useEffect(() => {
    const challenges: ChallengeType[] = ["puzzle", "code", "quiz"];
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallengeType(randomChallenge);
  }, []);

  // Puzzle handlers
  const handleNodeClick = (nodeId: string) => {
    if (completed || challengeType !== "puzzle") return;

    if (selectedOrder.includes(nodeId)) {
      setSelectedOrder(selectedOrder.filter((id) => id !== nodeId));
    } else {
      setSelectedOrder([...selectedOrder, nodeId]);
    }
    setIsCorrect(null);
  };

  // Code challenge handlers
  const handleCodeAnswerSelect = (answerIndex: number) => {
    if (completed || challengeType !== "code") return;
    setSelectedCodeAnswer(answerIndex);
    setIsCorrect(null);
  };

  // Quiz handlers
  const handleQuizAnswerSelect = (answerIndex: number) => {
    if (completed || challengeType !== "quiz") return;
    setSelectedQuizAnswer(answerIndex);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    let isOrderCorrect = false;

    if (challengeType === "puzzle") {
      if (selectedOrder.length !== puzzleNodes.length) {
        setIsCorrect(false);
        return;
      }
      isOrderCorrect = selectedOrder.every((nodeId, index) => {
        const node = puzzleNodes.find((n) => n.id === nodeId);
        return node?.correctOrder === index + 1;
      });
    } else if (challengeType === "code") {
      if (selectedCodeAnswer === null) {
        setIsCorrect(false);
        return;
      }
      isOrderCorrect = selectedCodeAnswer === codeChallenge.correctAnswer;
    } else if (challengeType === "quiz") {
      if (selectedQuizAnswer === null) {
        setIsCorrect(false);
        return;
      }
      isOrderCorrect = selectedQuizAnswer === quizQuestion.correctAnswer;
    }

    setIsCorrect(isOrderCorrect);
    setAttempts(attempts + 1);

    if (isOrderCorrect) {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedOrder([]);
    setSelectedCodeAnswer(null);
    setSelectedQuizAnswer(null);
    setIsCorrect(null);
    setAttempts(0);
    setCompleted(false);
    setShowHint(false);
    
    // Select new random challenge
    const challenges: ChallengeType[] = ["puzzle", "code", "quiz"];
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallengeType(randomChallenge);
  };

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case "trigger":
        return "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200";
      case "action":
        return "bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200";
      case "output":
        return "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700";
    }
  };

  const getChallengeIcon = () => {
    switch (challengeType) {
      case "puzzle":
        return <Puzzle className="w-16 h-16 mx-auto mb-6 text-primary" />;
      case "code":
        return <Code className="w-16 h-16 mx-auto mb-6 text-primary" />;
      case "quiz":
        return <Brain className="w-16 h-16 mx-auto mb-6 text-primary" />;
    }
  };

  const getChallengeTitle = () => {
    switch (challengeType) {
      case "puzzle":
        return "AI Agent Flow Puzzle";
      case "code":
        return "Code Challenge";
      case "quiz":
        return "AI Agent Knowledge Quiz";
    }
  };

  const getChallengeDescription = () => {
    switch (challengeType) {
      case "puzzle":
        return "Arrange the nodes in the correct order to build a working AI agent flow.";
      case "code":
        return "Analyze the code and select the correct answer.";
      case "quiz":
        return "Test your knowledge about building AI agents with Lamatic.";
    }
  };

  const availableNodes = puzzleNodes.filter(
    (node) => !selectedOrder.includes(node.id)
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden py-20 md:py-32 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <div className="justify-center gap-2 mb-4">
          {getChallengeIcon()}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {getChallengeTitle()}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            {getChallengeDescription()}
          </p>
        </div>
      </div>

      <Card className="border-2 bg-white dark:bg-gray-800 rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Challenge</CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                Attempts: {attempts}
              </Badge>
              {completed && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Completed!
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Puzzle Challenge */}
          {challengeType === "puzzle" && (
            <>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 min-h-[200px]">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  Flow Sequence
                </h3>
                {selectedOrder.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                    <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Start by clicking nodes below to build your flow</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {selectedOrder.map((nodeId, index) => {
                      const node = puzzleNodes.find((n) => n.id === nodeId);
                      return (
                        <div
                          key={nodeId}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all",
                            getNodeTypeColor(node?.type || ""),
                            "hover:scale-105"
                          )}
                          onClick={() => handleNodeClick(nodeId)}
                        >
                          <span className="font-semibold text-sm">
                            {index + 1}.
                          </span>
                          <span className="font-medium">{node?.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  Available Nodes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableNodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => handleNodeClick(node.id)}
                      disabled={completed}
                      className={cn(
                        "px-4 py-3 rounded-lg border-2 cursor-pointer transition-all font-medium",
                        getNodeTypeColor(node.type),
                        completed
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-105 hover:shadow-md"
                      )}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Code Challenge */}
          {challengeType === "code" && (
            <>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  {codeChallenge.question}
                </h3>
                <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-left text-sm mb-6">
                  <code>{codeChallenge.code}</code>
                </pre>
                <div className="space-y-3">
                  {codeChallenge.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleCodeAnswerSelect(index)}
                      disabled={completed}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border-2 transition-all font-medium",
                        selectedCodeAnswer === index
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500",
                        completed && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Quiz Challenge */}
          {challengeType === "quiz" && (
            <>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-6 text-gray-700 dark:text-gray-300">
                  {quizQuestion.question}
                </h3>
                <div className="space-y-3">
                  {quizQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswerSelect(index)}
                      disabled={completed}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border-2 transition-all font-medium",
                        selectedQuizAnswer === index
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500",
                        completed && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Result Message */}
          {isCorrect !== null && (
            <div
              className={cn(
                "p-4 rounded-lg flex items-center gap-3",
                isCorrect
                  ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700"
                  : "bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700"
              )}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-200">
                      Perfect! You got it right! 🎉
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {challengeType === "puzzle" && "Your AI agent flow is correct!"}
                      {challengeType === "code" && "You understand AI agent code structure!"}
                      {challengeType === "quiz" && "You know how to build AI agents with Lamatic!"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-200">
                      Not quite right. Try again!
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {challengeType === "puzzle" && selectedOrder.length < puzzleNodes.length && "Make sure you include all nodes."}
                      {challengeType === "puzzle" && selectedOrder.length === puzzleNodes.length && "Check the order of your nodes."}
                      {(challengeType === "code" || challengeType === "quiz") && "Select an answer and try again."}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Success Message */}
          {completed && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-600 dark:to-orange-600 p-6 rounded-lg text-center">
              <Trophy className="w-12 h-12 mx-auto mb-3 text-white" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-white/90">
                You've mastered this challenge! Try a new challenge to test your skills further.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleCheck}
              disabled={
                (challengeType === "puzzle" && selectedOrder.length === 0) ||
                (challengeType === "code" && selectedCodeAnswer === null) ||
                (challengeType === "quiz" && selectedQuizAnswer === null) ||
                completed
              }
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Completed!
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Check Answer
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              disabled={completed}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-shrink-0"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              New Challenge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hint Section */}
      {showHint && (
        <Card className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Hint
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {challengeType === "puzzle" && "Think about the flow: Start with a trigger, process with actions (LLM and Vector Search), and end with a response. The order matters for data processing!"}
                  {challengeType === "code" && codeChallenge.hint}
                  {challengeType === "quiz" && quizQuestion.hint}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
