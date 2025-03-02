'use client';

import React, { useState, useEffect } from 'react';
import { distanceOptions } from '@/lib/paceCalculator';

interface PaceTableProps {
  results: {
    category: string;
    distance: string;
    time: string;
    time5pctSlower: string;
    time10pctSlower: string;
    time25pctSlower: string;
    time5pctFaster: string;
    time10pctFaster: string;
    time25pctFaster: string;
    worldRecordMen: string;
    worldRecordWomen: string;
  }[] | null;
}

// Column preset configurations
const columnPresets = {
  all: {
    category: true,
    distance: true,
    time25pctSlower: true,
    time10pctSlower: true,
    time5pctSlower: true,
    time: true,
    time5pctFaster: true,
    time10pctFaster: true,
    time25pctFaster: true,
    worldRecordMen: true,
    worldRecordWomen: true
  },
  minimal: {
    category: true,
    distance: true,
    time25pctSlower: false,
    time10pctSlower: false,
    time5pctSlower: false,
    time: true,
    time5pctFaster: false,
    time10pctFaster: false,
    time25pctFaster: false,
    worldRecordMen: false,
    worldRecordWomen: false
  },
  records: {
    category: true,
    distance: true,
    time25pctSlower: false,
    time10pctSlower: false,
    time5pctSlower: false,
    time: true,
    time5pctFaster: false,
    time10pctFaster: false,
    time25pctFaster: false,
    worldRecordMen: true,
    worldRecordWomen: true
  },
  compact: {
    category: false,
    distance: true,
    time25pctSlower: false,
    time10pctSlower: false,
    time5pctSlower: true,
    time: true,
    time5pctFaster: true,
    time10pctFaster: false,
    time25pctFaster: false,
    worldRecordMen: true,
    worldRecordWomen: true
  },
  slower: {
    category: false,
    distance: true,
    time25pctSlower: true,
    time10pctSlower: true,
    time5pctSlower: true,
    time: true,
    time5pctFaster: false,
    time10pctFaster: false,
    time25pctFaster: false,
    worldRecordMen: false,
    worldRecordWomen: false
  },
  faster: {
    category: false,
    distance: true,
    time25pctSlower: false,
    time10pctSlower: false,
    time5pctSlower: false,
    time: true,
    time5pctFaster: true,
    time10pctFaster: true,
    time25pctFaster: true,
    worldRecordMen: false,
    worldRecordWomen: false
  }
};

