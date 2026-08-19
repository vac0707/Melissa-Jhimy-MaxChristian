import React from "react";

interface PageFloralFrameProps {
  variant?: "light" | "dark";
  showBottomRight?: boolean;
}

export default function PageFloralFrame({
  variant = "light",
  showBottomRight = false,
}: PageFloralFrameProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[5]">
      {/* 1. TOP-RIGHT FLORAL ACCENT (rosa.png) */}
      <img
        src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990382/rosa.png"
        alt="Decoración floral superior derecha"
        className="absolute top-0 right-0 w-[120px] sm:w-[190px] md:w-[240px] max-w-[32vw] h-auto object-contain object-right-top origin-top-right opacity-90 transition-opacity duration-700"
        referrerPolicy="no-referrer"
        decoding="async"
      />

      {/* 2. BOTTOM-LEFT FLORAL ACCENT (izquierda_abajo.png) */}
      <img
        src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990914/izquierda_abajo.png"
        alt="Decoración floral inferior izquierda"
        className="absolute bottom-0 left-0 w-[130px] sm:w-[200px] md:w-[250px] max-w-[34vw] h-auto object-contain object-left-bottom origin-bottom-left opacity-90 transition-opacity duration-700"
        referrerPolicy="no-referrer"
        decoding="async"
      />

      {/* 3. OPTIONAL BOTTOM-RIGHT FLORAL ACCENT (derecha_abajo.png) */}
      {showBottomRight && (
        <img
          src="https://res.cloudinary.com/lfwlqotz/image/upload/v1786990915/derecha_abajo.png"
          alt="Decoración floral inferior derecha"
          className="absolute bottom-0 right-0 w-[110px] sm:w-[170px] md:w-[210px] max-w-[28vw] h-auto object-contain object-right-bottom origin-bottom-right opacity-75 transition-opacity duration-700"
          referrerPolicy="no-referrer"
          decoding="async"
        />
      )}

      {/* Subtle border framing */}
      <div
        className={`absolute inset-3 sm:inset-5 border rounded-xs pointer-events-none transition-colors duration-500 ${
          variant === "dark"
            ? "border-[#dfb559]/20"
            : "border-[#dfb559]/30"
        }`}
      />
    </div>
  );
}
