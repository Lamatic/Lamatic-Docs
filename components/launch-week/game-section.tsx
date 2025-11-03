"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PuzzleNode {
  id: string;
  label: string;
  type: "trigger" | "action" | "output";
  correctOrder: number;
}

interface GameSectionProps {
  className?: string;
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

export const LaunchWeekGame: React.FC<GameSectionProps> = ({ className }) => {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNodeClick = (nodeId: string) => {
    if (completed) return;

    if (selectedOrder.includes(nodeId)) {
      setSelectedOrder(selectedOrder.filter((id) => id !== nodeId));
    } else {
      setSelectedOrder([...selectedOrder, nodeId]);
    }
    setIsCorrect(null);
  };

  const handleCheck = () => {
    if (selectedOrder.length !== puzzleNodes.length) {
      setIsCorrect(false);
      return;
    }

    const isOrderCorrect = selectedOrder.every((nodeId, index) => {
      const node = puzzleNodes.find((n) => n.id === nodeId);
      return node?.correctOrder === index + 1;
    });

    setIsCorrect(isOrderCorrect);
    setAttempts(attempts + 1);

    if (isOrderCorrect) {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedOrder([]);
    setIsCorrect(null);
    setAttempts(0);
    setCompleted(false);
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

  const availableNodes = puzzleNodes.filter(
    (node) => !selectedOrder.includes(node.id)
  );

  return (
    <div
      className={cn(
        " relative overflow-hidden py-20 md:py-32 max-w-4xl mx-auto text-center",
        className
      )}
    >
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <div className="justify-center gap-2 mb-4">
          <Trophy className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            AI Agent Puzzle
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
          Arrange the nodes in the correct order to build a working AI agent
          flow. Drag nodes to the flow area below!
        </p>
        </div>
        
      </div>

      <Card className="border-2 bg-white dark:bg-gray-800 rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Build Your AI Agent Flow</CardTitle>
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
          {/* Flow Area */}
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

          {/* Available Nodes */}
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
                      Perfect! You built the correct flow!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your AI agent will now process requests correctly.
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
                      {selectedOrder.length < puzzleNodes.length
                        ? "Make sure you include all nodes."
                        : "Check the order of your nodes."}
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
                You've mastered building AI agent flows with Lamatic!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleCheck}
              disabled={selectedOrder.length === 0 || completed}
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
                  Check Solution
                </>
              )}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-shrink-0"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hint Section */}
      <Card className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Hint
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Think about the flow: Start with a trigger, process with actions
                (LLM and Vector Search), and end with a response. The order
                matters for data processing!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
