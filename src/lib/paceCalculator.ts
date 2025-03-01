// Distance conversion constants
export const METERS_PER_MILE = 1609.344;
export const METERS_PER_KM = 1000;

// Distance types and their values in meters
export interface DistanceOption {
  value: string;
  label: string;
  meters: number;
  category: 'Sprint' | 'Middle' | 'Long' | 'Ultra';
}

export const distanceOptions: DistanceOption[] = [
  { value: '60m', label: '60m', meters: 60, category: 'Sprint' },
  { value: '100m', label: '100m', meters: 100, category: 'Sprint' },
  { value: '200m', label: '200m', meters: 200, category: 'Sprint' },
  { value: '400m', label: '400m', meters: 400, category: 'Sprint' },
  { value: '800m', label: '800m', meters: 800, category: 'Middle' },
  { value: '1k', label: '1k', meters: 1000, category: 'Middle' },
  { value: '1500m', label: '1500m', meters: 1500, category: 'Middle' },
  { value: '1mi', label: '1mi', meters: METERS_PER_MILE, category: 'Middle' },
  { value: '2mi', label: '2mi', meters: 2 * METERS_PER_MILE, category: 'Middle' },
  { value: '5km', label: '5km', meters: 5 * METERS_PER_KM, category: 'Middle' },
  { value: '5mi', label: '5mi', meters: 5 * METERS_PER_MILE, category: 'Long' },
  { value: '10km', label: '10km', meters: 10 * METERS_PER_KM, category: 'Long' },
  { value: '10mi', label: '10mi', meters: 10 * METERS_PER_MILE, category: 'Long' },
  { value: '13.1mi', label: '13.1mi', meters: 13.1 * METERS_PER_MILE, category: 'Long' },
  { value: '20mi', label: '20mi', meters: 20 * METERS_PER_MILE, category: 'Long' },
  { value: '26.2mi', label: '26.2mi', meters: 26.2 * METERS_PER_MILE, category: 'Long' },
  { value: '50km', label: '50km', meters: 50 * METERS_PER_KM, category: 'Ultra' },
  { value: '50mi', label: '50mi', meters: 50 * METERS_PER_MILE, category: 'Ultra' },
  { value: '100km', label: '100km', meters: 100 * METERS_PER_KM, category: 'Ultra' },
  { value: '100mi', label: '100mi', meters: 100 * METERS_PER_MILE, category: 'Ultra' },
];

// World records data (in seconds)
export const worldRecords = {
  men: {
    '60m': 6.34,
    '100m': 9.58,
    '200m': 19.19,
    '400m': 43.03,
    '800m': 100.91, // 1:40.91
    '1k': 131.96, // 2:11.96
    '1500m': 206.0, // 3:26.00
    '1mi': 223.13, // 3:43.13
    '2mi': 461.67, // 7:41.67
    '5km': 755.36, // 12:35.36
    '5mi': 1224.0, // 20:24
    '10km': 1558.8, // 25:58.8
    '10mi': 2644.2, // 44:04.2
    '13.1mi': 3513.0, // 58:33
    '20mi': 5400.0, // 1:30:00
    '26.2mi': 7299.0, // 2:01:39
    '50km': 9270.0, // 2:34:30
    '50mi': 16920.0, // 4:42:00
    '100km': 21600.0, // 6:00:00
    '100mi': 44712.0, // 12:25:12
  },
  women: {
    '60m': 6.92,
    '100m': 10.49,
    '200m': 21.34,
    '400m': 47.60,
    '800m': 113.28, // 1:53.28
    '1k': 148.98, // 2:28.98
    '1500m': 230.46, // 3:50.46
    '1mi': 252.09, // 4:12.09
    '2mi': 540.67, // 9:00.67
    '5km': 870.0, // 14:30
    '5mi': 1440.0, // 24:00
    '10km': 1763.4, // 29:23.4
    '10mi': 3060.0, // 51:00
    '13.1mi': 3906.0, // 1:05:06
    '20mi': 6300.0, // 1:45:00
    '26.2mi': 8100.0, // 2:15:00
    '50km': 10800.0, // 3:00:00
    '50mi': 19800.0, // 5:30:00
    '100km': 25200.0, // 7:00:00
    '100mi': 52200.0, // 14:30:00
  }
};

// Convert time string (HH:MM:SS) to seconds
export function timeStringToSeconds(timeString: string): number {
  const parts = timeString.split(':').map(part => parseFloat(part));
  
  if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    // SS format
    return parts[0];
  }
  
  return 0;
}

// Convert seconds to time string (HH:MM:SS)
export function secondsToTimeString(seconds: number, category?: string): string {
  if (isNaN(seconds) || seconds < 0) return '';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  // For sprint times, include decimal places
  const isSprintCategory = category === 'Sprint';
  
  if (hours > 0) {
    if (isSprintCategory) {
      const secsFormatted = secs.toFixed(2).padStart(5, '0');
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secsFormatted}`;
    } else {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${Math.floor(secs).toString().padStart(2, '0')}`;
    }
  } else if (minutes > 0) {
    if (isSprintCategory) {
      const secsFormatted = secs.toFixed(2).padStart(5, '0');
      return `${minutes}:${secsFormatted}`;
    } else {
      return `${minutes}:${Math.floor(secs).toString().padStart(2, '0')}`;
    }
  } else {
    // Just seconds
    if (isSprintCategory) {
      return secs.toFixed(2);
    } else {
      return `${Math.floor(secs)}`;
    }
  }
}

