"use client";

import React, { useEffect } from "react";
import { Mail } from "lucide-react";
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
              placeholder: "Enter your email id",
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .t-button {
            color: white;
            background-color: #ef4444;
            justify-content: center;
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
            max-width: 100%;
          }
        `,
        }}
      />
      <div
        id="join-launch-week"
        className={cn(
          "overflow-hidden py-20 md:py-24 bg-white",
          className
        )}
      >
        {/* Background Grid Lines */}
        {/* <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
          aria-hidden="true"
        /> */}

        <div className="mx-auto px-4">
          <div className="justify-center">
            {/* Heading */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-black mb-6 text-center">
              Get Notified <br /> When Launch Week 3 Begins
            </h2>

            {/* Email Form */}
            <div className="flex items-center justify-center">
              <div className="flex-1">
                <div className="t-signup"></div>
              </div>

              {/* Envelope Icon */}
              {/* <div className="hidden lg:block relative flex-shrink-0">
                <div className="w-24 h-24 bg-red-500 rounded-lg flex items-center justify-center transform rotate-6 shadow-lg">
                  <Mail className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 border-2 border-red-300 rounded-lg animate-pulse"></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
