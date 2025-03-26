import React from 'react';

const SectionRows = ({ section, chips, className = '' }) => {
  return (
    <div className={`flex items-baseline space-x-1 ${className}`}>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {section}
      </h4>
      <div className="flex items-baseline gap-2">
        {chips.map((chip, index) => (
          <span
            key={index}
            className="
              px-3 py-2
              text-xs
              rounded-full
              bg-gradient-to-r
              from-blue-100 to-blue-200
              text-blue-500
              inline-flex items-center justify-center
              hover:from-blue-200 hover:to-blue-300
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