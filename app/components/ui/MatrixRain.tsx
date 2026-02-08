"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
    className?: string;
}

export function MatrixRain({ className = "" }: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Characters: Mix of Katakana, Chinese, and Latin
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789XYZ道空虛無心".split("");

        const fontSize = 16;
        const columns = width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1); // Y position for each column

        const draw = () => {
            // Semi-transparent black to create fade trail
            ctx.fillStyle = "rgba(15, 15, 17, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#4a4a4f"; // Ink-medium color
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Randomly highlight some characters in red or white
                if (Math.random() > 0.98) {
                    ctx.fillStyle = "#ffffff"; // Bright highlight
                } else if (Math.random() > 0.995) {
                    ctx.fillStyle = "#ff3e3e"; // Red glitch
                } else {
                    ctx.fillStyle = "#3a3a3e"; // Standard ink
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly after it falls off screen
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33); // ~30fps

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 -z-10 mix-blend-multiply dark:mix-blend-screen ${className}`}
        />
    );
}
