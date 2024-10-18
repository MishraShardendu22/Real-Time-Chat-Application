"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(200).fill(1);
  const cols = new Array(100).fill(1);
  const colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
    "--amber-300",
    "--lime-300",
    "--teal-300",
    "--cyan-300",
    "--rose-300",
    "--fuchsia-300",
    "--orange-300",
    "--emerald-300",
    "--slate-300",
    "--gray-300",
    "--zinc-300",
    "--neutral-300",
    "--stone-300",

    "--sky-200",
    "--pink-200",
    "--green-200",
    "--yellow-200",
    "--red-200",
    "--purple-200",
    "--blue-200",
    "--indigo-200",
    "--violet-200",
    "--amber-200",
    "--lime-200",
    "--teal-200",
    "--cyan-200",
    "--rose-200",
    "--fuchsia-200",
    "--orange-200",
    "--emerald-200",
    "--slate-200",
    "--gray-200",
    "--zinc-200",
    "--neutral-200",
    "--stone-200",

    "--sky-100",
    "--pink-100",
    "--green-100",
    "--yellow-100",
    "--red-100",
    "--purple-100",
    "--blue-100",
    "--indigo-100",
    "--violet-100",
    "--amber-100",
    "--lime-100",
    "--teal-100",
    "--cyan-100",
    "--rose-100",
    "--fuchsia-100",
    "--orange-100",
    "--emerald-100",
    "--slate-100",
    "--gray-100",
    "--zinc-100",
    "--neutral-100",
    "--stone-100",
    
    "--sky-400",
    "--pink-400",
    "--green-400",
    "--yellow-400",
    "--red-400",
    "--purple-400",
    "--blue-400",
    "--indigo-400",
    "--violet-400",
    "--amber-400",
    "--lime-400",
    "--teal-400",
    "--cyan-400",
    "--rose-400",
    "--fuchsia-400",
    "--orange-400",
    "--emerald-400",
    "--slate-400",
    "--gray-400",
    "--zinc-400",
    "--neutral-400",
    "--stone-400",

    "--sky-500",
    "--pink-500",
    "--green-500",
    "--yellow-500",
    "--red-500",
    "--purple-500",
    "--blue-500",
    "--indigo-500",
    "--violet-500",
    "--amber-500",
    "--lime-500",
    "--teal-500",
    "--cyan-500",
    "--rose-500",
    "--fuchsia-500",
    "--orange-500",
    "--emerald-500",
    "--slate-500",
    "--gray-500",
    "--zinc-500",
    "--neutral-500",
    "--stone-500",
    
    "--sky-600",
    "--pink-600",
    "--green-600",
    "--yellow-600",
    "--red-600",
    "--purple-600",
    "--blue-600",
    "--indigo-600",
    "--violet-600",
    "--amber-600",
    "--lime-600",
    "--teal-600",
    "--cyan-600",
    "--rose-600",
    "--fuchsia-600",
    "--orange-600",
    "--emerald-600",
    "--slate-600",
    "--gray-600",
    "--zinc-600",
    "--neutral-600",
    "--stone-600",

    "--sky-700",
    "--pink-700",
    "--green-700",
    "--yellow-700",
    "--red-700",
    "--purple-700",
    "--blue-700",
    "--indigo-700",
    "--violet-700",
    "--amber-700",
    "--lime-700",
    "--teal-700",
    "--cyan-700",
    "--rose-700",
    "--fuchsia-700",
    "--orange-700",
    "--emerald-700",
    "--slate-700",
    "--gray-700",
    "--zinc-700",
    "--neutral-700",
    "--stone-700",

    "--sky-800",
    "--pink-800",
    "--green-800",
    "--yellow-800",
    "--red-800",
    "--purple-800",
    "--blue-800",
    "--indigo-800",
    "--violet-800",
    "--amber-800",
    "--lime-800",
    "--teal-800",
    "--cyan-800",
    "--rose-800",
    "--fuchsia-800",
    "--orange-800",
    "--emerald-800",
    "--slate-800",
    "--gray-800",
    "--zinc-800",
    "--neutral-800",
    "--stone-800",

    "--sky-900",
    "--pink-900",
    "--green-900",
    "--yellow-900",
    "--red-900",
    "--purple-900",
    "--blue-900",
    "--indigo-900",
    "--violet-900",
    "--amber-900",
    "--lime-900",
    "--teal-900",
    "--cyan-900",
    "--rose-900",
    "--fuchsia-900",
    "--orange-900",
    "--emerald-900",
    "--slate-900",
    "--gray-900",
    "--zinc-900",
    "--neutral-900",
    "--stone-900",

  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8  border-l  border-slate-700 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8  border-r border-t border-slate-700 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
