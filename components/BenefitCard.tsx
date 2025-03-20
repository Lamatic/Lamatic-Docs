import React from 'react';

const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* <div className="text-4xl mb-2">{icon}</div> */}
      <h3 className="text-xl font-semibold mb-4 mt-0 dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default BenefitCard;