'use client';

import React, { useState } from 'react';
import DistanceSelector from '@/components/DistanceSelector';
import TimeInput from '@/components/TimeInput';
import PaceTable from '@/components/PaceTable';
import SpeedDisplay from '@/components/SpeedDisplay';
import { distanceOptions, generatePaceData } from '@/lib/paceCalculator';

export default function Home() {
  const [selectedDistance, setSelectedDistance] = useState<string>(distanceOptions[7].value); // Default to 1 mile
  const [timeInput, setTimeInput] = useState<string>('');
  const [calculationResults, setCalculationResults] = useState<any>(null);

  const handleCalculate = () => {
    if (!selectedDistance || !timeInput) return;
    
    const results = generatePaceData(selectedDistance, timeInput);
    setCalculationResults(results);
  };

  return (
    <main className="min-h-screen p-3 sm:p-6 bg-fall">
      <div className="max-w-7xl mx-auto pt-4">
        {/* Title in donkey brown bar */}
        <div className="bg-donkey rounded-t-lg py-4 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-thunder">Pace Conversion Calculator</h1>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-b-lg shadow-md mb-4 sm:mb-6 border-x border-b border-danube">
          <div className="grid grid-cols-1 gap-3 sm:gap-6">
            {/* Mobile layout - stacked */}
            <div className="block lg:hidden">
              <div className="mb-3">
                <label className="block text-sm font-medium text-thunder mb-1 sm:mb-2">Distance</label>
                <DistanceSelector 
                  selectedDistance={selectedDistance} 
                  onDistanceChange={setSelectedDistance} 
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-thunder mb-1 sm:mb-2">Time</label>
                <TimeInput 
                  value={timeInput} 
                  onChange={setTimeInput} 
                />
              </div>
              
              <div>
                <button
                  onClick={handleCalculate}
                  className="w-full bg-chambray hover:bg-danube text-white font-medium py-1.5 sm:py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-danube focus:ring-offset-2 transition-colors"
                >
                  Calculate
                </button>
              </div>
            </div>
            
            {/* Desktop layout - side by side */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-thunder mb-2">Distance</label>
                <div className="flex flex-col">
                  <div className="h-[24px]"></div> {/* Spacer to align with time input arrows */}
                  <DistanceSelector 
                    selectedDistance={selectedDistance} 
                    onDistanceChange={setSelectedDistance} 
                  />
                  <div className="h-[52px]"></div> {/* Spacer to align with time input labels */}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-thunder mb-2">Time</label>
                <TimeInput 
                  value={timeInput} 
                  onChange={setTimeInput} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-thunder mb-2 opacity-0">Action</label>
                <div className="flex flex-col">
                  <div className="h-[24px]"></div> {/* Spacer to align with time input arrows */}
                  <button
                    onClick={handleCalculate}
                    className="w-full bg-chambray hover:bg-danube text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-danube focus:ring-offset-2 transition-colors"
                  >
                    Calculate
                  </button>
                  <div className="h-[52px]"></div> {/* Spacer to align with time input labels */}
                </div>
              </div>
            </div>
          </div>
          
          {calculationResults && (
            <SpeedDisplay 
              milesPerHour={calculationResults.paceData.milesPerHour} 
              kmPerHour={calculationResults.paceData.kmPerHour} 
            />
          )}
        </div>
        
        <PaceTable results={calculationResults?.results || null} />
        
        <div className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-thunder">
          <p>
            <em>South Hillbillies A.C. © 2018</em>
          </p>
        </div>
      </div>
    </main>
  );
}
