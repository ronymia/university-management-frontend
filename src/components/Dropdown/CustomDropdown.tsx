"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface CustomDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}

export const CustomDropdown = ({
  trigger,
  children,
  align = "right",
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownRoot, setDropdownRoot] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const root = document.getElementById("dropdown-root");
    setDropdownRoot(root);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 2,
        left:
          align === "right"
            ? rect.right - 192 + window.scrollX // 192px = dropdown width
            : rect.left + window.scrollX,
      });
    }
  }, [isOpen, align]);

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-48 rounded-md shadow-lg bg-white border "
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            position: "absolute",
          }}
          ref={containerRef}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="inline-block" ref={triggerRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      {dropdownRoot && createPortal(dropdownContent, dropdownRoot)}
    </div>
  );
};