// Calculate pace for a given distance and time
export function calculatePace(distanceInMeters: number, timeInSeconds: number): {
  milesPace: string;
  kmPace: string;
  milesPerHour: number;
  kmPerHour: number;
} {
  if (distanceInMeters <= 0 || timeInSeconds <= 0) {
    return {
      milesPace: '',
      kmPace: '',
      milesPerHour: 0,
      kmPerHour: 0
    };
  }

  // Calculate pace per mile (seconds per mile)
  const secondsPerMile = (timeInSeconds / distanceInMeters) * METERS_PER_MILE;
  
  // Calculate pace per km (seconds per km)
  const secondsPerKm = (timeInSeconds / distanceInMeters) * METERS_PER_KM;
  
  // Calculate speed in miles per hour
  const milesPerHour = (distanceInMeters / METERS_PER_MILE) / (timeInSeconds / 3600);
  
  // Calculate speed in km per hour
  const kmPerHour = (distanceInMeters / METERS_PER_KM) / (timeInSeconds / 3600);
  
  return {
    milesPace: secondsToTimeString(secondsPerMile),
    kmPace: secondsToTimeString(secondsPerKm),
    milesPerHour: parseFloat(milesPerHour.toFixed(2)),
    kmPerHour: parseFloat(kmPerHour.toFixed(2))
  };
}

// Calculate time for a given distance based on a reference distance and time
export function calculateTime(
  referenceDistanceInMeters: number, 
  referenceTimeInSeconds: number,
  targetDistanceInMeters: number,
  adjustmentFactor: number = 1.0, // 1.0 = no adjustment, 0.95 = 5% faster, 1.05 = 5% slower
  category?: string
): number {
  if (referenceDistanceInMeters <= 0 || referenceTimeInSeconds <= 0 || targetDistanceInMeters <= 0) {
    return 0;
  }
  
  // Simple linear calculation (assumes constant pace)
  const calculatedTime = (referenceTimeInSeconds / referenceDistanceInMeters) * targetDistanceInMeters * adjustmentFactor;
  
  // For sprint times, don't round to preserve decimal precision
  if (category === 'Sprint') {
    return calculatedTime;
  }
  
  // For other categories, round to the nearest second
  return Math.round(calculatedTime);
}

// Generate all pace data based on a reference distance and time
export function generatePaceData(referenceDistance: string, referenceTimeString: string) {
  const selectedDistance = distanceOptions.find(d => d.value === referenceDistance);
  if (!selectedDistance || !referenceTimeString) return null;
  
  const referenceTimeInSeconds = timeStringToSeconds(referenceTimeString);
  if (referenceTimeInSeconds <= 0) return null;
  
  const referenceDistanceInMeters = selectedDistance.meters;
  
  // Calculate pace and speed
  const paceData = calculatePace(referenceDistanceInMeters, referenceTimeInSeconds);
  
  // Generate times for all distances
  const results = distanceOptions.map(distance => {
    const baseTime = calculateTime(referenceDistanceInMeters, referenceTimeInSeconds, distance.meters, 1.0, distance.category);
    const time5pctSlower = calculateTime(referenceDistanceInMeters, referenceTimeInSeconds, distance.meters, 1.05, distance.category);
    const time10pctSlower = calculateTime(referenceDistanceInMeters, referenceTimeInSeconds, distance.meters, 1.10, distance.category);
    const time25pctSlower = calculateTime(referenceDistanceInMeters, referenceTimeInSeconds, distance.meters, 1.25, distance.category);
    const time5pctFaster = calculateTime(referenceDistanceInMeters, referenceTimeInSeconds, distance.meters, 0.95, distance.category);
    const time10pctFaster = calculateTime(referenceDistanceInMeters, referenceTimeInSeconds, distance.meters, 0.90, distance.category);
    const time25pctFaster = calculateTime(referenceDistanceInMeters, referenceTimeInSeconds, distance.meters, 0.75, distance.category);
    
    return {
      category: distance.category,
      distance: distance.value,
      time: secondsToTimeString(baseTime, distance.category),
      time5pctSlower: secondsToTimeString(time5pctSlower, distance.category),
      time10pctSlower: secondsToTimeString(time10pctSlower, distance.category),
      time25pctSlower: secondsToTimeString(time25pctSlower, distance.category),
      time5pctFaster: secondsToTimeString(time5pctFaster, distance.category),
      time10pctFaster: secondsToTimeString(time10pctFaster, distance.category),
      time25pctFaster: secondsToTimeString(time25pctFaster, distance.category),
      worldRecordMen: secondsToTimeString(worldRecords.men[distance.value as keyof typeof worldRecords.men], distance.category),
      worldRecordWomen: secondsToTimeString(worldRecords.women[distance.value as keyof typeof worldRecords.women], distance.category),
    };
  });
  
  return {
    paceData,
    results
  };
} 