"use client";

import React, { useEffect } from "react";
import { Mail,Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Script from "next/script";



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
  /* useEffect(() => {
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
              checkDashboard: "Status",
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
    };}, 
    []);
*/
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
          <div className="text-center">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-8 text-center max-w-3xl mx-auto leading-tight">
              Join the Countdown — Get Notified When Launch Week 3 Begins
            </h2>

            {/* Email Form */}
            <a
        href="https://luma.com/event/evt-ajOnQrFHv18GQp5"
        className="luma-checkout--button bg-black hover:bg-gray-800 text-white font-bold text-base md:text-lg px-8 py-4 md:px-10 md:py-5 rounded-full transition-colors inline-flex items-center gap-3"
        data-luma-action="checkout"
        data-luma-event-id="evt-ajOnQrFHv18GQp5"
        >
        <Calendar className="w-5 h-5 md:w-6 md:h-6" />
        <span>Get Notified</span>
        </a>
        <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
          </div>
        </div>
      </div>
    </>
  );
};
