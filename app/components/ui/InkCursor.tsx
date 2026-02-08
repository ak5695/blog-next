"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const InkCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Smooth spring physics for the main cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).closest('a')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);
    window.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
      window.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-multiply filter blur-[1px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: "var(--ink-black)",
          opacity: 0.8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <InkTrail x={mousePosition.x} y={mousePosition.y} />
    </>
  );
};

const InkTrail = ({ x, y }: { x: number; y: number }) => {
  const [drops, setDrops] = useState<{ id: number; x: number; y: number; scale: number }[]>([]);

  useEffect(() => {
    // Add a new drop every time position changes significantly
    const newDrop = { 
      id: Date.now(), 
      x: x + (Math.random() - 0.5) * 10, // Slight random offset for organic feel
      y: y + (Math.random() - 0.5) * 10, 
      scale: Math.random() * 0.5 + 0.5 
    };
    
    setDrops((prev) => [...prev.slice(-20), newDrop]); // Keep last 20 drops

    // Cleanup old drops
    const timeout = setTimeout(() => {
        setDrops(prev => prev.filter(d => d.id !== newDrop.id));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [x, y]);

  return (
    <>
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ opacity: 0.4, scale: drop.scale }}
          animate={{ opacity: 0, scale: drop.scale * 2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed w-4 h-4 rounded-full bg-neutral-400 pointer-events-none z-40 blur-[2px]"
          style={{ 
            left: drop.x, 
            top: drop.y,
            backgroundColor: "var(--ink-wash)" 
          }}
        />
      ))}
    </>
  );
};

export default InkCursor;
