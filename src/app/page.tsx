'use client';

import React, { useState, useCallback } from 'react';
import DistanceSelector from '@/components/DistanceSelector';
import TimeInput from '@/components/TimeInput';
import PaceTable from '@/components/PaceTable';
import SpeedDisplay from '@/components/SpeedDisplay';
import { distanceOptions, generatePaceData } from '@/lib/paceCalculator';

interface TimeFields {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const [selectedDistance, setSelectedDistance] = useState<string>(distanceOptions[7].value); // Default to 1 mile
  const [time, setTime] = useState<TimeFields>({ hours: 0, minutes: 0, seconds: 0 });
  const [calculationResults, setCalculationResults] = useState<any>(null);

  const handleFieldChange = useCallback(
    (field: 'hours' | 'minutes' | 'seconds', value: number) => {
      setTime((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleCalculate = () => {
    if (!selectedDistance) return;
    const totalSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
    if (totalSeconds === 0) return;
    const timeString = `${time.hours}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    const results = generatePaceData(selectedDistance, timeString);
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
          <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto w-full">
            <div>
              <label className="block text-sm font-medium text-thunder mb-1 sm:mb-2">Distance</label>
              <DistanceSelector
                selectedDistance={selectedDistance}
                onDistanceChange={setSelectedDistance}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-thunder mb-1 sm:mb-2">Time</label>
              <TimeInput
                hours={time.hours}
                minutes={time.minutes}
                seconds={time.seconds}
                onFieldChange={handleFieldChange}
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-chambray hover:bg-danube text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-danube focus:ring-offset-2 transition-colors"
            >
              Calculate
            </button>
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
