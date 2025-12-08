import React, { useState } from "react";

type ColorCardProps = {
  name: string;
  hex: string;
  rgb: string;
  className?: string;
};

export const ColorCard: React.FC<ColorCardProps> = ({
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

  // Auto text contrast
  const getTextColor = (hexColor: string) => {
    const c = hexColor.replace("#", "");
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.6 ? "#111827" : "#FFFFFF";
  };

  const textColor = getTextColor(hexValue);

  const handleCopy = async (value: string, key: "hex" | "rgb") => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

return (
    <div
      className={`group rounded-2xl p-5 shadow-sm border border-black/10 w-75 h-40 flex flex-col justify-end ${className}`}
      style={{ backgroundColor: hexValue, color: textColor }}
    >


      {/* RGB */}
      <div className="flex items-center justify-between text-xs mb-1">
        <span>RGB {rgb}</span>
        <button
          onClick={() => handleCopy(rgbValue, "rgb")}
          className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-current hover:opacity-80 transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 flex items-center gap-1"
        >
          {copied === "rgb" ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy rgb
            </>
          )}
        </button>
      </div>

      {/* HEX */}
      <div className="flex items-center justify-between text-xs">
        <span>{hexValue.toUpperCase()}</span>
        <button
          onClick={() => handleCopy(hexValue, "hex")}
          className="text-[10px] font-bold px-2 py-0.5 rounded-md border border-current hover:opacity-80 transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 flex items-center gap-1"
        >
          {copied === "hex" ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};
