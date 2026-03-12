'use client';

import { useRef, useEffect, useCallback } from 'react';

const ITEM_HEIGHT = 52;
const VISIBLE_ITEMS = 3;
const PADDING_ITEMS = Math.floor(VISIBLE_ITEMS / 2); // 1

function generateRange(max: number): number[] {
  return Array.from({ length: max + 1 }, (_, i) => i);
}

const HOURS = generateRange(99);   // 0–99
const MINUTES = generateRange(59); // 0–59
const SECONDS = generateRange(59); // 0–59

function ScrollColumn({
  values,
  selected,
  onSelect,
  label,
  padDisplay,
}: {
  values: number[];
  selected: number;
  onSelect: (value: number) => void;
  label: string;
  padDisplay?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToValue = useCallback(
    (value: number, smooth = false) => {
      const container = containerRef.current;
      if (!container) return;
      const index = values.indexOf(value);
      if (index === -1) return;
      container.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: smooth ? 'smooth' : 'instant',
      });
    },
    [values]
  );

  useEffect(() => {
    if (!isScrollingRef.current) {
      scrollToValue(selected);
    }
  }, [selected, scrollToValue]);

  const handleScroll = useCallback(() => {
    isScrollingRef.current = true;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const index = Math.round(container.scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, values.length - 1));
      const value = values[clampedIndex];

      container.scrollTo({ top: clampedIndex * ITEM_HEIGHT, behavior: 'smooth' });

      if (value !== selected) onSelect(value);
      isScrollingRef.current = false;
    }, 100);
  }, [values, selected, onSelect]);

  const handleItemClick = useCallback(
    (value: number) => {
      onSelect(value);
      scrollToValue(value, true);
    },
    [onSelect, scrollToValue]
  );

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-thunder/40 uppercase tracking-wide mb-1">{label}</span>
      <div className="relative w-full" style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}>

        {/* Center-row highlight band */}
        <div
          className="absolute inset-x-0 pointer-events-none bg-chambray/10 border-y border-chambray/30 z-10"
          style={{ top: PADDING_ITEMS * ITEM_HEIGHT, height: ITEM_HEIGHT }}
        />

        {/* Scrollable list */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full w-full overflow-y-auto scrollbar-hide relative z-20"
          style={{
            scrollSnapType: 'y mandatory',
            scrollPaddingTop: PADDING_ITEMS * ITEM_HEIGHT,
          }}
          aria-label={label}
        >
          {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
            <div key={`top-${i}`} style={{ height: ITEM_HEIGHT }} />
          ))}

          {values.map((v) => (
            <div
              key={v}
              onClick={() => handleItemClick(v)}
              className={`flex items-center justify-center text-2xl font-mono cursor-pointer select-none transition-colors
                ${v === selected ? 'text-chambray font-semibold' : 'text-thunder/25'}
              `}
              style={{ height: ITEM_HEIGHT, scrollSnapAlign: 'start' }}
            >
              {padDisplay ? String(v).padStart(2, '0') : v}
            </div>
          ))}

          {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
            <div key={`bot-${i}`} style={{ height: ITEM_HEIGHT }} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TimeInputProps {
  hours: number;
  minutes: number;
  seconds: number;
  onFieldChange: (field: 'hours' | 'minutes' | 'seconds', value: number) => void;
  disabled?: boolean;
}

export default function TimeInput({
  hours,
  minutes,
  seconds,
  onFieldChange,
  disabled = false,
}: TimeInputProps) {
  return (
    <div className={`flex items-end gap-0.5 w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex-1 min-w-0">
        <ScrollColumn
          values={HOURS}
          selected={hours}
          onSelect={(v) => onFieldChange('hours', v)}
          label="hr"
        />
      </div>
      <span className="text-thunder/30 font-medium text-xl pb-[52px]">:</span>
      <div className="flex-1 min-w-0">
        <ScrollColumn
          values={MINUTES}
          selected={minutes}
          onSelect={(v) => onFieldChange('minutes', v)}
          label="min"
          padDisplay
        />
      </div>
      <span className="text-thunder/30 font-medium text-xl pb-[52px]">:</span>
      <div className="flex-1 min-w-0">
        <ScrollColumn
          values={SECONDS}
          selected={seconds}
          onSelect={(v) => onFieldChange('seconds', v)}
          label="sec"
          padDisplay
        />
      </div>
    </div>
  );
}
