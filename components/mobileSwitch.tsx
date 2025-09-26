import React, { useState, useEffect, useRef } from "react";

// Define the breakpoint
const MOBILE_BREAKPOINT = 650;

export default function MobileSwitch(props: {
  mobile: React.ElementType;
  desktop: React.ElementType;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);
  const objectRef = useRef(null);

  // Set client flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      if (objectRef.current) {
        setIsMobile(objectRef.current.offsetWidth <= MOBILE_BREAKPOINT);
      }
    };
    handleResize();

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  // Don't render anything on server-side to prevent hydration mismatch
  if (!isClient) {
    return <div ref={objectRef} />;
  }

  return (
    <div ref={objectRef}>
      {isMobile !== null ? (isMobile ? props.mobile : props.desktop) : null}
    </div>
  );
}
