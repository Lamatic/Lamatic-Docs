import React from 'react';

const SectionRows = ({ section, chips, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-1.5 p-1.5 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-300 ${className}`}>
      <h4 className="text-base font-medium text-gray-700 dark:text-gray-300 min-w-[120px]">
        {section}
      </h4>
      <div className="flex flex-wrap gap-1 items-center">
        {chips.map((chip, index) => (
          <span
            key={index}
            className="
              px-2.5 py-0.5
              text-sm
              rounded-full
              bg-gradient-to-r
              from-blue-50 to-blue-100
              text-blue-700
              dark:from-blue-900/40 dark:to-blue-800/40
              dark:text-blue-200
              inline-flex items-center justify-center
              hover:from-blue-100 hover:to-blue-200
              dark:hover:from-blue-800/60 dark:hover:to-blue-700/60
              transition-colors
              duration-200
              cursor-pointer
              hover:scale-[1.02]
              active:scale-[0.98]
              border border-blue-200/10
              dark:border-blue-700/20
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