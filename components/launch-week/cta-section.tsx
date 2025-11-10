"use client";

import React, { useEffect } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  className?: string;
}

declare global {
  interface Window {
    TuemilioObject?: string;
    Tuemilio?: (...args: any[]) => void;
  }
}

export const LaunchWeekCTA: React.FC<CTASectionProps> = ({ className }) => {
  useEffect(() => {
    // Load Tuemilio script
    const loadTuemilio = () => {
      if (window.Tuemilio) {
        // Script already loaded
        return;
      }

      const script = document.createElement("script");
      script.id = "Tuemilio";
      script.src = "https://tuemilio.com/assets/js/modal/4.0/tuemilio-modal.js";
      script.async = true;

      // Initialize Tuemilio object before script loads (queue system)
      window.TuemilioObject = "Tuemilio";
      const tuemilioFunc = function (...args: any[]) {
        (tuemilioFunc as any).q = (tuemilioFunc as any).q || [];
        (tuemilioFunc as any).q.push(args);
      };
      (tuemilioFunc as any).id = "93b3e64d-82ec-435b-86d8-db55371e17ed";
      window.Tuemilio = window.Tuemilio || tuemilioFunc;

      // Queue initialization calls (will be processed when script loads)
      window.Tuemilio("init", {
        form: {
          style: {
            inline: true,
          },
          input: {
            texts: {
              placeholder: "name@email.com",
            },
          },
          button: {
            texts: {
              CTA: "Notify Me",
              loading: "Loading",
              checkDashboard: "Dashboard",
              login: "Login",
            },
          },
          feedback: {
            texts: {
              empty: "Don't forget your email!",
              invalidEmail: "Wrong email!",
              unaccepted: "We do not accept that email",
              unauthorized: "You did not subscribe with that email",
            },
          },
        },
      });

      // Queue visit event
      window.Tuemilio("sendVisit");

      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    };

    loadTuemilio();

    // Cleanup function
    return () => {
      const script = document.getElementById("Tuemilio");
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .t-button {
            color: white;
            background-color: #ef4444;
          }
          .t-primary-color {
            color: white;
            background-color: #ef4444;
            fill: white;
          }
          .t-input-color {
            color: black;
            background-color: white;
          }
          .t-form {
            max-width: 300px;
          }
        `
      }} />
      <div
        id="join-launch-week"
        className={cn(
          "relative overflow-hidden py-20 md:py-10",
          "bg-gradient-to-br",
          " rounded-lg",
          className
        )}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Bell className="w-12 h-12 mx-auto -mb-2 text-primary" />

            <h2 className="text-2xl font-bold text-[#111827] dark:text-white">
              Don't Miss Out
            </h2>

            <p className="text-lg md:text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
              Join thousands of developers building the future of AI agents.
              Get notified when we launch new features and announcements.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="t-signup"></div>
          </div>
        </div>
      </div>
    </>
  );
};
