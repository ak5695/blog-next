"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: any;
}

export function GlitchText({ text, className = "", as: Component = "span" }: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Component
            className={`relative inline-block group break-all ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10" suppressHydrationWarning>{text}</span>

            {/* Glitch Layer 1 - Red/Cyan Offset - Always visible */}
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-50 animate-pulse"
                style={{ transform: "translate(-2px, -2px)" }}
                aria-hidden="true"
                suppressHydrationWarning
            >
                {text}
            </span>

            {/* Glitch Layer 2 - Blue/Yellow Offset - Always visible */}
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-50 animate-pulse"
                style={{ transform: "translate(2px, 2px)", animationDelay: "0.15s" }}
                aria-hidden="true"
                suppressHydrationWarning
            >
                {text}
            </span>
        </Component>
    );
}
