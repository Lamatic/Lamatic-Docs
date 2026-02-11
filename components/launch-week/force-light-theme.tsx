"use client";
import { useEffect } from "react";

export function ForceLightTheme() {
  useEffect(() => {
    // Remove dark class from HTML element
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("dark");
    
    // Monitor for any attempts to add dark class back
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if (htmlElement.classList.contains("dark")) {
            htmlElement.classList.remove("dark");
          }
        }
      });
    });
    
    // Observe the HTML element for class changes
    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return null;
}

