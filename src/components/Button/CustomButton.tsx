"use client";
import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";
import { FaSync } from "react-icons/fa";

interface ICustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  htmlType?: "button" | "submit" | "reset" | undefined;
  variant?: "outlined" | "filled";
  disabled?: boolean;
  isLoading?: boolean;
}

export default function CustomButton({
  children,
  onClick,
  className = "",
  htmlType = "button",
  variant = "filled",
  disabled = false,
  isLoading = false,
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
      disabled={disabled || isLoading}
      className={`relative overflow-hidden rounded  px-4 text-base-300 cursor-pointer disabled:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        variant === "outlined"
          ? "border border-primary text-primary font-medium"
          : "bg-primary"
      }
        ${isLoading ? "py-5.5" : "py-2.5"}
       ${className}`}
    >
      {isLoading ? (
        <FaSync className="text-primary animate-spin absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 !opacity-100" />
      ) : (
        children
      )}

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
