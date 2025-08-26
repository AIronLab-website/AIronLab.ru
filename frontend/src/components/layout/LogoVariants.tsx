import React from "react";
import Image from "next/image";
import { getImagePath } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon-only" | "text-only";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = "full", 
  size = "md",
  className = "" 
}) => {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 48, text: "text-2xl" }
  };

  const currentSize = sizes[size];

  const IconComponent = () => (
    <div className="relative">
      <Image
        src={getImagePath("/images/logo.png")}
        alt="AIronLab Logo"
        width={currentSize.icon}
        height={currentSize.icon}
        className="object-contain"
        priority
      />
    </div>
  );

  const TextComponent = () => (
    <span className={`font-bold text-foreground tracking-tight ${currentSize.text}`}>
      AI<span className="text-accent">ron</span>Lab
    </span>
  );

  return (
    <div className={`flex items-center ${className}`}>
      {variant === "full" && (
        <>
          <div className="mr-3">
            <IconComponent />
          </div>
          <TextComponent />
        </>
      )}
      {variant === "icon-only" && <IconComponent />}
      {variant === "text-only" && <TextComponent />}
    </div>
  );
}; 