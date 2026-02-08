"use client";

interface PixelCornersProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    color?: string;
}

/**
 * Pixel-style corner targeting brackets with translate animation
 * Corners animate from element center to their respective corners on hover
 */
export function PixelCorners({
    className = "",
    size = "md",
    color = "rgb(255, 82, 87)"
}: PixelCornersProps) {
    // Pixel size based on size prop - smaller values for finer detail
    const px = size === "sm" ? 1.5 : size === "md" ? 2 : 3;

    const pixelStyle = {
        backgroundColor: color,
        boxShadow: `0 0 ${px * 2}px ${color}`,
    };

    return (
        <>
            {/* Top Left Corner - starts from center, moves to top-left */}
            <div
                className={`absolute top-1 left-1 pointer-events-none 
                    translate-x-[calc(50%-0.25rem)] translate-y-[calc(50%-0.25rem)] opacity-0
                    group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-300 ease-out ${className}`}
            >
                <div className="absolute top-0 left-0 flex">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
                <div className="absolute top-0 left-0 flex flex-col">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
            </div>

            {/* Top Right Corner - starts from center, moves to top-right */}
            <div
                className={`absolute top-1 right-1 pointer-events-none 
                    -translate-x-[calc(50%-0.25rem)] translate-y-[calc(50%-0.25rem)] opacity-0
                    group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-300 ease-out ${className}`}
                style={{ transitionDelay: '30ms' }}
            >
                <div className="absolute top-0 right-0 flex flex-row-reverse">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
                <div className="absolute top-0 right-0 flex flex-col">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
            </div>

            {/* Bottom Left Corner - starts from center, moves to bottom-left */}
            <div
                className={`absolute bottom-1 left-1 pointer-events-none 
                    translate-x-[calc(50%-0.25rem)] -translate-y-[calc(50%-0.25rem)] opacity-0
                    group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-300 ease-out ${className}`}
                style={{ transitionDelay: '60ms' }}
            >
                <div className="absolute bottom-0 left-0 flex">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
                <div className="absolute bottom-0 left-0 flex flex-col-reverse">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
            </div>

            {/* Bottom Right Corner - starts from center, moves to bottom-right */}
            <div
                className={`absolute bottom-1 right-1 pointer-events-none 
                    -translate-x-[calc(50%-0.25rem)] -translate-y-[calc(50%-0.25rem)] opacity-0
                    group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-300 ease-out ${className}`}
                style={{ transitionDelay: '90ms' }}
            >
                <div className="absolute bottom-0 right-0 flex flex-row-reverse">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
                <div className="absolute bottom-0 right-0 flex flex-col-reverse">
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                    <div style={{ ...pixelStyle, width: px, height: px }} />
                </div>
            </div>
        </>
    );
}
