"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaSync } from "react-icons/fa";

interface CustomDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  width?: number | string;
  isLoading?: boolean;
}

export const CustomDropdown = ({
  trigger,
  children,
  align = "right",
  width = "w-48",
  isLoading = false,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownRoot, setDropdownRoot] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate position with viewport boundary checks
  const calculatePosition = useCallback(() => {
    if (!isOpen || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownWidth = containerRef.current?.offsetWidth || 192;
    const viewportWidth = window.innerWidth;

    let left =
      align === "right"
        ? triggerRect.right - dropdownWidth + window.scrollX
        : triggerRect.left + window.scrollX;

    // Ensure dropdown stays within viewport
    if (left + dropdownWidth > viewportWidth + window.scrollX) {
      left = viewportWidth - dropdownWidth + window.scrollX;
    }
    if (left < window.scrollX) {
      left = window.scrollX;
    }

    setPosition({
      top: triggerRect.bottom + window.scrollY + 4,
      left,
    });
  }, [isOpen, align]);

  useEffect(() => {
    const root = document.getElementById("dropdown-root") || document.body;
    setDropdownRoot(root);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) // Add this check
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    calculatePosition();

    // Recalculate on window resize
    const handleResize = () => calculatePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculatePosition]);

  // Update your outside click handler:

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className={`absolute z-50 ${width}`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          ref={containerRef}
          role="menu"
          aria-hidden={!isOpen}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className=" relative"
      ref={triggerRef}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen((prev) => !prev)}
        className="flex items-center cursor-pointer gap-3"
      >
        {trigger}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <FaSync className={"text-gray-500 animate-spin"} />
          ) : (
            <motion.svg
              initial={false}
              animate={{ scaleY: isOpen ? -1 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 35 }}
              className={`h-5 w-5 text-gray-500`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          )}
        </div>
      </div>
      {dropdownRoot && createPortal(dropdownContent, dropdownRoot)}
    </div>
  );
};
