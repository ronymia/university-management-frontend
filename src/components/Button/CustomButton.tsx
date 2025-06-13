"use client";
import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";

interface ICustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  htmlType?: "button" | "submit" | "reset" | undefined;
  variant?: "outlined" | "filled";
  disabled?: boolean;
}

export default function CustomButton({
  children,
  onClick,
  className = "",
  htmlType = "button",
  variant = "filled",
  disabled = false,
}: ICustomButtonProps) {
  const [rippleStyle, setRippleStyle] = useState({});
  const [rippleVisible, setRippleVisible] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    setRippleStyle({
      top: y,
      left: x,
      width: size,
      height: size,
    });

    setRippleVisible(true);
    setTimeout(() => setRippleVisible(false), 500);

    onClick?.();
  };

  return (
    <button
      type={htmlType}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded  px-4 py-2 text-base-300 cursor-pointer ${
        variant === "outlined"
          ? "border border-primary text-primary font-medium"
          : "bg-primary"
      } ${className}`}
    >
      {children}

      {rippleVisible && (
        <motion.span
          className="absolute rounded-full bg-white/30"
          style={{ position: "absolute", ...rippleStyle }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
    </button>
  );
}