export default function PaceTable({ results }: PaceTableProps) {
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState(columnPresets.compact);
  const [activePreset, setActivePreset] = useState<string>("compact");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Toggle column visibility
  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
    setActivePreset("custom");
  };

  // Apply a preset
  const applyPreset = (presetName: keyof typeof columnPresets) => {
    setVisibleColumns(columnPresets[presetName]);
    setActivePreset(presetName);
  };

  // Set up responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const smallScreen = window.innerWidth < 768;
      setIsSmallScreen(smallScreen);
      
      // We no longer auto-apply minimal preset on small screens
      // This allows users to choose their preferred view on mobile
    };

    // Check on initial load
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!results || results.length === 0) {
    return (
      <div className="mt-8 text-center text-thunder">
        Enter a distance and time above to see pace calculations
      </div>
    );
  }

  // Determine cell padding based on screen size
  const cellPadding = isSmallScreen ? "px-2 py-1.5" : "px-4 py-2";
  const headerPadding = isSmallScreen ? "px-2 py-2" : "px-4 py-3";
  const fontSize = isSmallScreen ? "text-xs" : "text-sm";

  // Count visible columns to help with styling
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length;

  return (
    <div className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-thunder">View Options:</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <button 
            onClick={() => applyPreset("minimal")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activePreset === "minimal" ? 'bg-chambray text-white' : 'bg-melrose/30 text-thunder'}`}
          >
            Minimal
          </button>
          <button 
            onClick={() => applyPreset("records")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activePreset === "records" ? 'bg-chambray text-white' : 'bg-melrose/30 text-thunder'}`}
          >
            Records
          </button>
          <button 
            onClick={() => applyPreset("compact")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activePreset === "compact" ? 'bg-chambray text-white' : 'bg-melrose/30 text-thunder'}`}
          >
            Compact
          </button>
          <button 
            onClick={() => applyPreset("slower")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activePreset === "slower" ? 'bg-chambray text-white' : 'bg-melrose/30 text-thunder'}`}
          >
            Slower
          </button>
          <button 
            onClick={() => applyPreset("faster")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activePreset === "faster" ? 'bg-chambray text-white' : 'bg-melrose/30 text-thunder'}`}
          >
            Faster
          </button>
          <button 
            onClick={() => applyPreset("all")}
            className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${activePreset === "all" ? 'bg-chambray text-white' : 'bg-melrose/30 text-thunder'}`}
          >
            All
          </button>
        </div>
        
        <details className="mb-2">
          <summary className="cursor-pointer text-sm text-chambray hover:text-danube font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            Customize Columns
          </summary>
          <div className="mt-2 flex flex-wrap gap-2 p-3 bg-fall rounded-md">
            <button 
              onClick={() => toggleColumn('category')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.category ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              Type
            </button>
            <button 
              onClick={() => toggleColumn('distance')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.distance ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              Event
            </button>
            <button 
              onClick={() => toggleColumn('time25pctSlower')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.time25pctSlower ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              25% Slower
            </button>
            <button 
              onClick={() => toggleColumn('time10pctSlower')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.time10pctSlower ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              10% Slower
            </button>
            <button 
              onClick={() => toggleColumn('time5pctSlower')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.time5pctSlower ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              5% Slower
            </button>
            <button 
              onClick={() => toggleColumn('time')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.time ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              Time
            </button>
            <button 
              onClick={() => toggleColumn('time5pctFaster')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.time5pctFaster ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              5% Faster
            </button>
            <button 
              onClick={() => toggleColumn('time10pctFaster')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.time10pctFaster ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              10% Faster
            </button>
            <button 
              onClick={() => toggleColumn('time25pctFaster')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.time25pctFaster ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              25% Faster
            </button>
            <button 
              onClick={() => toggleColumn('worldRecordMen')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.worldRecordMen ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              WR (M)
            </button>
            <button 
              onClick={() => toggleColumn('worldRecordWomen')}
              className={`px-2 py-1 text-xs rounded ${visibleColumns.worldRecordWomen ? 'bg-chambray text-white' : 'bg-gray-200 text-thunder'}`}
            >
              WR (W)
            </button>
          </div>
        </details>
        
        {isSmallScreen && visibleColumnCount > 3 && (
          <div className="mt-2 text-xs text-donkey font-medium">
            <p>Tip: Swipe horizontally to see all columns</p>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-danube border border-danube rounded-lg overflow-hidden">
          <thead className="bg-melrose/30">
            <tr>
              {visibleColumns.category && (
                <th scope="col" className={`${headerPadding} text-left ${fontSize} font-medium text-thunder tracking-wider`}>
                  Type
                </th>
              )}
              {visibleColumns.distance && (
                <th scope="col" className={`${headerPadding} text-left ${fontSize} font-medium text-thunder tracking-wider`}>
                  Event
                </th>
              )}
              {visibleColumns.time25pctSlower && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  25% Slower
                </th>
              )}
              {visibleColumns.time10pctSlower && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  10% Slower
                </th>
              )}
              {visibleColumns.time5pctSlower && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  5% Slower
                </th>
              )}
              {visibleColumns.time && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider bg-danube/20`}>
                  Time
                </th>
              )}
              {visibleColumns.time5pctFaster && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  5% Faster
                </th>
              )}
              {visibleColumns.time10pctFaster && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  10% Faster
                </th>
              )}
              {visibleColumns.time25pctFaster && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  25% Faster
                </th>
              )}
              {visibleColumns.worldRecordMen && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  Men&apos;s WR
                </th>
              )}
              {visibleColumns.worldRecordWomen && (
                <th scope="col" className={`${headerPadding} text-center ${fontSize} font-medium text-thunder tracking-wider`}>
                  Women&apos;s WR
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-danube">
            {results.map((result, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-melrose/10'}>
                {visibleColumns.category && (
                  <td className={`${cellPadding} ${fontSize} text-thunder`}>
                    {result.category}
                  </td>
                )}
                {visibleColumns.distance && (
                  <td className={`${cellPadding} ${fontSize} text-thunder`}>
                    {result.distance}
                  </td>
                )}
                {visibleColumns.time25pctSlower && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.time25pctSlower}
                  </td>
                )}
                {visibleColumns.time10pctSlower && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.time10pctSlower}
                  </td>
                )}
                {visibleColumns.time5pctSlower && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.time5pctSlower}
                  </td>
                )}
                {visibleColumns.time && (
                  <td className={`${cellPadding} ${fontSize} text-center font-medium bg-danube/10 text-chambray`}>
                    {result.time}
                  </td>
                )}
                {visibleColumns.time5pctFaster && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.time5pctFaster}
                  </td>
                )}
                {visibleColumns.time10pctFaster && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.time10pctFaster}
                  </td>
                )}
                {visibleColumns.time25pctFaster && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.time25pctFaster}
                  </td>
                )}
                {visibleColumns.worldRecordMen && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.worldRecordMen}
                  </td>
                )}
                {visibleColumns.worldRecordWomen && (
                  <td className={`${cellPadding} ${fontSize} text-center text-thunder`}>
                    {result.worldRecordWomen}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 