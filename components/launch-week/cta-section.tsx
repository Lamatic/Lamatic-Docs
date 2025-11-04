"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  className?: string;
}

export const LaunchWeekCTA: React.FC<CTASectionProps> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1000);
  };

  return (
    <div
      id="join-launch-week"
      className={cn(
        "relative overflow-hidden py-20 md:py-10",
        "bg-gradient-to-br",
        "dark:bg-zinc-900 rounded-lg",
        className
      )}
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Bell className="w-12 h-12 mx-auto -mb-2 text-primary" />

          <h2 className="text-2xl font-bold text-[#111827]">
            Don't Miss Out
          </h2>

          <p className="text-lg md:text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
            Join thousands of developers building the future of AI agents.
            Get notified when we launch new features and announcements.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || isSubmitted}
            className="w-full sm:flex-1 h-12 px-4 text-base border-2 rounded-lg focus:ring-2 focus:ring-primary"
          />

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || isSubmitted || !email}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting
              ? "Submitting..."
              : isSubmitted
              ? "Reminder Set!"
              : "Notify Me"}
          </Button>
        </form>

        {/* <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          No spam. Unsubscribe anytime.
        </p> */}
      </div>
    </div>
  );
};
