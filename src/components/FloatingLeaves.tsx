import { useState, useEffect } from "react";

interface Leaf {
  id: number;
  left: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  type: "navy" | "gold" | "sparkle";
}

export default function FloatingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Generate a set of leaves with randomized positions and timing
    const count = 28;
    const items: Leaf[] = Array.from({ length: count }).map((_, index) => {
      const left = Math.random() * 95; // 0 to 95%
      const size = Math.random() * 12 + 8; // 8px to 20px
      const delay = Math.random() * -15; // start in the past to prevent initial burst lag
      const duration = Math.random() * 15 + 15; // slow: 15s to 30s
      const roll = Math.random();
      const type = roll < 0.4 ? "navy" : roll < 0.8 ? "gold" : "sparkle";

      return {
        id: index,
        left,
        size,
        delay,
        duration,
        type,
      };
    });
    setLeaves(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute opacity-0"
          style={{
            left: `${leaf.left}%`,
            top: `-5%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            animationName: "float-down",
            animationDuration: `${leaf.duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay: `${leaf.delay}s`,
          }}
        >
          {leaf.type === "navy" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#1B365D] transform rotate-12"
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d="M12 2C12 2 4 10 4 15C4 18.3137 6.68629 21 10 21C13.3137 21 16 18.3137 16 15C16 10 12 2 12 2Z"
                fill="currentColor"
                fillOpacity="0.3"
              />
              <path d="M12 2V21" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.3" />
            </svg>
          ) : leaf.type === "gold" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#D4AF37] transform -rotate-45"
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d="M12 2C16 9 22 12 22 12C22 12 16 15 12 22C8 15 2 12 2 12C2 12 8 9 12 2Z"
                fill="currentColor"
                fillOpacity="0.35"
              />
            </svg>
          ) : (
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 filter blur-[1px] animate-pulse"
              style={{ animationDuration: `${Math.random() * 2 + 1}s` }}
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes float-down {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(105vh) translateX(60px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
