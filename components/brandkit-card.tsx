"use client";

import React, { useState } from "react";

type ColorCardProps = {
  name?: string;
  hex: string;
  rgb: string;
  className?: string;
};

export const ColorCard: React.FC<ColorCardProps> = ({
  name,
  hex,
  rgb,
  className,
}) => {
  const [copied, setCopied] = useState<"hex" | "rgb" | null>(null);

  const normalizeHex = (v: string) => (v.startsWith("#") ? v : `#${v}`);
  const normalizeRgb = (v: string) =>
    v.startsWith("rgb") ? v : `rgb(${v})`;

  const hexValue = normalizeHex(hex);
  const rgbValue = normalizeRgb(rgb);

  // decide light/dark text class based on background color
  const getTextClass = (hexColor: string) => {
    const c = hexColor.replace("#", "");
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.6 ? "text-slate-900" : "text-white";
  };

  const textClass = getTextClass(hexValue);

  const handleCopy = async (value: string, key: "hex" | "rgb") => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  const CopyIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );

  const CheckIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <div
      className={`group rounded-2xl p-5 shadow-sm border border-gray-300 w-full h-40 flex flex-col justify-between ${textClass} ${
        className ?? ""
      }`}
      style={{ backgroundColor: hexValue }}
    >
      {name && (
        <div className="text-xs font-medium opacity-80">
          {name}
        </div>
      )}

      {/* HEX on top, RGB below */}
      <div className="mt-auto flex flex-col items-start space-y-2 text-xs">
        {/* HEX pill */}
        <button
          onClick={() => handleCopy(hexValue, "hex")}
          className="
            inline-flex items-center gap-1
            rounded-md px-2.5 py-1
            text-[11px] font-medium
            bg-transparent
            hover:bg-[#EAECF0] hover:text-black
            transition-colors duration-150
          "
        >
          {copied === "hex" ? (
            <>
              <CheckIcon />
              Copied
            </>
          ) : (
            <>
              {hexValue.toLowerCase()}
              <CopyIcon />
            </>
          )}
        </button>

        {/* RGB pill */}
        <button
          onClick={() => handleCopy(rgbValue, "rgb")}
          className="
            inline-flex items-center gap-1
            rounded-md px-2.5 py-1
            text-[11px] font-medium
            bg-transparent
            hover:bg-[#EAECF0] hover:text-black
            transition-colors duration-150
          "
        >
          {copied === "rgb" ? (
            <>
              <CheckIcon />
              Copied
            </>
          ) : (
            <>
              {rgb}
              <CopyIcon />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
