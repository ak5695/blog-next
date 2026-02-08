"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface InkSplashProps {
    className?: string; // e.g. "top-10 left-20 w-64 h-64"
    delay?: number;
    scale?: number;
    rotate?: number;
}

export function InkSplash({
    className = "",
    delay = 0,
    scale = 1,
    rotate = 0,
}: InkSplashProps) {
    const [uniqueId, setUniqueId] = useState("");

    useEffect(() => {
        setUniqueId(Math.random().toString(36).substring(7));
    }, []);

    if (!uniqueId) return null; // Hydration fix

    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}>

            {/* 
        The Filter Definition (0 dimensions, hidden)
        This applies the "Gooey" effect to elements referencing it by ID. 
      */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <filter id={`goo-${uniqueId}`}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* 
        The Animated Container 
        We apply the filter to THIS container so all children blur together 
      */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }} // Slight transparency for ink wash look
                transition={{ delay, duration: 2 }}
                className="relative w-full h-full mix-blend-multiply dark:mix-blend-exclusion"
                style={{ filter: `url(#goo-${uniqueId})` }}
            >
                {/* Main large blob */}
                <motion.div
                    className="absolute bg-neutral-800 dark:bg-neutral-300 rounded-full w-[60%] h-[60%] top-[20%] left-[20%]"
                    animate={{
                        scale: [1, 1.1, 0.9, 1],
                        x: [0, 10, -10, 0],
                        y: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Satellite 1 */}
                <motion.div
                    className="absolute bg-neutral-800 dark:bg-neutral-300 rounded-full w-[40%] h-[40%]"
                    initial={{ x: "10%", y: "10%" }}
                    animate={{
                        x: ["10%", "60%", "20%", "10%"],
                        y: ["10%", "20%", "60%", "10%"],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Satellite 2 (smaller, fast) */}
                <motion.div
                    className="absolute bg-neutral-800 dark:bg-neutral-300 rounded-full w-[25%] h-[25%]"
                    initial={{ x: "50%", y: "50%" }}
                    animate={{
                        x: ["50%", "10%", "50%"],
                        y: ["50%", "70%", "50%"],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </motion.div>
        </div>
    );
}
