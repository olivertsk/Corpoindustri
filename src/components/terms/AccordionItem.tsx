"use client";

import { useState } from 'react';

interface AccordionItemProps {
  title: string;
  content: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={toggleAccordion}
      >
        {title}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};
