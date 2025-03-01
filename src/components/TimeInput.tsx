'use client';

import React, { useState, useEffect } from 'react';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TimeInput({ value, onChange }: TimeInputProps) {
  const [hours, setHours] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');

  // Parse the input value into hours, minutes, and seconds
  useEffect(() => {
    if (!value) {
      setHours('');
      setMinutes('');
      setSeconds('');
      return;
    }

    const parts = value.split(':');
    if (parts.length === 3) {
      setHours(parts[0]);
      setMinutes(parts[1]);
      setSeconds(parts[2]);
    } else if (parts.length === 2) {
      setHours('');
      setMinutes(parts[0]);
      setSeconds(parts[1]);
    } else if (parts.length === 1) {
      setHours('');
      setMinutes('');
      setSeconds(parts[0]);
    }
  }, [value]);

  // Update the combined time value when any part changes
  const updateTime = (h: string, m: string, s: string) => {
    let timeString = '';
    
    if (h) {
      timeString = `${h}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
    } else if (m) {
      timeString = `${m}:${s.padStart(2, '0')}`;
    } else if (s) {
      timeString = s;
    }
    
    onChange(timeString);
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = e.target.value.replace(/[^0-9]/g, '');
    setHours(newHours);
    updateTime(newHours, minutes, seconds);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value.replace(/[^0-9]/g, '');
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, seconds);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = e.target.value.replace(/[^0-9]/g, '');
    setSeconds(newSeconds);
    updateTime(hours, minutes, newSeconds);
  };

  // Functions to increment and decrement time values
  const incrementHours = () => {
    const currentHours = hours ? parseInt(hours) : 0;
    const newHours = (currentHours + 1).toString();
    setHours(newHours);
    updateTime(newHours, minutes, seconds);
  };

  const decrementHours = () => {
    const currentHours = hours ? parseInt(hours) : 0;
    if (currentHours > 0) {
      const newHours = (currentHours - 1).toString();
      setHours(newHours);
      updateTime(newHours, minutes, seconds);
    }
  };

  const incrementMinutes = () => {
    const currentMinutes = minutes ? parseInt(minutes) : 0;
    const newMinutes = ((currentMinutes + 1) % 60).toString().padStart(2, '0');
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, seconds);
  };

  const decrementMinutes = () => {
    const currentMinutes = minutes ? parseInt(minutes) : 0;
    const newMinutes = ((currentMinutes - 1 + 60) % 60).toString().padStart(2, '0');
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, seconds);
  };

  const incrementSeconds = () => {
    const currentSeconds = seconds ? parseInt(seconds) : 0;
    const newSeconds = ((currentSeconds + 1) % 60).toString().padStart(2, '0');
    setSeconds(newSeconds);
    updateTime(hours, minutes, newSeconds);
  };

  const decrementSeconds = () => {
    const currentSeconds = seconds ? parseInt(seconds) : 0;
    const newSeconds = ((currentSeconds - 1 + 60) % 60).toString().padStart(2, '0');
    setSeconds(newSeconds);
    updateTime(hours, minutes, newSeconds);
  };

  return (
    <div className="flex flex-col space-y-0.5 sm:space-y-1">
      {/* Up arrows row */}
      <div className="flex space-x-1 sm:space-x-2">
        <div className="flex-1">
          <button 
            type="button"
            onClick={incrementHours}
            className="w-full flex justify-center text-danube hover:text-chambray focus:outline-none h-5 sm:h-6"
            aria-label="Increase hours"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="w-3 sm:w-4"></div>
        <div className="flex-1">
          <button 
            type="button"
            onClick={incrementMinutes}
            className="w-full flex justify-center text-danube hover:text-chambray focus:outline-none h-5 sm:h-6"
            aria-label="Increase minutes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="w-3 sm:w-4"></div>
        <div className="flex-1">
          <button 
            type="button"
            onClick={incrementSeconds}
            className="w-full flex justify-center text-danube hover:text-chambray focus:outline-none h-5 sm:h-6"
            aria-label="Increase seconds"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Input fields row */}
      <div className="flex space-x-1 sm:space-x-2">
        <div className="flex-1">
          <input
            type="text"
            inputMode="numeric"
            placeholder="hh"
            value={hours}
            onChange={handleHoursChange}
            className="w-full px-1 sm:px-3 py-1.5 sm:py-2 border border-danube rounded-md shadow-sm focus:outline-none focus:ring-danube focus:border-danube text-center text-sm sm:text-base text-thunder"
            maxLength={2}
          />
        </div>
        
        <div className="flex items-center text-danube text-lg sm:text-xl font-bold">:</div>
        
        <div className="flex-1">
          <input
            type="text"
            inputMode="numeric"
            placeholder="mm"
            value={minutes}
            onChange={handleMinutesChange}
            className="w-full px-1 sm:px-3 py-1.5 sm:py-2 border border-danube rounded-md shadow-sm focus:outline-none focus:ring-danube focus:border-danube text-center text-sm sm:text-base text-thunder"
            maxLength={2}
          />
        </div>
        
        <div className="flex items-center text-danube text-lg sm:text-xl font-bold">:</div>
        
        <div className="flex-1">
          <input
            type="text"
            inputMode="numeric"
            placeholder="ss"
            value={seconds}
            onChange={handleSecondsChange}
            className="w-full px-1 sm:px-3 py-1.5 sm:py-2 border border-danube rounded-md shadow-sm focus:outline-none focus:ring-danube focus:border-danube text-center text-sm sm:text-base text-thunder"
            maxLength={2}
          />
        </div>
      </div>

      {/* Down arrows and labels row */}
      <div className="flex space-x-1 sm:space-x-2">
        <div className="flex-1">
          <button 
            type="button"
            onClick={decrementHours}
            className="w-full flex justify-center text-danube hover:text-chambray focus:outline-none h-5 sm:h-6"
            aria-label="Decrease hours"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="text-[10px] sm:text-xs text-center text-thunder">Hours</div>
        </div>
        <div className="w-3 sm:w-4"></div>
        <div className="flex-1">
          <button 
            type="button"
            onClick={decrementMinutes}
            className="w-full flex justify-center text-danube hover:text-chambray focus:outline-none h-5 sm:h-6"
            aria-label="Decrease minutes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="text-[10px] sm:text-xs text-center text-thunder">Minutes</div>
        </div>
        <div className="w-3 sm:w-4"></div>
        <div className="flex-1">
          <button 
            type="button"
            onClick={decrementSeconds}
            className="w-full flex justify-center text-danube hover:text-chambray focus:outline-none h-5 sm:h-6"
            aria-label="Decrease seconds"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="text-[10px] sm:text-xs text-center text-thunder">Seconds</div>
        </div>
      </div>
    </div>
  );
} 