import { useEffect, RefObject } from "react";

/**
 * Hook to enable horizontal scrolling with mouse wheel/trackpad
 * @param ref - Ref to the scrollable container element
 * @param options - Configuration options
 */
export function useHorizontalScroll(
  ref: RefObject<HTMLElement>,
  options: {
    /** Scroll speed multiplier (default: 1) */
    speed?: number;
    /** Whether to enable smooth scrolling (default: true) */
    smooth?: boolean;
  } = {}
) {
  const { speed = 1, smooth = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle if the element can scroll horizontally
      const canScrollHorizontally =
        element.scrollWidth > element.clientWidth;

      if (!canScrollHorizontally) return;

      // Check if the user is scrolling vertically (deltaY is significantly larger than deltaX)
      // This handles both mouse wheel and trackpad gestures
      const isScrollingVertically = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      
      // Get current scroll state
      const isAtLeftEdge = element.scrollLeft <= 1;
      const isAtRightEdge =
        element.scrollLeft >= element.scrollWidth - element.clientWidth - 1;

      // If scrolling vertically, convert to horizontal scroll
      if (isScrollingVertically) {
        // Check if we're trying to scroll past boundaries
        const wouldScrollPastLeft = isAtLeftEdge && e.deltaY < 0;
        const wouldScrollPastRight = isAtRightEdge && e.deltaY > 0;

        // Only prevent default and scroll if we're not at a boundary or trying to scroll within bounds
        if (!wouldScrollPastLeft && !wouldScrollPastRight) {
          // Prevent default vertical scrolling
          e.preventDefault();

          // Scroll horizontally instead
          const scrollAmount = e.deltaY * speed;
          element.scrollBy({
            left: scrollAmount,
            behavior: smooth ? "smooth" : "auto",
          });
        }
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [ref, speed, smooth]);
}
