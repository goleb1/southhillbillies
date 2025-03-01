'use client';

import React, { useState } from 'react';
import { distanceOptions } from '@/lib/paceCalculator';

interface DistanceSelectorProps {
  selectedDistance: string;
  onDistanceChange: (distance: string) => void;
}

export default function DistanceSelector({ selectedDistance, onDistanceChange }: DistanceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (distance: string) => {
    onDistanceChange(distance);
    setIsOpen(false);
  };

  const selectedOption = distanceOptions.find(option => option.value === selectedDistance);

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full flex items-center justify-between rounded-md border border-danube bg-white px-4 py-2 text-sm font-medium text-thunder shadow-sm hover:bg-melrose/20 focus:outline-none focus:ring-2 focus:ring-danube"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label || 'Select Distance'}
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto border border-danube">
          <ul className="py-1 text-sm text-thunder">
            {distanceOptions.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer px-4 py-2 hover:bg-melrose/30 ${
                  option.value === selectedDistance ? 'bg-melrose/50' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 