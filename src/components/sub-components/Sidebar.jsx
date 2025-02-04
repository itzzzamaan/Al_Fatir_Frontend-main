import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";
 
export const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full px-4 py-3 flex justify-between items-center text-left"
        onClick={onToggle}
      >
        <span className="font-medium text-gray-700">{title}</span>
        {isOpen ? (
          <FaChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <FaChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="px-4 py-2 bg-gray-50">{children}</div>}
    </div>
  );
};