import React from 'react';

const SectionRows = ({ section, chips, className = '' }) => {
  return (
    <div className={`flex items-baseline space-x-2 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {section}
      </h3>
      <div className="flex items-baseline gap-2">
        {chips.map((chip, index) => (
          <span
            key={index}
            className="
              px-3 py-1
              text-sm
              rounded-full
              bg-gradient-to-r
              from-red-100 to-red-200
              text-red-500
              font-semibold
              inline-flex items-center justify-center
              hover:from-red-200 hover:to-red-300
              transition-all
              duration-300
              cursor-default
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