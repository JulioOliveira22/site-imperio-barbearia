"use client";

import { useEffect, useRef, useState } from "react";

type RevealOnScrollProps = {
  children: React.ReactNode;
  delayMs?: number;
};

export function RevealOnScroll({ children, delayMs = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`duration-500 ease-out ${
        visible
          ? "transform-none opacity-100 transition-opacity"
          : "opacity-0 transition-opacity md:translate-y-4 md:transition-all"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
