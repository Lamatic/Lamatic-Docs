import React from 'react';

const SectionRows = ({ section, chips, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1 ${className}`}>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 min-w-[140px]">
        {section}
      </h4>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <span
            key={index}
            className="
              px-3 py-1
              text-xs font-medium
              rounded-full
              bg-gradient-to-r
              from-blue-100 to-blue-200
              text-blue-800
              dark:from-blue-900 dark:to-blue-800
              dark:text-blue-100
              inline-flex items-center justify-center
              hover:from-blue-200 hover:to-blue-300
              dark:hover:from-blue-800 dark:hover:to-blue-700
              transition-all
              duration-300
              cursor-default
              shadow-sm
            "
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SectionRows;