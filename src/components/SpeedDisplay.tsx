'use client';

import React from 'react';

interface SpeedDisplayProps {
  milesPerHour: number;
  kmPerHour: number;
}

export default function SpeedDisplay({ milesPerHour, kmPerHour }: SpeedDisplayProps) {
  return (
    <div className="mt-4">
      {/* Desktop view - two separate boxes */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="bg-white p-4 rounded-lg border border-danube shadow-sm text-center">
          <div className="text-sm text-thunder mb-1">Miles per hour</div>
          <div className="text-2xl font-bold text-chambray">{milesPerHour > 0 ? milesPerHour.toFixed(2) : '-'}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-danube shadow-sm text-center">
          <div className="text-sm text-thunder mb-1">Kilometers per hour</div>
          <div className="text-2xl font-bold text-chambray">{kmPerHour > 0 ? kmPerHour.toFixed(2) : '-'}</div>
        </div>
      </div>
      
      {/* Mobile view - single box with both values on one line */}
      <div className="sm:hidden bg-white p-3 rounded-lg border border-danube shadow-sm">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <div className="text-xs text-thunder mb-1">Miles per hour</div>
            <div className="text-xl font-bold text-chambray">{milesPerHour > 0 ? milesPerHour.toFixed(2) : '-'}</div>
          </div>
          <div className="h-10 w-px bg-danube/30 mx-2"></div>
          <div className="text-center flex-1">
            <div className="text-xs text-thunder mb-1">Kilometers per hour</div>
            <div className="text-xl font-bold text-chambray">{kmPerHour > 0 ? kmPerHour.toFixed(2) : '-'}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 